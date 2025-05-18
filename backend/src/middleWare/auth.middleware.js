const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const protectRoutes = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userid).select('-password');
    next();
  } 
  catch (error) {
    console.error('Error during token verification:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
module.exports = protectRoutes;