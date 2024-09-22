const express = require('express');
const { check } = require('express-validator');
const userController = require('../controllers/user-controller');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

// Route for user registration
router.post(
  '/register',
  [
    check('username').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
    check('role').isIn(['voter', 'candidate','admin']),
    check('profile.name').not().isEmpty()
  ],
  userController.registerUser
);

// Route for user login
router.post('/login', userController.loginUser);

router.use(checkAuth);
// Route to get the profile of the logged-in user
router.get('/profile', userController.getUserProfile);

// Route to update the profile of the logged-in user
router.put(
  '/profile',
  [
    check('username').optional().not().isEmpty(),
    check('email').optional().normalizeEmail().isEmail(),
    check('profile.name').optional().not().isEmpty()
  ],
  userController.updateUserProfile
);

// Export the router
module.exports = router;
