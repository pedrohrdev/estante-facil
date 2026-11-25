import express from 'express';

const router = express.Router();

import { validate } from '../middlewares/validate.middleware.js';
import { registerSchema, loginSchema } from '../validations/auth.validation.js';
import { registrarUserController, loginUserController } from '../controllers/auth.controllers.js';

// Criar usuario 
router.post('/auth/register', validate(registerSchema), registrarUserController);
router.post('/auth/login', validate(loginSchema), loginUserController);

export default router;