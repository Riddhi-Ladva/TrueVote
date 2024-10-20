const { User } = require('../models/user');
const HttpError = require('../models/http-error');
const mongoose = require('mongoose');
// Controller to get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (err) {
    const error = new HttpError('Fetching users failed, please try again later.', 500);
    return next(error);
  }
};

// Controller to delete a user by ID
// Controller to delete a user by ID
exports.deleteUser = async (req, res, next) => {
  const userId = req.params.userId;
  console.log(userId);

  // Check if the userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return next(new HttpError('Invalid user ID.', 400));
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return next(new HttpError('User not found.', 404));
    }

    await User.findByIdAndRemove(userId);
    res.status(200).json({ message: 'User deleted successfully!' });
  } catch (err) {
    const error = new HttpError('Deleting user failed, please try again later.', 500);
    return next(error);
  }
};


