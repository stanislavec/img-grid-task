import { NextFunction, Response, Request } from 'express';
import ROUTES from '../routes';

const requiredPaginationRoutes = [ROUTES.getImages];

/**
 * Pagination checker middleware for specific routes.
 */
function paginationMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'GET') {
    if (requiredPaginationRoutes.includes(req.route.path) && !req.query.page) {
      res.status(500).send({ message: 'Parameter "page" is required' });
    }
  }
  next();
}

export default paginationMiddleware;
