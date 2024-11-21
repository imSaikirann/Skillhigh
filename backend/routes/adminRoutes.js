const { PrismaClient } = require('@prisma/client');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const prisma = new PrismaClient();




router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

     
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }

      
        const existingUser = await prisma.admin.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists.' });
        }

      
        const hashedPassword = await bcrypt.hash(password, 10);

     
        const newUser = await prisma.admin.create({
            data: {
                email,
                password: hashedPassword,
            },
        });

        console.log('Token Verification Secret:', process.env.JWT_SECRET);
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({ message: 'User created successfully.', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
     
    
      
        const user = await prisma.admin.findUnique({ where: { email } });
        console.log(user)
        if (!user) {
            return res.status(400).json({ message:"Email not found", error: 'Invalid email or password.' });
        }

       
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message:"Password you entered is incorrect.",error: 'The email or password you entered is incorrect.' });
        }

        
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ message: 'Login successful.', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'The email or password you entered is incorrect.', error: 'Internal server error.' });
    }
});

module.exports = router;
