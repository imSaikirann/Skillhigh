const { PrismaClient } = require('@prisma/client');
const express = require('express');
const router = express.Router();
const z = require('zod');
const prisma = new PrismaClient();
const { faqSchema } = require('../zodValidation/vaidation');


router.post('/addFAQ', async (req, res) => {
  const { question, answer } = req.body;

  try {
 
    faqSchema.parse({ question, answer });

 
    const data = await prisma.fAQ.create({
      data: {
        question,
        answer
      }
    });


    res.status(200).json({
      success: true,
      message: 'FAQ Created successfully!',
      data,
    });
  } catch (error) {

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.errors, 
      });
    }


    res.status(400).json({
      success: false,
      message: 'Failed to create FAQ.',
      error: error.message,
    });
  }
});


router.get('/getFAQs', async (req, res) => {
  try {
    const faqs = await prisma.fAQ.findMany(); 
    res.status(200).json({
      success: true,
      data: faqs, 
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve FAQs.',
      error: error.message,
    });
  }
});


router.get('/getFAQ/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const faq = await prisma.fAQ.findUnique({
      where: { id },
    });

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: 'FAQ not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: faq, 
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve FAQ.',
      error: error.message,
    });
  }
});


router.put('/updateFAQ/:id', async (req, res) => {
  const { id } = req.params;
  const { question, answer } = req.body;
  console.log(id)

  try {
 
    faqSchema.parse({ question, answer });

   
    const updatedFAQ = await prisma.fAQ.update({
      where: { id },
      data: {
        question,
        answer,
      },
    });

    res.status(200).json({
      success: true,
      message: 'FAQ updated successfully!',
      data: updatedFAQ, 
    });
  } catch (error) {
 
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.errors, 
      });
    }

    res.status(400).json({
      success: false,
      message: 'Failed to update FAQ.',
      error: error.message,
    });
  }
});


router.delete('/deleteFAQ/:id', async (req, res) => {
  const { id } = req.params;

  try {
 
    const deletedFAQ = await prisma.fAQ.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: 'FAQ deleted successfully!',
      data: deletedFAQ, 
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to delete FAQ.',
      error: error.message,
    });
  }
});

module.exports = router;
