class ErroBase extends Error {

    constructor(mensagem = 'Erro interno do servidor', status = 500) {

        super(mensagem);
        this.name = this.constructor.name;
        this.status = status;
        Error.captureStackTrace?.(this, this.constructor);

    }

    enviarResposta(res) {
        return res.status(this.status).json(
            {
                status: this.status,
                mensagem: this.message
            }
        )
    };
};

export default ErroBase;
