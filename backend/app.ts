import express, { Express, Request, Response } from 'express';
import delayMiddleware from './middlewares/delay';
import errorHandlerMiddleware from './middlewares/error';
import paginationMiddleware from './middlewares/pagination';
import ImagesRouter from './router/images';

const app: Express = express();

app.use(express.json());

app.get('/', (_req: Request<unknown, unknown, unknown, { page: string }>, res: Response) => {
  res.status(200).send('Server works!');
});

app.use(`/api`, ImagesRouter);

export default app;
