const { PrismaClient } = require('@prisma/client');
const express = require('express');

const prisma = new PrismaClient();
const router = express.Router();

// ==================== CourseModules Routes ====================

// Add a new module to a course

router.get('/getModulesById/:id',async (req,res)=>{
    const {id} = req.params
    try {
        const data = await prisma.course.findUnique({
            where: { id }, 
            include: {
                modules: {
                    include: {
                        contents: true,
                    },
                },
            },
        });

        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error while getting course modules", error });
    }
})
router.post('/addModule/:id', async (req, res) => {
    const { id } = req.params;
    const { moduleName } = req.body;

    try {
        const data = await prisma.courseModule.create({
            data: {
                moduleName,
                courseId: id,
            },
        });
        res.status(201).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get all modules for a course
router.get('/modules/:courseId', async (req, res) => {
    const { courseId } = req.params;

    try {
        const modules = await prisma.courseModule.findMany({
            where: { courseId },
            include: { contents: true },
        });
        res.status(200).json({ success: true, data: modules });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get a single module by ID
router.get('/module/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const module = await prisma.courseModule.findUnique({
            where: { id },
            include: { contents: true },
        });
        if (!module) {
            return res.status(404).json({ success: false, message: 'Module not found' });
        }
        res.status(200).json({ success: true, data: module });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update a module by ID
router.put('/updateModule/:id', async (req, res) => {
    const { id } = req.params;
    const { moduleName } = req.body;

    try {
        const updatedModule = await prisma.courseModule.update({
            where: { id },
            data: { moduleName }, 
        });
        res.status(200).json({ success: true, data: updatedModule });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete a module by ID
router.delete('/deleteModule/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.courseModule.delete({ where: { id } });
        res.status(200).json({ success: true, message: 'Module deleted successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==================== ModuleContents Routes ====================

// Add content to a module
router.post('/addContent/:moduleId', async (req, res) => {
    const { moduleId } = req.params;
    const { contentName } = req.body;

    try {
        const data = await prisma.moduleContent.create({
            data: {
                contentName,
                moduleId,
            },
        });
        res.status(201).json({ success: true, data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get all contents for a module
router.get('/contents/:moduleId', async (req, res) => {
    const { moduleId } = req.params;

    try {
        const contents = await prisma.moduleContent.findMany({
            where: { moduleId },
        });
        res.status(200).json({ success: true, data: contents });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get a single content by ID
router.get('/content/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const content = await prisma.moduleContent.findUnique({
            where: { id },
        });
        if (!content) {
            return res.status(404).json({ success: false, message: 'Content not found' });
        }
        res.status(200).json({ success: true, data: content });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update content by ID
router.put('/updateContent/:id', async (req, res) => {
    const { id } = req.params;
    const { contentName } = req.body;

    try {
        const updatedContent = await prisma.moduleContent.update({
            where: { id },
            data: { contentName },
        });
        res.status(200).json({ success: true, data: updatedContent });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete content by ID
router.delete('/deleteContent/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.moduleContent.delete({ where: { id } });
        res.status(200).json({ success: true, message: 'Content deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
