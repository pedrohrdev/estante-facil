import express from 'express';
import { consultarEstoqueController, entradaEstoqueController } from '../controllers/estoque.controllers.js';

const router = express.Router();

// Consultar estoque dos livros
router.get('/estoque', consultarEstoqueController);

// Consultar livro especifico


// Entrada de estoque
router.post('/estoque/:id', entradaEstoqueController)

// Retirar unidades

export default router;