import { Request, Response } from 'express';
import { TransactionService } from '../services/TransactionService';

export class TransactionController {
  private service = new TransactionService();

  create = async (req: Request, res: Response) => {
    try {
      const transaction = await this.service.create(req.body);
      res.status(201).json(transaction);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  };

  list = async (req: Request, res: Response) => {
    const transactions = await this.service.list();
    res.json(transactions);
  };
}