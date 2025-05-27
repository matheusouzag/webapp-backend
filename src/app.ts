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

app.post("/accounts", (req, res) => {
  console.log(req.body);
  res.status(201).json({ message: "Conta criada com sucesso!" });
});

export default app;