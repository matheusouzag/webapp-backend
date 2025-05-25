import { Router } from 'express';
import { AccountController } from '../controllers/AccountController';
import { TransactionController } from '../controllers/TransactionController';

const routes = Router();
const accountController = new AccountController();
const transactionController = new TransactionController();

// contas
routes.post('/accounts', accountController.create);
routes.get('/accounts', accountController.list);
routes.put('/accounts/:id', accountController.update);
routes.delete('/accounts/:id', accountController.delete);

// transações
routes.post('/transactions', transactionController.create);
routes.get('/transactions', transactionController.list);

export default routes;
