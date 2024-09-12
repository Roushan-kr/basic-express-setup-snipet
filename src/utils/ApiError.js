import _conf from "../conf/config.js";
/**
 * Custom error class to handle API errors
 */
class ApiError extends Error {
  constructor(statusCode, msg = "Something went wrong", error = []) {
    super(msg);
    this.statusCode = statusCode;
    this.error = error;
    this.message = msg;
    this.data = null;
    this.success = false;

    // Enable stack trace capture only in development environment
    if (_conf.env === "development") {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = null; // Do not include stack trace in production or other environments
    }
  }
}

export default ApiError;
