import { registrarUserService } from '../service/auth.services.js';

export async function registrarUserController(req, res, next) {

    try {

        const { nome, email, senha } = req.body;

        await registrarUserService(nome, email, senha);

        return res.status(201).json(
            {
                message: "Conta criada com sucesso!",
            }
        )

    } catch(erro) {
        return next(erro)
    }

}