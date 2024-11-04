const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const prisma = new PrismaClient();
require('dotenv').config();



//login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
   
        const hashedPassword = await bcrypt.hash(password, 10);

    
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword
            }
        });

    
        const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15d' }); 

        res.status(201).json({
            user,
            accessToken,
 
        });
    } catch (error) {
        console.log(error)
        res.status(500).json( error );
    }
});

//get users
router.get('/get', async(req,res)=>{
    try {
        const data = await prisma.user.findMany({})
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router;
