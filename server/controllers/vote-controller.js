const { validationResult } = require('express-validator');
const {Vote} = require('../models/vote');
const {Election }= require('../models/election');
const {User} = require('../models/user');
const {HttpError} = require('../models/http-error');
// Cast a vote
exports.castVote = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  // Get the logged-in user's ID from the token/session (instead of from req.body)
  const voterID = req.userData.userId; // Assuming userData is set in middleware after authentication
  const { electionID, candidateID } = req.body;

  try {
    // Check if the election exists and is active
    const election = await Election.findById(electionID);
    if (!election || election.status !== 'active') {
      return res.status(400).json({ message: 'Election not found or not active.' });
    }

    // Check if the voter exists
    const voter = await User.findById(voterID);
    if (!voter || voter.role !== 'voter') {
      return res.status(400).json({ message: 'Invalid voter.' });
    }

    // Check if the candidate exists
    const candidate = await User.findById(candidateID);
    if (!candidate || candidate.role !== 'candidate') {
      return res.status(400).json({ message: 'Invalid candidate.' });
    }

    // Check if the voter has already voted in this election
    const existingVote = await Vote.findOne({ voterID, electionID });
    if (existingVote) {
      return res.status(400).json({ message: 'Voter has already voted in this election.' });
    }

    // Create and save the new vote
    const vote = new Vote({
      voterID,
      electionID,
      candidateID,
      voteTimestamp: new Date(),
    });

    await vote.save();

    res.status(201).json({ message: 'Vote cast successfully!' });
  } catch (err) {
    const error = new HttpError('Casting vote failed, please try again later.', 500);
    return next(error);
  }
};


// Get all votes for a specific election
exports.getVotesByElection = async (req, res, next) => {
  const { electionID } = req.params;

  try {
    // Retrieve votes for the specified election
    const votes = await Vote.find({ electionID });

    res.status(200).json({ votes });
  } catch (err) {
    const error = new HttpError('Fetching votes failed, please try again later.', 500);
    return next(error);
  }
};

// Get all votes cast by a specific voter
exports.getVotesByUser = async (req, res, next) => {
  const userID = req.userData?.userId;

  try {
    // Retrieve votes cast by the specified user
    const votes = await Vote.find({ voterID: userID });

    res.status(200).json({ votes });
  } catch (err) {
    const error = new HttpError('Fetching votes failed, please try again later.', 500);
    return next(error);
  }
};
