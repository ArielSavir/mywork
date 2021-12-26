//// ERROR HANDLER
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'failed';

  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err.statusCode,
      message: err.message,
      stack: err.stack,
    });
  } else {
    const io = err.isOperational;
    res.status(io ? err.statusCode : 500).json({
      status: io ? err.status : 'error',
      message: io ? err.message : 'Something went wrong',
    });
  }

  next();
};
