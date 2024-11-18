
const { PrismaClient } = require('@prisma/client');
const express = require('express');
const { contactusSchema } = require('../zodValidation/vaidation');
const prisma = new PrismaClient();
const router = express.Router();
const z = require('zod');

 
router.post('/contactus', async (req, res) => {
    try {
      // Validate the incoming data using Zod
      const validatedData = contactusSchema.parse(req.body); // Will throw an error if validation fails
  
      // Create a new contact entry in the database
      const contact = await prisma.contactus.create({
        data: {
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone,
          message: validatedData.message,
        },
      });
  
      res.status(201).json({ success: true, data: contact });
    } catch (error) {
        console.log(error)
      if (error instanceof z.ZodError) {
        // If validation fails, send back the errors
        return res.status(400).json({ success: false, errors: error.errors });
      }
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  });
  

router.get('/contactus', async (req, res) => {
  try {
    const contacts = await prisma.contactus.findMany();
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

router.get('/contactus/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await prisma.contactus.findUnique({
      where: { id },
    });

    if (!contact) {
      return res.status(404).json({ success: false, error: 'Contact not found' });
    }

    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});


router.put('/contactus/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Validate the incoming data
    const validatedData = contactusSchema.parse(req.body);

    // Update the contact entry
    const updatedContact = await prisma.contactus.update({
      where: { id },
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        message: validatedData.message,
      },
    });

    res.status(200).json({ success: true, data: updatedContact });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, errors: error.errors });
    }
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

// Delete a contact entry by ID
router.delete('/contactus/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await prisma.contactus.delete({
      where: { id },
    });

    res.status(200).json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
