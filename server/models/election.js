const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;


const electionSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Election name is required'],
        unique: true,
        minlength: [3, 'Election name must be at least 3 characters long']
       
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [10, 'Description must be at least 10 characters long']
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required']
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required'],
        validate: {
            validator: function (value) {
                return value > this.startDate;
            },
            message: 'End date must be after start date'
        }
    },
    status: {
        type: String,
        enum: ['scheduled', 'ongoing', 'completed'],
        default: 'scheduled'
    },
    candidates: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        validate: {
            validator: function (candidates) {
                return candidates.length > 1;
            },
            message: 'At least two candidates are required'
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

electionSchema.plugin(uniqueValidator);

const Election = mongoose.model('Election', electionSchema);

module.exports = {
    Election
};
