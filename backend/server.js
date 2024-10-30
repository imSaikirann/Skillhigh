
const express = require('express');
const connectDB = require('./config/db'); 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Welcome to the Express Server!');
});


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to start server:", error);
});
