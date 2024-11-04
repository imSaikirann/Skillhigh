const userRoutes = require('./routes/userRoutes')
const courseRoutes = require('./routes/courseRoutes')
const topicRoutes = require('./routes/topicRoutes')
const quizRoutes = require('./routes/quizRoutes')



const express = require('express');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/course',courseRoutes)
app.use('/api/v1/topic',topicRoutes)
app.use('/api/v1/topicQuiz', quizRoutes)





app.get('/', (req, res) => {
    res.send('Welcome to the Express Server!');
});


app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
});

