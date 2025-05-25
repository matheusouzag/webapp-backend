import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Account } from '../entities/Account';
import { Transaction } from '../entities/Transaction';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'database.sqlite',
  synchronize: true,
  logging: false,
  entities: [Account, Transaction],
});