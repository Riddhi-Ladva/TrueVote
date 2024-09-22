const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schema = mongoose.Schema;

const userSchema = new schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    minlength: [3, 'Username must be at least 3 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required']
  },
  role: {
    type: String,
    enum: ['voter', 'candidate', 'admin']
  },
  profile: {
    name: {
      type: String,
      required: [false, 'Name is required'],
      minlength: [3, 'Name must be at least 3 characters long']
    },
    photo: {
      type: String,
      required: [false, 'Photo is required']
    },
    contactNumber: {
      type: String,
      required: [false, 'Contact number is required'],
      match: [/^\d{10}$/, 'Phone number must be 10 digits long']
    },
    address: {
      type: String,
      required: [false, 'Address is required']
    }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const candidateSchema = new schema({
  campaignInfo: {
    manifesto: {
      type: String,
      required: [true, 'Manifesto is required']
    },
    promises: {
      type: String,
      required: [true, 'Promises are required']
    },
    updates: {
      type: [String],
      validate: {
        validator: function (updates) {
          return updates.every(update => update.length <= 200);
        },
        message: 'Each update must not exceed 200 characters'
      }
    }
  },
  campaignMaterials: {
    type: [String]
  }
});

userSchema.plugin(uniqueValidator);
candidateSchema.plugin(uniqueValidator);

const User = mongoose.model('User', userSchema);
const Candidate = User.discriminator('Candidate', candidateSchema);

module.exports = {
  User,
  Candidate
};
