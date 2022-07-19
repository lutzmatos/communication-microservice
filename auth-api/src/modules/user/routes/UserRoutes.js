import { Router } from 'express';

import UserController from '../controller/UserController.js';
import middlewareAuth from './../../../middlewares/auth/Auth.js';

const router = new Router;

/**
 * @description Acesso livre.
 */

// Geração de token
router.post(
    '/api/user/auth',
    UserController.getAccessToken
);

/**
 * @description Autenticação e autorização.
 */

// Checagem de jwt
router.use(middlewareAuth);

/**
 * @description Acesso seguro.
 */

router.get(
    '/api/user/email/:email',
    UserController.findByEmail
);

export default router;
