class AppError extends Error {
  //Extending Error class and modifying the error message
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; //If the statuscode starts with 4 then return fail else return error
    Error.captureStackTrace(this, this.constructor); //Getting the stack trace
  }
}

module.exports = AppError;
