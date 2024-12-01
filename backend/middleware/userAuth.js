const jwt = require('jsonwebtoken');


const authenticateUser = (req, res, next) => {
 
  const token = req.headers['authorization']?.split(' ')[1]; // 

  if (!token) {
    return res.status(403).json({ success: false, message: 'Token is required' });
  }

  try {
   
    const decoded = jwt.verify(token, process.env.JWT_USER_SECRET);
    
   
    req.user = decoded;
    console.log(req.user)
   
    next();
  } catch (error) {
    console.error('JWT verification error:', error);
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

module.exports =  authenticateUser;
