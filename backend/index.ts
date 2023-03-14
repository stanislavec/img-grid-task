import express, { Express, Request, Response } from 'express';
import { getPhotos } from './api';
import delayMiddleware from './middlewares/delay';
import paginationMiddleware from './middlewares/pagination';
import ROUTES from './routes';
const router = express.Router();

const app: Express = express();
const port = 4000;

app.get(
  ROUTES.getImages,
  [paginationMiddleware, delayMiddleware],
  async (req: Request<unknown, unknown, unknown, { page: string }>, res: Response) => {
    try {
      const page = req.query.page;
      const photos = await getPhotos(page);
      res.status(200).send(photos);
    } catch (e) {
      res.status(500).send({ message: 'Something went wrong' });
    }
  },
);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
