import express from 'express';
import routes from './routes';
import cors from 'cors';
import { AppDataSource } from './database/data-source';
import 'reflect-metadata';

AppDataSource.initialize().then(() => {
  console.log("Data Source has been initialized.");
});

const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);

export default app;