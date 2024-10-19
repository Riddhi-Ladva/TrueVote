const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const {User,Candidate} = require('../models/user');
const HttpError = require('../models/http-error');

// Controller for user registration
const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { username, email, password, role, profile } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError('Signing up failed, please try again later.', 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError('User exists already, please login instead.', 422);
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError('Could not create user, please try again.', 500);
    return next(error);
  }

  const createdUser = new User({
    username,
    email,
    passwordHash: hashedPassword,
    role,
    profile,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError('Signing up failed, please try again.', 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email, role: createdUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError('Signing up failed, please try again.', 500);
    return next(error);
  }

  res.status(201).json({ userId: createdUser.id, email: createdUser.email, role: createdUser.role, token: token });
};
// Controller for user login
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError('Logging in failed, please try again later.', 500);
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError('Invalid credentials, could not log you in.', 403);
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.passwordHash);
  } catch (err) {
    const error = new HttpError('Could not log you in, please check your credentials and try again.', 500);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError('Invalid credentials, could not log you in.', 403);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email , role: existingUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError('Logging in failed, please try again.', 500);
    return next(error);
  }

  res.json({ userId: existingUser.id, email: existingUser.email, role: existingUser.role , token: token });
};

// Controller for getting user profile
const getUserProfile = async (req, res, next) => {
  const userId = req.userData?.userId; // Ensure userId exists

  if (!userId) {
    const error = new HttpError('User ID is missing.', 400); // Handle missing user ID
    return next(error);
  }

  let user;
  try {
    console.log('Fetching user with ID:', userId); // Log the userId being queried

    user = await User.findById(userId, '-passwordHash'); // Exclude passwordHash field
    console.log('User fetched:', user); // Log the user object
  } catch (err) {
    const error = new HttpError('Fetching profile failed, please try again later.', 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for the provided ID.', 404);
    return next(error);
  }

  res.json({ user: user.toObject({ getters: true }) }); // Return the user object
};


// Controller for updating user profile
const updateUserProfile = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { username, email, profile } = req.body;
  const userId = req.userData.userId;

  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError('Something went wrong, could not update profile.', 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for the provided id.', 404);
    return next(error);
  }

  user.username = username || user.username;
  user.email = email || user.email;
  user.profile = profile || user.profile;
  user.updatedAt = new Date();

  try {
    await user.save();
  } catch (err) {
    const error = new HttpError('Something went wrong, could not update profile.', 500);
    return next(error);
  }

  res.status(200).json({ user: user.toObject({ getters: true }) });
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile
};
