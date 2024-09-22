const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = (req, res, next) => {
  const jwtSecret = process.env.JWT_SECRET;

  console.log('JWT Secret:', jwtSecret);
  try {
    // Access the Authorization header (case-insensitive)
    const authHeader = req.headers.authorization || '';
    console.log(authHeader);
    // The Authorization header contains the 'Bearer' scheme
    if (!authHeader.startsWith('Bearer ')) {
      throw new Error('Authentication token is missing or invalid');
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];
    console.log('Token:', token);

    if (!token) {
      throw new Error('Authentication token not found');
    }

    // Verify the token using the secret key
    const decodedToken = jwt.verify(token, jwtSecret);
    console.log('Decoded Token:', decodedToken);

    // Add user data to the request object for use in other routes
    req.userData = { userId: decodedToken.userId, role: decodedToken.role };
    console.log(req.userData);
    // Proceed to the next middleware
    next();
  } catch (err) {
    console.error(err.message); 
    res.status(401).json({ message: 'Authentication failed!' });
  }
};
