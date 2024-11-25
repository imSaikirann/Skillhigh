const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const prisma = new PrismaClient();
require('dotenv').config();
const { admin } = require('../config/firebase');

// Signup Route
router.post('/signup', async (req, res) => {
  const { token, email, name } = req.body;

  try {
    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;

    // Upsert user into the database
    const user = await prisma.user.upsert({
      where: { userId: uid },
      update: {},
      create: {
        userId: uid,
        email,
        name,
      },
    });

    // Generate JWT
    const jwtToken = jwt.sign(
      { userId: user.userId, email: user.email },
      process.env.JWT_USER_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      success: true,
      user,
      token: jwtToken,
    });
  } catch (error) {
    console.error('Error during signup:', error.message);
    res.status(500).json({ success: false, message: 'Signup failed' });
  }
});

// Signin Route
router.post('/signin', async (req, res) => {
  const { token } = req.body;

  try {
    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;

    // Find user in the database
    const user = await prisma.user.findUnique({
      where: { userId: uid },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found. Please sign up first.',
      });
    }

    // Generate a new JWT for authenticated access
    const jwtToken = jwt.sign(
      { userId: user.userId, email: user.email },
      process.env.JWT_USER_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      success: true,
      user,
      token: jwtToken,
    });
  } catch (error) {
    console.error('Error during signin:', error.message);
    res.status(500).json({ success: false, message: 'Signin failed' });
  }
});



module.exports = router;
