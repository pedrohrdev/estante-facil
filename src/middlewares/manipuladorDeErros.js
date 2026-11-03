import mongoose from 'mongoose';
import ErroBase from '../errors/ErroBase.js';
import RequisicaoIncorreta from '../errors/RequisicaoIncorreta.js';
import ErroValidacao from '../errors/ErroValidacao.js';

export function manipuladorDeErros(erro, req, res, next) {

    // 1 - Se for um erro de ID invalido do MongoDB (CastError)
    if(erro instanceof mongoose.Error.CastError) {
        return new RequisicaoIncorreta('O ID fornecido não é um ObjectId válido').enviarResposta(res);
    };

    // 2. Se for um erro de validação do Mongoose (Campos obrigatórios ausentes)
    if(erro instanceof mongoose.Error.ValidationError) {
        return new ErroValidacao(erro).enviarResposta(res);
    }

    // 3. Se for uma instância das nossas próprias classes de erro (ErroBase, NaoEncontrado, etc.)
    if (erro instanceof ErroBase) {
        return erro.enviarResposta(res);
    }

    // 4. Qualquer outro erro desconhecido cai aqui (Erro 500)
    console.error(erro);
    return new ErroBase().enviarResposta(res);

}