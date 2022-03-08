function ExceptionError(data, message, statuscode = 400) {
  this.status = statuscode;
  this.message = message;
  this.data = data
}

function userExceptionError(data, message, statuscode = 400) {
  this.status = statuscode;
  this.message = message;
  this.data = data
}

module.exports = {
  ExceptionError,
  userExceptionError
}