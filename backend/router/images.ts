import { getPhotos } from '../api';

import { Router, Request, Response } from 'express';
import ROUTES from '../routes';
import delayMiddleware from '../middlewares/delay';
import errorHandlerMiddleware from '../middlewares/error';
import paginationMiddleware from '../middlewares/pagination';

const router = Router();

router.get(
  ROUTES.getImages,
  [paginationMiddleware, delayMiddleware, errorHandlerMiddleware],
  async (req: Request<unknown, unknown, unknown, { page: string }>, res: Response) => {
    const page = req.query.page;
    const photos = await getPhotos(page);
    res.status(200).send(photos);
  },
);

export default router;
