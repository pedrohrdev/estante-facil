import mongoose from 'mongoose';
import ErroBase from '../errors/ErroBase.js';
import RequisicaoIncorreta from '../errors/RequisicaoIncorreta.js';
import ErroValidacao from '../errors/ErroValidacao.js';
import ErroConflito from '../errors/ErroConflito.js';

export function manipuladorDeErros(erro, req, res, next) {

    // 1 - Se for um erro de ID invalido do MongoDB (CastError)
    if(erro instanceof mongoose.Error.CastError) {
        return new RequisicaoIncorreta('O ID fornecido não é um ObjectId válido').enviarResposta(res);
    };

    // 2. Se for um erro de validação do Mongoose (Campos obrigatórios ausentes)
    if(erro instanceof mongoose.Error.ValidationError) {
        return new ErroValidacao(erro).enviarResposta(res);
    }

    // JSON malformado enviado no corpo da requisição.
    if (erro instanceof SyntaxError && erro.status === 400 && erro.type === 'entity.parse.failed') {
        return new RequisicaoIncorreta('O corpo da requisição contém um JSON inválido').enviarResposta(res);
    }

    // ISBN duplicado (índice unique do MongoDB).
    if (erro?.code === 11000) {
        const campoDuplicado = Object.keys(erro.keyPattern ?? {})[0];
        const mensagem = campoDuplicado === 'isbn'
            ? 'Já existe um livro cadastrado com esse ISBN'
            : 'Já existe um registro com esse valor';

        return new ErroConflito(mensagem).enviarResposta(res);
    }

    // 4. Se for uma instância das nossas próprias classes de erro (ErroBase, NaoEncontrado, etc.)
    if (erro instanceof ErroBase) {
        return erro.enviarResposta(res);
    }

    // 5. Qualquer outro erro desconhecido cai aqui (Erro 500)
    console.error(erro);
    return new ErroBase().enviarResposta(res);

}
