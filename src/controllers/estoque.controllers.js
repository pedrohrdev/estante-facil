import Livro from '../models/livro.model.js';
// import RequisicaoIncorreta from '../errors/RequisicaoIncorreta.js';
// import NaoEncontrado from '../errors/NaoEncontrado.js';

export async function consultarEstoqueController(req, res, next) {

    try {

        const livros = await Livro.find().select(['titulo', 'estoque']);

        return res.json(livros)

    } catch(erro) {
        return next(erro)
    }

};