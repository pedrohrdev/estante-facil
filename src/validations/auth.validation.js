import { z } from 'zod';

export const registerSchema = z.object(
    {
        nome: z.string().trim()
            .min(2, 'O nome deve ter pelomenos 2 caracteres')
            .max(100, 'O nome deve ter no máximo 100 caracteres'),
        email: z.string().trim().toLowerCase().email('E-mail inválido'),
        senha: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres').max(78, 'A senha deve ter no máximo 72 caracteres')
    }
)