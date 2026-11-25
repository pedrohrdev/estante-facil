import express from 'express';

import { autenticar, autorizar } from '../middlewares/auth.middleware.js';
import { criarLivroController, listarLivrosController, buscarLivroPorIdController, atualizarLivroController, deletarLivroController } from '../controllers/livro.controllers.js';

const router = express.Router();

router.post('/livros', autenticar, autorizar('funcionario', 'admin'), criarLivroController);

router.get('/livros', autenticar, autorizar('cliente', 'funcionario', 'admin'), listarLivrosController);

router.get('/livros/:id', autenticar, autorizar('cliente', 'funcionario', 'admin'), buscarLivroPorIdController);

router.patch('/livros/:id', autenticar, autorizar('funcionario', 'admin'), atualizarLivroController);

router.delete('/livros/:id', autenticar, autorizar('funcionario', 'admin'), deletarLivroController);

export default router;
