const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();
const authenticateUser = require('../middleware/userAuth')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const crypto = require('crypto');


const razorpay = new Razorpay({
    key_id: process.env.VITE_RAZORPAY_LIVE_ID,
    key_secret: process.env.VITE_RAZORPAY_SECRET_KEY,
});


router.post('/createOrder', authenticateUser, async (req, res) => {
  const userId = req.user.userId;

  try {
    const { courseId, price } = req.body;

    
    if (!courseId || !price || isNaN(price)) {
      return res.status(400).json({ error: 'Invalid courseId or price' });
    }

    
    const orderOptions = {
      amount: Math.round(price * 100), 
      currency: 'INR',
      receipt: `order_receipt_${Date.now()}`,
      notes: { courseId },
    };

    // Create order in Razorpay
    const order = await razorpay.orders.create(orderOptions);
    if (!order) {
      throw new Error('Order creation with Razorpay failed');
    }
    console.log(order)
    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error(err.message || err);
    res.status(500).json({
      success: false,
      error: err.message || 'Something went wrong while creating the order',
    });
  }
});


router.post('/verifyPayment', authenticateUser, async (req, res) => {
  
  try {
  
    const { orderId, paymentId, razorpaySignature, courseId, phone, email,price } = req.body;


    if (!orderId || !paymentId || !razorpaySignature) {
      return res.status(400).json({ error: 'Missing payment details' });
    }


    const generatedSignature = crypto
      .createHmac('sha256', process.env.VITE_RAZORPAY_SECRET_KEY)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    if (generatedSignature !== razorpaySignature) {
      return res.status(400).json({ error: 'Payment verification failed' });
    }

    const courseData = await prisma.course.findUnique({
      where:{
        id:courseId
      },
      select:{
        courseName:true
      }
    })

    console.log(courseData)
    const userId = req.user.userId; 
    const purchaseData = await prisma.purchase.create({
      data: {
        userId: userId, 
        courseName: courseData.courseName,
        courseId: courseId,
        purchaseId: orderId,
        price: price,
        phoneNumber: phone,
        email: email,
        using: false,
      },
    });
    

    res.json({
      success: true,
      message: 'Payment verified and purchase recorded',
      purchaseData,
    });
  } catch (err) {
    console.error(err.message || err);
    res.status(500).json({
      success: false,
      error: err.message || 'Something went wrong while verifying the payment',
    });
  }
});




  
module.exports = router