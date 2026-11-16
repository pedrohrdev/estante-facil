import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
    constructor(erroMongoose) {

        // Extrai as mensagens de erro do Mongoose e junta em uma string.
        const mensagensErros = Object.values(erroMongoose.errors)
            .map(e => e.message)
            .join('; ');

        super(`Erro de validação de dados: ${mensagensErros}`);

    }
};

export default ErroValidacao;
