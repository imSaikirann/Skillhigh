const cors = require('cors')

const express = require('express');
const courseRoutes = require('./routes/courseRoutes')
const topicRoutes = require('./routes/topicRoutes')
const quizRoutes = require('./routes/quizRoutes')
const departmentRoutes = require('./routes/departmentRoutes')
const projectRoutes = require('./routes/projectsRoutes')
const faqRoutes = require('./routes/faqsRoutes')
const contactusRoutes = require('./routes/contactusRoutes')
const testimonalRoutes = require('./routes/testimonalRoutes')
const mentorRoutes = require('./routes/mentorRoutes')
const adminRoutes = require('./routes/adminRoutes')
const authenticateAdmin = require('./middleware/adminAuth')
const userRoutes = require('./routes/userRoutes')
const profileRoutes = require('./routes/userProfile')
const purchaseRoutes = require('./routes/purchaseRoutes')
const courseModuleRoutes = require('./routes/courseModules')
const paymentRoutes = require('./routes/paymentRoutes')
const pricingRoutes = require('./routes/pricingRoutes')






require('dotenv').config();







require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3000; 

const allowedOrigins = [
    'http://localhost:5174', 
    'http://localhost:5173', 
    'https://admin.skillhigh.in',
    'https://skillhigh.in',
    'https://www.skillhigh.in'
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.error(`CORS error: Origin ${origin} not allowed`);
            callback(new Error('CORS policy violation: Access denied'));
        }
    },
    credentials: true
}));

app.post('/api/checking', authenticateAdmin, (req, res) => {
    const value = true;
    res.status(200).json({ message: "Welcome to the admin dashboard", value }); 
  });




// Middleware to parse JSON requests
app.use(express.json()); 



app.use('/api/v1/course',courseRoutes)
app.use('/api/v1/topic',topicRoutes)
app.use('/api/v1/topicQuiz', quizRoutes)
app.use('/api/v1/department', departmentRoutes) 
app.use('/api/v1/project', projectRoutes)
app.use('/api/v1/faqs', faqRoutes ) 
app.use('/api/v1/contacts', contactusRoutes )
app.use('/api/v1/testimonal', testimonalRoutes  ) 
app.use('/api/v1/mentors', mentorRoutes )
app.use('/api/v1/admin',adminRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/profile', profileRoutes)
app.use('/api/v1/purchaseCourse', purchaseRoutes)
app.use('/api/v1/CourseModules', courseModuleRoutes)
app.use('/api/v1/payments',paymentRoutes )
app.use('/api/v1/pricings',pricingRoutes )













 
 

 

app.get('/', (req, res) => { 
    res.send('Welcome to the Express Server!');
});


app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
});

