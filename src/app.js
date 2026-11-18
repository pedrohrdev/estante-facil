import express from 'express';
import { manipuladorDeErros } from './middlewares/manipuladorDeErros.js';

import livroRoutes from './routes/livro.routes.js';
import estoqueRoutes from './routes/estoque.routes.js';
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

app.use(express.json());

app.use(livroRoutes);
app.use(estoqueRoutes);
app.use(userRoutes);
app.use(authRoutes);

app.use(manipuladorDeErros);

export default app;