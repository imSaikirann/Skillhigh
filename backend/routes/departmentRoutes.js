const { PrismaClient } = require('@prisma/client');
const express = require('express');
const prisma = new PrismaClient();
const router = express.Router();

// Create a new department
router.post('/addDepartments', async (req, res) => {
  const { departmentName, description } = req.body;
  try {
    const department = await prisma.department.create({
      data: { departmentName, description },
    });
    res.status(201).json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all departments
router.get('/getDepartments', async (req, res) => {
  try {
    const departments = await prisma.department.findMany({
      include: { courses: true }, 
    });
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific department by ID
router.get('/departments/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const department = await prisma.department.findUnique({
      where: { id },
      include: { courses: true }, 
    });
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a department by ID
router.put('/updateDepartments/:id', async (req, res) => {
  const { id } = req.params;
  const { departmentName, description } = req.body;
  try {
    const department = await prisma.department.update({
      where: { id },
      data: { departmentName, description },
    });
    res.json(department);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a department by ID
router.delete('/deleteDepartments/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.department.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
