import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/connection';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      response.status(error.status).json({
        status: 'error',
        message: error.message,
      });
    } else {
      response.status(500).json({
        status: 'error',
        message: 'internal server error',
      });
    }
  },
);

app.listen(3333, () => {
  console.log('[API] Server started');
});
