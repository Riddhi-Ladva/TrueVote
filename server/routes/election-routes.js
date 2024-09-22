const express = require('express');
const { check } = require('express-validator');
const checkAuth = require('../middleware/check-auth');
const electionController = require('../controllers/election-controller');
const checkAdmin = require('../middleware/checkAdmin');
const router = express.Router();

// Middleware to protect the routes
// router.use(checkAuth);

// Route to create a new election (admin-only)
router.post(
  '/',
  checkAdmin,
  [
    check('name').not().isEmpty().withMessage('Election name is required.'),
    check('description').not().isEmpty().withMessage('Election description is required.'),
    check('startDate').isISO8601().toDate().withMessage('Start date must be a valid date.'),
    check('endDate').isISO8601().toDate().withMessage('End date must be a valid date.'),
    check('status').isIn(['scheduled', 'active', 'closed']).withMessage('Status must be one of the following: scheduled, active, closed.')
  ],
  electionController.createElection
);

// Route to get all elections (accessible to everyone)
router.get('/', electionController.getAllElections);

// Route to get a single election by ID (accessible to everyone)
router.get('/:electionId', electionController.getElectionById);

// Route to update an election by ID (admin-only)
router.put(
  '/:electionId',
  checkAdmin,
  [
    check('name').optional().not().isEmpty().withMessage('Election name cannot be empty.'),
    check('description').optional().not().isEmpty().withMessage('Election description cannot be empty.'),
    check('startDate').optional().isISO8601().toDate().withMessage('Start date must be a valid date.'),
    check('endDate').optional().isISO8601().toDate().withMessage('End date must be a valid date.'),
    check('status').optional().isIn(['scheduled', 'active', 'closed']).withMessage('Status must be one of the following: scheduled, active, closed.')
  ],
  electionController.updateElection
);

// Route to delete an election by ID (admin-only)
router.delete('/:electionId', checkAdmin, electionController.deleteElection);

module.exports = router;
