const {HttpError} = require('../models/http-error');

const checkAdmin = (req, res, next) => {
  
  if (req.userData.role !== 'admin') {
    return next(new HttpError('You are not authorized to perform this action.', 403));
  }
  console.log("Admin checked");
  next();
};

module.exports = checkAdmin;
