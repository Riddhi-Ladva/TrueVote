const express = require('express');
const adminController = require('../controllers/admin-controller');
const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/checkAdmin');

const router = express.Router();

// Middleware to protect the routes
router.use(checkAuth);
router.use(checkAdmin);
router.get('/check', checkAdmin, (req, res, next) => {
    res.status(200).json({ message: 'User is an admin.' });
  });
// Route to get all users (admin-only)
router.get('/users', adminController.getAllUsers);

// Route to delete a user by ID (admin-only)
router.delete('/users/:userId', adminController.deleteUser);

module.exports = router;
