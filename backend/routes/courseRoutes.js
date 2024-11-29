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
            const folder = 'images/'; 
            cb(null, `${folder}${Date.now()}-${file.originalname}`);
        },
    }),
});

// Route to create a new course
router.post('/createCourse', upload.single('courseThumbnail'), async (req, res) => {
    const { courseName, courseDescription, courseCount,  departmentId } = req.body;
    const courseThumbnail = req.file ? req.file.location : null;

    try {
        const data = await prisma.course.create({
            data: {
                courseName,
                courseDescription,
                courseThumbnail,
                courseCount: parseInt(courseCount),
              
                department: { connect: { id: departmentId } }
            }
        });

        res.status(201).json({ message: "Course Created", data });
    } catch (error) {
        res.status(500).json({ message: "Error while creating new Course", error });
    }
});

// Route to update a course
router.put('/updateCourse/:id', upload.single('courseThumbnail'), async (req, res) => {
    const { id } = req.params;
    const { courseName, courseDescription, courseCount, departmentId } = req.body;
    const courseThumbnail = req.file ? req.file.location : null;

    try {
        const course = await prisma.course.update({
            where: { id },
            data: {
                courseName,
                courseDescription,
                courseThumbnail,
                courseCount: parseInt(courseCount),
             
                department: departmentId ? { connect: { id: departmentId } } : undefined 
            }
        });
        res.status(200).json({ message: "Course updated", course });
    } catch (error) {
        res.status(500).json({ message: "Error while updating course", error });
    }
});


// Route to delete a course
router.delete('/deleteCourse/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const course = await prisma.course.findUnique({ where: { id } }); 
        console.log(id)

        if (course && course.courseThumbnail) {
            const fileKey = course.courseThumbnail.split('/').pop(); 
            await deleteFileFromS3(process.env.S3_BUCKET_NAME, `images/${fileKey}`); 
        }

        const deletedCourse = await prisma.course.delete({
            where: { id }
        });
        res.status(200).json({ message: "Course deleted", course: deletedCourse });
    } catch (error) {
        res.status(500).json({ message: "Error while deleting course", error });
    }
});
 

 
router.get('/getAllCourse', async (req, res) => {
    try {
        const data = await prisma.course.findMany({
            include: {
                modules: {
                    include: {
                        contents: true, 
                    },
                },
                department: true, 
            },
        });

      
        const formattedData = data.map(course => ({
            ...course,
            departmentName: course.department?.departmentName || null, 
        }));

       
        res.status(200).json(formattedData);
    } catch (error) {
        console.error("Error while getting all courses:", error);
        res.status(500).json({ message: "Error while getting all courses", error });
    }
});




// Route to get a specific course by ID
router.get('/getCourse/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const course = await prisma.course.findUnique({
            where: { id }, 
            include: {
                topics: true,
                modules: {
                    include: {
                        contents: true,
                    },
                },
            },
        });

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: "Error while getting course", error });
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
