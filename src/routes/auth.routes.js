import express from 'express';

const router = express.Router();

import { validate } from '../middlewares/validate.middleware.js';
import { registerSchema } from '../validations/auth.validation.js';
import { registrarUserController } from '../controllers/auth.controllers.js';

// Criar usuario 
router.post('/auth/register', validate(registerSchema), registrarUserController);

export default router;