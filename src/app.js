import express from 'express';
import { manipuladorDeErros } from './middlewares/manipuladorDeErros.js';

import livroRoutes from './routes/livro.routes.js';
import estoqueRoutes from './routes/estoque.routes.js';

const app = express();

app.use(express.json());

app.use(livroRoutes);
app.use(estoqueRoutes);

app.use(manipuladorDeErros);

export default app;