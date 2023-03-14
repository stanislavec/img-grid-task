import { NextFunction, Response, Request } from 'express';

const delay = () => {
  const ms = Math.floor(Math.random() * 101) + 200;
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Simple middleware to simulate delay
 */
async function delayMiddleware(_req: Request, _res: Response, next: NextFunction) {
  await delay();
  next();
}

export default delayMiddleware;
