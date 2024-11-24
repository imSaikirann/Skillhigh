const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Allowed origins
const allowedOrigins = [
    'http://localhost:5174', 
    'http://localhost:5173', 
    'https://admin.skillhigh.in',
    'https://skillhigh.in'
];

// CORS setup
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Middleware to parse JSON
app.use(express.json());

// Debugging middleware
app.use((req, res, next) => {
    console.log('Request Origin:', req.headers.origin);
    next();
});

// Define routes
app.use('/api/v1/course', require('./routes/courseRoutes'));
app.use('/api/v1/topic', require('./routes/topicRoutes'));
app.use('/api/v1/topicQuiz', require('./routes/quizRoutes'));
app.use('/api/v1/department', require('./routes/departmentRoutes')); 
app.use('/api/v1/project', require('./routes/projectsRoutes'));
app.use('/api/v1/faqs', require('./routes/faqsRoutes'));
app.use('/api/v1/contacts', require('./routes/contactusRoutes'));
app.use('/api/v1/testimonal', require('./routes/testimonalRoutes'));
app.use('/api/v1/mentors', require('./routes/mentorRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));
app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/profile', require('./routes/userProfile'));
app.use('/api/v1/purchaseCourse', require('./routes/purchaseRoutes'));

// Test route for CORS
app.get('/api/test', (req, res) => {
    res.json({ message: 'CORS is working!' });
});

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Express Server!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
