const { PrismaClient } = require('@prisma/client');
const express = require('express');
const authenticateUser = require('../middleware/userAuth')
const router = express.Router();
const prisma = new PrismaClient();

router.get('/profile',authenticateUser,async(req,res)=>{
    const userId = req.user.userId
    try {
        const data = await prisma.user.findUnique({
            where:{
                userId:userId
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


module.exports = router