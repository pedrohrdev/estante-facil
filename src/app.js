import express from 'express';
import { manipuladorDeErros } from './middlewares/manipuladorDeErros.js';

const app = express();

app.use(express.json());
app.use(manipuladorDeErros);

export default app;
