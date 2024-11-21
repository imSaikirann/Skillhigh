const jwt = require('jsonwebtoken');

const authenticateAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
 
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized, no token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
   

       
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    

        req.admin = decoded; 
        next(); 
    } catch (error) {
        console.error('JWT Verification Error:', error.message);

      
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ error: 'Token signature is invalid' });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ error: 'Token has expired' });
        }

        return res.status(403).json({ error: 'Token is not valid' });
    }
};

module.exports = authenticateAdmin;
