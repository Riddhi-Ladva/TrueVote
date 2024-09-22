class HttpError extends Error {
    constructor(message, errorCode) {
      super(message); // Call the parent class constructor with the error message
      this.code = errorCode; // Custom property to store the HTTP error code
    }
  }
  
  module.exports = HttpError;
  