import ErroBase from "./ErroBase.js";

class RecursoJaCadastrado extends ErroBase {

    constructor(mensagem = 'Recurso ja cadastrado no sistema.') {
        super(mensagem, 409)
    }

};

export default RecursoJaCadastrado;