import { NextFunction, Response, Request } from 'express';

function errorHandlerMiddleware(
  err: Error & { statusCode: number },
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const status = err.statusCode || 500;
  const message = err.message || 'Something went wrong...';
  res.status(status).json({
    message,
  });
}

export default errorHandlerMiddleware;
