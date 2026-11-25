import express from 'express';
import { autenticar, autorizar } from '../middlewares/auth.middleware.js';
import { 
    consultarEstoqueController,
    entradaEstoqueController,
    saidaEstoqueController,
    consultarLivroEspecificoController
} from '../controllers/estoque.controllers.js';

const router = express.Router();

// Consultar estoque dos livros
router.get('/estoque', autenticar, autorizar('cliente', 'funcionario', 'admin'), consultarEstoqueController);

// Consultar livro especifico
router.get('/estoque/:id', autenticar, autorizar('cliente', 'funcionario', 'admin'), consultarLivroEspecificoController);

// Entrada de estoque
router.post('/estoque/:id', autenticar, autorizar('funcionario', 'admin'), entradaEstoqueController);

// Retirar unidades
router.patch('/estoque/:id', autenticar, autorizar('funcionario', 'admin'), saidaEstoqueController);

export default router;