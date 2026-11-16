import ErroBase from './ErroBase.js';

class ErroConflito extends ErroBase {
    constructor(mensagem = 'A operação conflita com um registro existente') {
        super(mensagem, 409);
    }
}

export default ErroConflito;
