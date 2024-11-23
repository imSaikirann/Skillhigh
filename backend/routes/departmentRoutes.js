const { PrismaClient } = require('@prisma/client');
const express = require('express');
const { departmentSchema } = require('../zodValidation/vaidation');
const prisma = new PrismaClient();
const router = express.Router();
const z = require('zod');

// Schema for validating department ID
const departmentIdSchema = z.object({
  id: z.string().uuid('Invalid ID format'),
});

// Create a new department
router.post('/addDepartments', async (req, res) => {
  try {
    const validatedData = departmentSchema.parse(req.body);

    const department = await prisma.department.create({
      data: validatedData,
    });

    res.status(201).json({
      success: true,
      message: 'Department created successfully!',
      department,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create department.',
      error: error.message,
    });
  }
});

// Get all departments
router.get('/getDepartments', async (req, res) => {
  try {
    const departments = await prisma.department.findMany({
      include: { courses: true },
    });

    res.status(200).json({
      success: true,
      message: 'Departments retrieved successfully!',
      departments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch departments.',
      error: error.message,
    });
  }
});

// Get a specific department by ID
router.get('/departments/:id', async (req, res) => {
  try {
    const { id } = req.params

    const department = await prisma.department.findUnique({
      where: { id },
      include: { courses: true },
    });

    if (!department) { 
      return res.status(404).json({
        success: false,
        message: 'Department not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Department retrieved successfully!',
      department,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to retrieve department.',
      error: error.message,
    });
  }
});

// Update a department by ID
router.put('/updateDepartments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = departmentSchema.partial().parse(req.body);

    const department = await prisma.department.update({
      where: { id },
      data: validatedData,
    });

    res.status(200).json({
      success: true,
      message: 'Department updated successfully!',
      department,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update department.',
      error: error.message,
    });
  }
});

// Delete a department by ID
router.delete('/deleteDepartments/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.department.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: 'Department deleted successfully!',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to delete department.',
      error: error.message,
    });
  }
});

module.exports = router;
