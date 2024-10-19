const { validationResult } = require('express-validator');
const {Election} = require('../models/election');
const HttpError = require('../models/http-error');

// Create a new election
exports.createElection = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { name, description, startDate, endDate, status } = req.body;

    try {
        const newElection = new Election({
            name,
            description,
            startDate,
            endDate,
            status,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await newElection.save();

        res.status(201).json({ message: 'Election created successfully!', election: newElection });
    } catch (err) {
        const error = new HttpError('Creating election failed, please try again later.', 500);
        return next(error);
    }
};

// Get all elections
exports.getAllElections = async (req, res, next) => {
    try {
      const elections = await Election.find();
      console.log(elections);
      res.status(200).json({ elections });
    } catch (err) {
        console.log(err);
      const error = new HttpError('Fetching elections failed, please try again later.', 500);
      return next(error);
    }
  };
  

// Get a single election by ID
exports.getElectionById = async (req, res, next) => {
    const electionId = req.params.electionId;

    try {
        const election = await Election.findById(electionId);
        if (!election) {
            return next(new HttpError('Election not found.', 404));
        }

        res.status(200).json({ election });
    } catch (err) {
        const error = new HttpError('Fetching election failed, please try again later.', 500);
        return next(error);
    }
};

// Update an election by ID
exports.updateElection = async (req, res, next) => {
    const electionId = req.params.electionId;
    const { name, description, startDate, endDate, status } = req.body;

    try {
        const election = await Election.findById(electionId);
        if (!election) {
            return next(new HttpError('Election not found.', 404));
        }

        if (name) election.name = name;
        if (description) election.description = description;
        if (startDate) election.startDate = new Date(startDate);
        if (endDate) election.endDate = new Date(endDate);
        if (status) election.status = status;

        election.updatedAt = new Date();

        await election.save();

        res.status(200).json({ message: 'Election updated successfully!', election });
    } catch (err) {
        const error = new HttpError('Updating election failed, please try again later.', 500);
        return next(error);
    }
};

// Delete an election by ID
exports.deleteElection = async (req, res, next) => {
    const electionId = req.params.electionId;

    try {
        const election = await Election.findById(electionId);
        if (!election) {
            return next(new HttpError('Election not found.', 404));
        }

        await Election.findByIdAndRemove(electionId);

        res.status(200).json({ message: 'Election deleted successfully!' });
    } catch (err) {
        const error = new HttpError('Deleting election failed, please try again later.', 500);
        return next(error);
    }
};
