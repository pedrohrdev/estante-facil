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

export async function consultarLivroEspecificoController(req, res, next) {

    try {

        const idLivro = req.params.id;

        const livro = await Livro.findById(idLivro).select(['titulo', 'estoque']);

        if(!livro) {
            return next(new NaoEncontrado('Livro não encontrado'));
        }

        return res.status(200).json(
            {
                message: "Livro encontrado com sucesso!",
                livro: livro
            }
        )

    } catch(erro) {

        return next(erro)

    }

}

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

};

export async function saidaEstoqueController(req, res, next) {

    try {

        // Pegar um livro e remover uma quantidade numerica ao seu estoque
        
        const idLivro = req.params.id;
        const { quantidade } = req. body;

        const livro = await Livro.findById(idLivro).select('estoque');

        if(!livro) {

            return next(new NaoEncontrado('Livro não encontrado'));
        }

        if(!Number.isInteger(quantidade) || quantidade < 1) {

            return next(new RequisicaoIncorreta('O numero deve ser um inteiro maior que zero'))

        }
        
        if(quantidade > livro.estoque) {

            return next(new RequisicaoIncorreta('A quantidade a ser removida nao pode ser maior doque o estoque atual'));

        }

        const livroAtualizado = await Livro.findByIdAndUpdate(
            idLivro,
            { $inc: { estoque: -quantidade } },
            { new: true, runValidators: true }
        ).select('titulo estoque');

        return res.status(200).json(
            {
                message: "Estoque atualizado com sucesso!",
                livro: livroAtualizado
            }
        )

    } catch(erro) {
        next(erro)
    }

}