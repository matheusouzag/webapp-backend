import { Router } from 'express';
import { AccountController } from '../controllers/AccountController';

const routes = Router();
const accountController = new AccountController();

routes.post('/accounts', accountController.create);
routes.get('/accounts', accountController.list);
routes.put('/accounts/:id', accountController.update);
routes.delete('/accounts/:id', accountController.delete);

export default routes;