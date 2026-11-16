import Livro from '../models/livro.model.js';
import NaoEncontrado from '../errors/NaoEncontrado.js';

function escaparRegex(texto) {
    return texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export async function criarLivroController(req, res, next) {

    try {

        const livro = await Livro.create(req.body);

        return res.status(201).json(
            {
                message: `O livro ${livro.titulo} foi criado com sucesso!`,
                livro
            }
        )
    } catch(erro) {
        return next(erro)
    }

};

/*
{
    "titulo": "Nunca É Hora De Parar",
    "preco": 48.70,
    "descricao": "Do mesmo autor de Nada pode me ferir, mais de 5 milhões de livros vendidos. A única coisa que sei é: eu sou David Goggins. Existo, logo termino o que começo. Tenho orgulho do meu esforço. E, enquanto eu estiver no planeta Terra, não vou fazer nada pela metade - David Goggins. David Goggins é um tipo raro de ser humano. Seu compromisso com sua filosofia, que destaca a importância de alcançar a grandeza através de resiliência mental e disciplina, dando tudo de si, tem servido de inspiração e motivação para milhões de pessoas em todo o mundo, inclusive para mim - Dwayne Johnson, 'The Rock'. Em seu primeiro livro, Nada pode me ferir, Goggins revela o potencial inexplorado que todos temos dentro de nós. Agora ele nos leva para o seu laboratório mental, no qual desenvolveu a filosofia, a psicologia e as estratégias que lhe mostraram que superar seus limites é apenas o ponto de partida, pois a busca pela grandeza nunca termina. Sua impressionante história oferece ao leitor um mapa para sair do fundo do poço e chegar a um novo patamar que antes parecia inalcançável. Se você sente que está sem rumo na vida, se busca maximizar seu potencial ou se apenas quer usar todas as suas energias para vencer barreiras aparentemente impossíveis, este livro é a inspiração de que você precisa.",
    "categoria": "Autoajuda",
    "editora": "GMT",
    "formato": "Físico",
    "paginas": 272,
    "anoEdicao": 2023,
    "dimensao": "23x16x1.8cm",
    "autor": "David Goggins",
    "isbn": "6555647299",
    "estoque": 1
}
*/

export async function listarLivrosController(req, res, next) {
    try {
        // 1. Extrai paginação e ordenação da URL (corrigido parseInt e req.query)
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.max(1, parseInt(req.query.limit) || 10);
        const sortBy = req.query.sortBy || 'titulo';
        const order = req.query.order === 'desc' ? -1 : 1;

        // 2. Valida se o campo de ordenação é permitido
        const camposPermitidos = ['titulo', 'autor', 'categoria', 'editora', 'anoEdicao'];
        if (!camposPermitidos.includes(sortBy)) {
            return res.status(400).json({ 
                message: `Campo de ordenação inválido. Permitidos: ${camposPermitidos.join(', ')}` 
            });
        }

        // 3. Monta os filtros de busca
        const { categoria, busca } = req.query;
        const filtros = {};

        if (typeof categoria === 'string' && categoria.trim()) {
            filtros.categoria = categoria.trim();
        }

        if (typeof busca === 'string' && busca.trim()) {
            const termo = new RegExp(escaparRegex(busca.trim()), 'i');
            filtros.$or = [
                { titulo: termo },
                { autor: termo },
            ];
        }

        // 4. Calcula quantos documentos pular e monta o objeto de ordenação
        const skip = (page - 1) * limit;
        const ordenacao = { [sortBy]: order };

        // 5. Executa a busca paginada/ordenada e conta o total ao mesmo tempo
        const [livros, totalLivros] = await Promise.all([
            Livro.find(filtros)
                .sort(ordenacao)
                .skip(skip)
                .limit(limit),
            Livro.countDocuments(filtros)
        ]);

        const totalPaginas = Math.ceil(totalLivros / limit);

        // 6. Retorna os livros e as informações de paginação
        return res.status(200).json({
            message: 'Livros listados com sucesso!',
            livros,
            paginacao: {
                paginaAtual: page,
                itensPorPagina: limit,
                totalLivros,
                totalPaginas
            }
        });

    } catch (erro) {
        return next(erro);
    }
}

export async function buscarLivroPorIdController(req, res, next) {

    try {

        const { id } = req.params;

        const livro = await Livro.findById(id);

        if(!livro) {
            return next(new NaoEncontrado(`O livro com o id ${id} não foi encontrado!`));
        };

        return res.status(200).json(
            {
                message: `O livro ${livro.titulo} foi encontrado com sucesso!`,
                livro
            }
        )

    } catch(erro) {
        return next(erro);
    }

}

export async function atualizarLivroController(req, res, next) {

    try {

        const { id } = req.params;

        const livro = await Livro.findById(id);

        if(!livro) {
            return next(new NaoEncontrado(`O livro com o id ${id} não foi encontrado!`));
        };

        livro.set(req.body);
        const livroAtualizado = await livro.save();

        return res.status(200).json(
            {
                message: `O livro ${livroAtualizado.titulo} foi atualizado com sucesso!`,
                livro: livroAtualizado
            }
        )

    } catch(erro) {
        return next(erro);
    }

}

export async function deletarLivroController(req, res, next) {

    try {

        const { id } = req.params;
    
        const livroDeletado = await Livro.findByIdAndDelete(id);

        if(!livroDeletado) {
            return next(new NaoEncontrado(`O livro com o id ${id} não foi encontrado!`));
        }

        return res.status(200).json(
            {
                message: `O livro ${livroDeletado.titulo} foi deletado com sucesso!`,
            }
        )

    } catch(erro) {
        return next(erro);
    }
}
