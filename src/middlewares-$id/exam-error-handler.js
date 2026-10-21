export class AppError extends Error {
  constructor(message, statusCode = 500, code = 'INTERNAL_SERVER_ERROR') {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.errorCode = code;
  }
}

export function notFoundHandler(req, res, next) {
  next(new AppError(`Route ${req.method} ${req.originalUrl} not found`, 404, 'ROUTE_NOT_FOUND'));
}

export function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);

  let status = err.statusCode ?? err.status ?? 500;
  let code = err.errorCode ?? 'INTERNAL_SERVER_ERROR';
  let message = err.message || 'Unexpected server error';

  // Add mappings here for database error codes used by the exam schema.
  const mysqlErrors = {
    ER_DUP_ENTRY: [409, 'DUPLICATE_KEY', 'Resource already exists'],
    ER_NO_REFERENCED_ROW_2: [400, 'FOREIGN_KEY_NOT_FOUND', 'Referenced record does not exist'],
    ER_ROW_IS_REFERENCED_2: [409, 'RESOURCE_IN_USE', 'Resource is referenced by other records'],
    ECONNREFUSED: [503, 'DATABASE_UNAVAILABLE', 'Database is unavailable'],
  };

  if (mysqlErrors[err.code]) [status, code, message] = mysqlErrors[err.code];

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    status = 400;
    code = 'INVALID_JSON';
    message = 'Request body contains invalid JSON';
  }

  if (!Number.isInteger(status) || status < 400 || status > 599) status = 500;
  if (status >= 500 && !(err instanceof AppError)) {
    code = 'INTERNAL_SERVER_ERROR';
    message = 'Unexpected server error';
  }

  return res.status(status).json({
    success: false,
    error: { code, message },
  });
}
