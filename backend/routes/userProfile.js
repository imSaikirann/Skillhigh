const { PrismaClient } = require('@prisma/client');
const express = require('express');
const authenticateUser = require('../middleware/userAuth')
const router = express.Router();
const prisma = new PrismaClient();

router.get('/profile',authenticateUser,async(req,res)=>{
    console.log(req.user)
    const userId = req.user.userId
    try {
        const data = await prisma.user.findUnique({
            where:{
                id:userId
            },
            include:{
                purchase :true
            }
        })
           
        res.json(data)
    } catch (error) { 
        res.json(error)
    }
})

router.post('/tokenChecking', authenticateUser, async (req, res) => {
    try {
      const value = true; // Your main logic
      res.status(200).json({ value }); // Success response
    } catch (error) {
      console.error('Error in /tokenChecking:', error.message);
      res.status(500).json({ message: 'Internal Server Error', error: error.message }); // Error response
    }
  });
  


module.exports = router