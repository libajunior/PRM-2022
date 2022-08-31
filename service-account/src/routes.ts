import { Router } from 'express';
import AuthController from './controller/AuthController';

//Instancio o reouter do express
const routes = Router();

//Rotas de Autenticação
routes.post('/admin/signin', AuthController.signInAdmin);

export default routes;