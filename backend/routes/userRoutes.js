const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const prisma = new PrismaClient();
require('dotenv').config();
const { admin } = require('../config/firebase');





router.post('/signup', async (req, res) => {
    const { token, email, name, photoUrl } = req.body;
  
    try {
   
      const decodedToken = await admin.auth().verifyIdToken(token);
      const uid = decodedToken.uid;
  
     
      const user = await prisma.user.upsert({
        where: { userId: uid },
        update: {},
        create: {
          userId: uid,
          email,
          name,
          photoUrl,
        },
      });
  
    
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

module.exports = router;
