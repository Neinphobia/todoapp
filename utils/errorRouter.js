let errorRouter = (fn) => async (req, res, next) => {
  try {
    // run controllers logic
    await fn(req, res, next);
  } catch (e) {
    // console.log("errorrouter"); calistigini biliyourz
    // just continue performing the middleware chain

    next(e, req, res);
  }
};
module.exports = errorRouter;
