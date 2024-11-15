export const sendResponse = (res, statusCode, message, data = null) => {
  return res.status(statusCode).json({
    success: statusCode >= 200 && statusCode < 300,
    message,
    data,
  });
};

export const sendError = (res, statusCode, message, errorDetails = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error: errorDetails || null,
  });
};
