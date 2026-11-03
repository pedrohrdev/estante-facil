import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
    constructor(erroMongoose) {

        // Extrais todas as mensagens de erro do Mongoose e junta em uma string
        const mensangensErros = Object.values(erroMongoose.errors)
            .map(e => e.message)
            .join('; ');

        super(`Erro de validacao de dados: ${mensangensErros}`)    

    }
};

export default ErroValidacao;