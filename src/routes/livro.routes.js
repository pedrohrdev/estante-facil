import express from 'express';

import { criarLivroController, listarLivrosController, buscarLivroPorIdController, atualizarLivroController, deletarLivroController } from '../controllers/livro.controllers.js';

const router = express.Router();

router.post('/livros', criarLivroController);

router.get('/livros', listarLivrosController);

router.get('/livros/:id', buscarLivroPorIdController);

router.patch('/livros/:id', atualizarLivroController);

router.delete('/livros/:id', deletarLivroController);

export default router;
