const { PrismaClient } = require('@prisma/client');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const router = express.Router(); 
const prisma = new PrismaClient();

// Configure AWS S3
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// Set up multer to upload files to S3
const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: process.env.S3_BUCKET_NAME, 
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const folder = 'videos/'; 
            cb(null, `${folder}${Date.now()}-${file.originalname}`);
        },
    }),
});

// Route to create a new topic
router.post('/createTopic/:courseId', upload.single('video'), async (req, res) => {
    const { courseId } = req.params;  // Use courseId from the URL parameters
    const { title, description } = req.body;
    const video = req.file ? req.file.location : null; 
    console.log(video)

    try {
        const data = await prisma.topic.create({
            data: {
                title,
                description,
                video,
                course: { connect: { id: courseId } } // Properly connect the topic to the course
            }
        });

        res.status(201).json({ message: "Topic added", data });
    } catch (error) {
        console.error("Error while adding new topic:", error);
        res.status(500).json({ message: "Error while adding new topic", error });
    }
});


// Route to delete a topic
router.delete('/deleteTopic/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const topic = await prisma.topic.findUnique({ where: { id } }); 

        if (topic && topic.video) {
            const fileKey = topic.video.split('/').slice(-1)[0]; 
            await deleteFileFromS3(process.env.S3_BUCKET_NAME, `videos/${fileKey}`); 
        }

        const deletedTopic = await prisma.topic.delete({
            where: { id }
        });
        res.status(200).json({ message: "Topic deleted", topic: deletedTopic });
    } catch (error) {
        res.status(500).json({ message: "Error while deleting topic", error });
    }
});

// Route to update a topic
router.put('/updateTopic/:id', upload.single('video'), async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const video = req.file ? req.file.location : null;

    try {
        const existingTopic = await prisma.topic.findUnique({ where: { id } });

        if (existingTopic && existingTopic.video && video) {
            const oldFileKey = existingTopic.video.split('/').slice(-1)[0];
            await deleteFileFromS3(process.env.S3_BUCKET_NAME, `videos/${oldFileKey}`);
        }

        const updatedTopic = await prisma.topic.update({
            where: { id },
            data: {
                title,
                description,
                video: video || existingTopic.video
            }
        });
        
        res.status(200).json({ message: "Topic updated", topic: updatedTopic });
    } catch (error) { 
        res.status(500).json({ message: "Error while updating topic", error });
    }
});

// Route to get all topics
router.get('/getAllTopics', async (req, res) => {
    try {
        const topics = await prisma.topic.findMany({
            include: {
                Quiz: {
                    include: {
                        Question: {
                            include: {
                                answers: true // Include answers for each question
                            }
                        }
                    }
                }
            }
        });
        res.status(200).json(topics);
    } catch (error) {
        console.error("Error while getting all topics:", error);
        res.status(500).json({ message: "Error while getting all topics", error });
    }
});


// Route to get a specific topic by ID
router.get('/getTopic/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const topic = await prisma.topic.findUnique({
            where: { id }
        });
        if (!topic) {
            return res.status(404).json({ message: "Topic not found" });
        }
        res.status(200).json(topic);
    } catch (error) {
        res.status(500).json({ message: "Error while getting topic", error });
    }
});

// Delete function for removing files from S3
const deleteFileFromS3 = async (bucketName, fileKey) => {
    if (!fileKey) {
        console.log('File key is null or undefined, skipping deletion.');
        return Promise.resolve();
    }

    try {
        const command = new DeleteObjectCommand({
            Bucket: bucketName, 
            Key: fileKey,
        });
        await s3Client.send(command);
    } catch (error) {
        console.error('Error deleting file from S3:', error);
        throw new Error('S3 deletion failed.');
    }
};

module.exports = router;  
