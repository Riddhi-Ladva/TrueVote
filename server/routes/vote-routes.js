const express = require('express');
const { check } = require('express-validator');

const voteController = require('../controllers/vote-controller');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

// All routes after this middleware require authentication
router.use(checkAuth);

// POST /api/votes - Cast a vote
router.post(
  '/',
  [
    check('voterID').not().isEmpty(),
    check('electionID').not().isEmpty(),
    check('candidateID').not().isEmpty(),
  ],
  voteController.castVote
);

// GET /api/votes/:electionID - Get all votes for a specific election
router.get('/:electionID', voteController.getVotesByElection);

// GET /api/votes/user/:userID - Get all votes cast by a specific voter
router.get('/', voteController.getVotesByUser);

module.exports = router;
