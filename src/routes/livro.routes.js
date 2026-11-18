import express from 'express';

import { autenticar } from '../middlewares/auth.middleware.js';
import { criarLivroController, listarLivrosController, buscarLivroPorIdController, atualizarLivroController, deletarLivroController } from '../controllers/livro.controllers.js';

const router = express.Router();

router.post('/livros', autenticar, criarLivroController);

router.get('/livros', autenticar, listarLivrosController);

router.get('/livros/:id', autenticar, buscarLivroPorIdController);

router.patch('/livros/:id', autenticar, atualizarLivroController);

router.delete('/livros/:id', autenticar, deletarLivroController);

export default router;
