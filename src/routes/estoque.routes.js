import express from 'express';
import { autenticar } from '../middlewares/auth.middleware.js';
import { 
    consultarEstoqueController,
    entradaEstoqueController,
    saidaEstoqueController,
    consultarLivroEspecificoController
} from '../controllers/estoque.controllers.js';

const router = express.Router();

// Consultar estoque dos livros
router.get('/estoque', autenticar, consultarEstoqueController);

// Consultar livro especifico
router.get('/estoque/:id', autenticar, consultarLivroEspecificoController);

// Entrada de estoque
router.post('/estoque/:id', autenticar, entradaEstoqueController);

// Retirar unidades
router.patch('/estoque/:id', autenticar, saidaEstoqueController);

export default router;