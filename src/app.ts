import express from 'express';
import routes from './routes';
import { AppDataSource } from './database/data-source';
import 'reflect-metadata';

AppDataSource.initialize().then(() => {
  console.log("Data Source has been initialized.");
});

const app = express();
app.use(express.json());
app.use(routes);

export default app;