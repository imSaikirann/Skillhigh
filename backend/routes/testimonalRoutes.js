const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Create a new testimonial
router.post('/addtestimonials', async (req, res) => {
  const { name, collageName, review } = req.body;

  try {
    const newTestimonial = await prisma.testimonals.create({
      data: {
        name,
        collageName,
        review,
      },
    });

    res.status(201).json({ success: true, data: newTestimonial });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Get all testimonials
router.get('/testimonials', async (req, res) => {
  try {
    const testimonials = await prisma.testimonals.findMany();
    res.status(200).json({ success: true, message:"Review retrived successfully", data: testimonials });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Get a single testimonial by ID
router.get('/testimonials/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const testimonial = await prisma.testimonals.findUnique({
      where: { id },
    });

    if (!testimonial) {
      return res.status(404).json({ success: false, message:"Review Added successfully", error: 'Testimonial not found' });
    }

    res.status(200).json({ success: true, data: testimonial });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Update a testimonial
router.put('/updateTestimonials/:id', async (req, res) => {
  const { id } = req.params;
  const { name, collageName, review } = req.body;

  try {
    const updatedTestimonial = await prisma.testimonals.update({
      where: { id },
      data: {
        name,
        collageName,
        review,
      },
    });

    res.status(200).json({ success: true, message:"Review Updated successfully", data: updatedTestimonial });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Delete a testimonial by ID
router.delete('/deleteTestimonials/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTestimonial = await prisma.testimonals.delete({
      where: { id },
    });

    res.status(200).json({ success: true, message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
