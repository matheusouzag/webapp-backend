import { Request, Response } from 'express';
import { AccountService } from '../services/AccountService';

export class AccountController {
  private service = new AccountService();

  create = async (req: Request, res: Response) => {
    try {
      const account = await this.service.create(req.body);
      res.status(201).json(account);
    } catch (err) {
      res.status(400).json({ error: (err as Error).message });
    }
  };

  list = async (req: Request, res: Response) => {
    const accounts = await this.service.list();
    res.json(accounts);
  };

  update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const account = await this.service.update(id, req.body);
    res.json(account);
  };

  delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await this.service.delete(id);
    res.status(204).send();
  };
}
