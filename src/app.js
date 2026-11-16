import express from 'express';
import { manipuladorDeErros } from './middlewares/manipuladorDeErros.js';

import livroRoutes from './routes/livro.routes.js'

const app = express();

app.use(express.json());

app.use(livroRoutes);

app.use(manipuladorDeErros);

export default app;