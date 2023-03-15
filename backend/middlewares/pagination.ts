import { NextFunction, Response, Request } from 'express';
import ROUTES from '../routes';

const requiredPaginationRoutes = [ROUTES.getImages];

/**
 * Pagination checker middleware for specific routes.
 */
function paginationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.method === 'GET') {
      if (requiredPaginationRoutes.includes(req.route.path)) {
        const page = req.query.page;

        if (!page) {
          throw Error('Parameter "page" is required');
        }

        if (isNaN(Number(page)) || Number(page) === 0) {
          throw Error('Parameter "page" is not valid');
        }
      }
    }
    next();
  } catch (e) {
    next(e);
  }
}

export default paginationMiddleware;
