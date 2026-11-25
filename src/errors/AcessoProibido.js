import ErroBase from './ErroBase.js';

class AcessoProibido extends ErroBase {
    constructor(mensagem = 'Você não tem permissão para acessar este recurso') {
        super(mensagem, 403);
    }
}

export default AcessoProibido;
