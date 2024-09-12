/*
  This utility function is used to handle the async function in the route handler.
  It will catch the error and pass it to the error handling middleware.
*/
const asyncHandlear = (reqHandlear) => (req, res, next) => {
  // console.log("utility fn called");
  Promise.resolve(reqHandlear(req, res, next)).catch((err) => next(err));
};

export { asyncHandlear };
