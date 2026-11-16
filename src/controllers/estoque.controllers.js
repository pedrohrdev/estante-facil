import Livro from '../models/livro.model.js';
import RequisicaoIncorreta from '../errors/RequisicaoIncorreta.js';
import NaoEncontrado from '../errors/NaoEncontrado.js';

export async function consultarEstoqueController(req, res, next) {

    try {

        const livros = await Livro.find().select(['titulo', 'estoque']);

        return res.json(livros)

    } catch(erro) {
        return next(erro)
    }

};

export async function entradaEstoqueController(req, res, next) {

    try {

        // Pegar um livro e adcionar uma quantidade numerica ao seu estoque

        const idLivro = req.params.id;

        const { quantidade } = req.body;

        // É um inteiro maior q 0?
        if(!Number.isInteger(quantidade) || quantidade < 1) {
            return next(new RequisicaoIncorreta(`A quantidade a ser adcionada deve ser um inteiro maior ou igual a 1`))
        };

        const livroAtualizado = await Livro.findByIdAndUpdate(
            idLivro,
            { $inc: { estoque: quantidade } },
            { new: true, runValidators: true}
        );

        // O livro existe?
        if(!livroAtualizado) {
            return next(new NaoEncontrado('Livro não encontrado'))
        };

        return res.status(200).json(
            {
                message: "Estoque atualizado com sucesso!",
                livro: livroAtualizado
            }
        )
    
    } catch(erro) {
        return next(erro)
    }

}