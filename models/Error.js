class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message) {
    return new ApiError(404, message);
  }

  static loginError(message) {
    return new ApiError(400, message);
  }

  static customError(err) {
    return new ApiError(err.status, err.message);
  }
}

module.exports = ApiError;
