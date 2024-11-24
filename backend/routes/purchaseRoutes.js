const { PrismaClient } = require('@prisma/client');
const express = require('express');
const authenticateUser = require('../middleware/userAuth')
const router = express.Router();
const prisma = new PrismaClient();

// Create a new purchase
router.post('/purchases', authenticateUser,  async (req, res) => {

  try {

    const userId = req.user.userId
    
    const user = await prisma.user.findFirst({
      where:{
        userId:userId
      }
    })

    const { courseId, price } = req.body;

    const course = await prisma.course.findUnique({
      where:{
        id:courseId
      }
    })
 
    const purchase = await prisma.purchase.create({
      data: {
        userId:user.id,
        name:user.name,
        email:user.email,
        price,
        courseName:course.courseName,
        courseId,
      },
    });
    res.status(201).json(purchase);
  } catch (error) {
    console.error('Error creating purchase:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all purchases
router.get('/purchases', async (req, res) => {
  try {
    const purchases = await prisma.purchase.findMany({
      include: {
        user: true,
        course: true,
      },
    });
    res.status(200).json(purchases);
  } catch (error) {
    console.error('Error fetching purchases:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a purchase by ID
router.get('/purchases/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const purchase = await prisma.purchase.findUnique({
      where: { id },
      include: {
        user: true,
        course: true,
      },
    });
    if (!purchase) {
      return res.status(404).json({ error: 'Purchase not found' });
    }
    res.status(200).json(purchase);
  } catch (error) {
    console.error('Error fetching purchase:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a purchase by ID
router.put('/purchases/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, courseName } = req.body;
    const purchase = await prisma.purchase.update({
      where: { id },
      data: {
        name,
        email,
        courseName, 
      },
    });
    res.status(200).json(purchase);
  } catch (error) {
    console.error('Error updating purchase:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a purchase by ID
router.delete('/purchases/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.purchase.delete({
      where: { id },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting purchase:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
