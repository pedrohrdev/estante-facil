import express from 'express';
import { consultarEstoqueController} from '../controllers/estoque.controllers.js';

const router = express.Router();

// Consultar estoque dos livros
router.get('/estoque', consultarEstoqueController);

// Consultar livro especifico


// Entrada de estoque


// Retirar unidades

export default router;