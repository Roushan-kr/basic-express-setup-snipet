const asyncHandlear = (reqHandlear) => (req, res, next) => {
  // console.log("utility fn called");
  Promise.resolve(reqHandlear(req, res, next)).catch((err) => next(err));
};

export { asyncHandlear };
