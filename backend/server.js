const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const courseRoutes = require('./routes/courseRoutes')
const topicRoutes = require('./routes/topicRoutes')
const quizRoutes = require('./routes/quizRoutes')
const departmentRoutes = require('./routes/departmentRoutes')
const projectRoutes = require('./routes/projectsRoutes')





const express = require('express');

require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 3000; 

const allowedOrigins = [
    'http://localhost:5174', 
    'http://localhost:5173', 
    'https://skillhigh-3utd.vercel.app',
    'https://skillhigh.in'
];

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

// Middleware to parse JSON requests
app.use(express.json()); 
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/course',courseRoutes)
app.use('/api/v1/topic',topicRoutes)
app.use('/api/v1/topicQuiz', quizRoutes)
app.use('/api/v1/department', departmentRoutes)
app.use('/api/v1/project', projectRoutes)


 
 



app.get('/', (req, res) => {
    res.send('Welcome to the Express Server!');
});


app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
});

