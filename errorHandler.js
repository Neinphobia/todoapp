const logger = require("./logger");

function errorHandler(err, req, res, next) {
  //console.log("errhnd", req, res);
  // Log the error with stack trace
  // console.log("Error handler___");
  // logger.error(err.stack);
  // Customize error response

  let luckyNum = Math.round(Math.random() * 999);

  const errorResponse = {
    code: err.code || 404,

    message: err.message || "Internal Server Error_",
    timestamp: new Date().toLocaleString(),
    request: {
      method: req.method,
      url: req.url,
    },
    luckyNum,
  };

  // Send error response
  res.status(errorResponse.code).json(errorResponse).end();
}

module.exports = errorHandler;
