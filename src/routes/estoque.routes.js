import express from 'express';
import { 
    consultarEstoqueController,
    entradaEstoqueController,
    saidaEstoqueController,
    consultarLivroEspecificoController
} from '../controllers/estoque.controllers.js';

const router = express.Router();

// Consultar estoque dos livros
router.get('/estoque', consultarEstoqueController);

// Consultar livro especifico
router.get('/estoque/:id', consultarLivroEspecificoController);

// Entrada de estoque
router.post('/estoque/:id', entradaEstoqueController);

// Retirar unidades
router.patch('/estoque/:id', saidaEstoqueController);

export default router;