const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const voteSchema = new Schema({
  voterID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Voter ID is required']
  },
  electionID: {
    type: Schema.Types.ObjectId,
    ref: 'Election',
    required: [true, 'Election ID is required']
  },
  candidateID: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Candidate ID is required']
  },
  voteTimestamp: {
    type: Date,
    default: Date.now,
   
  }
});

voteSchema.plugin(uniqueValidator);


const Vote = mongoose.model('Vote', voteSchema);

module.exports = {
  Vote
};
