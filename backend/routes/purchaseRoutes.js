const { PrismaClient } = require('@prisma/client');
const express = require('express');
const authenticateUser = require('../middleware/userAuth')
const router = express.Router();
const prisma = new PrismaClient();

// Create a new purchase
router.post('/purchaseFromSales', async (req, res) => {
  console.log(req.body)
  const { email, courseId,orderId ,amount,phone} = req.body;

 
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {

    const isEmailExists = await prisma.dashboardUsers.findUnique({
      where: {
        email: email,
      },


    });

    if (isEmailExists) {
     try { 

      const user = await prisma.dashboardUsers.create({
        data: {
          email,
        },
      });
  
      const courseData = await prisma.course.findUnique({
        where:{
          id:courseId
        },
        select:{
          courseName:true
        }
      })
      const purchaseData = await prisma.purchase.create({
        data: {
          userId: user.id,
          courseName:courseData.courseName,
          courseId: courseId,
          purchaseId: orderId,
          price: amount,
          phoneNumber: phone,
          email: email,
          using:false
        }
        
      });
      res.status(201).json({message:"Created"})
     } catch (error) {
      console.error('Error creating purchase:', error);
      return res.status(500).json({ error: 'Internal server error' });
     }
    }


    const user = await prisma.dashboardUsers.create({
      data: {
        email,
      },
    });

    const courseData = await prisma.course.findUnique({
      where:{
        id:courseId
      },
      select:{
        courseName:true
      }
    })
    const purchaseData = await prisma.purchase.create({
      data: {
        userId: user.id,
        courseName:courseData.courseName,
        courseId: courseId,
        purchaseId: orderId,
        price: amount,
        phoneNumber: phone,
        email: email,
        using:false
      },
    });

    console.log(purchaseData);
    return res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error('Error creating purchase:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});



// Get all purchases
router.get('/purchases', async (req, res) => {
  try {
    const purchases = await prisma.purchase.findMany({});
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
