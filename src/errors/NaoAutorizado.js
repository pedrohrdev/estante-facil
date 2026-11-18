import ErroBase from './ErroBase.js'

class NaoAutorizado extends ErroBase {

    constructor(mensagem = 'Acesso não autorizado') {
        super(mensagem, 401)
    }

};

export default NaoAutorizado