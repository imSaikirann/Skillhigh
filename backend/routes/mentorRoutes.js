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

// Add Mentor
router.post('/addMentor', upload.single('photo'), async (req, res) => {
    const { name, qualification, company } = req.body;
    const photo = req.file ? req.file.location : null;

    try {
        const data = await prisma.mentors.create({
            data: { name, qualification, company, photo },
        });

        res.status(201).json({ message: "Mentor added", data });
    } catch (error) {
        console.error("Error while adding new Mentor:", error);
        res.status(500).json({ message: "Error while adding new Mentor", error });
    }
});

// Read Mentors
router.get('/mentors', async (req, res) => {
    try {
        const mentors = await prisma.mentors.findMany();
        res.status(200).json(mentors);
    } catch (error) {
        console.error("Error while retrieving mentors:", error);
        res.status(500).json({ message: "Error while retrieving mentors", error });
    }
});

// Edit Mentor
router.put('/editMentor/:id', upload.single('photo'), async (req, res) => {
    const { id } = req.params;
    const { name, qualification, company } = req.body;
    
    const photo = req.file ? req.file.location : undefined;

    try {
        const existingMentor= await prisma.mentors.findUnique({
            where: { id }, 
        });
 
        if (!existingMentor) {
            return res.status(404).json({ message: "Mentor not found" });
        }

       
        if (photo && existingMentor.photo) {
            const photoKey = existingMentor.photo.split('/').pop(); 
            await s3Client.send(
                new DeleteObjectCommand({
                    Bucket: process.env.S3_BUCKET_NAME,
                    Key: `images/${photoKey}`,
                })
            );
        }

        const updatedMentor = await prisma.mentors.update({
            where: {
              id: id 
            },
            data: {
              name,
              qualification,
              company,
              photo: photo || existingMentor.photo,
            },
          });
          

        res.status(200).json({ message: "Mentor updated", data: updatedMentor });
    } catch (error) {
        console.error("Error while updating mentor:", error);
        res.status(500).json({ message: "Error while updating mentor", error });
    }
});

// Delete Mentor
router.delete('/deleteMentor/:id', async (req, res) => {
    const { id } = req.params;

    console.log("Mentor ID to delete:", id);

    try {
       
        const mentor = await prisma.mentors.findUnique({
            where: { id }, 
        });

        if (!mentor) {
            return res.status(404).json({ message: "Mentor not found" });
        }

        
        if (mentor.photo) {
            const photoKey = mentor.photo.split('/').pop(); 
            await s3Client.send(
                new DeleteObjectCommand({
                    Bucket: process.env.S3_BUCKET_NAME,
                    Key: `images/${photoKey}`,
                })
            );
        }

       
        await prisma.mentors.delete({
            where: { id },
        });

        res.status(200).json({ message: "Mentor deleted successfully" });
    } catch (error) {
        console.error("Error while deleting mentor:", error);
        res.status(500).json({ message: "Error while deleting mentor", error });
    }
});


module.exports = router;
