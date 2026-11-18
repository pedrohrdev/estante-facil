import { 
    registrarUserService,
    loginUserService
} from '../service/auth.services.js';

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

export async function loginUserController(req, res, next) {

    try {

        const { email, senha } = req.body;

        const token = await loginUserService(email, senha);

        res.status(200).json(
            {
                message: "Login realizado com sucesso!",
                token: token,
            }
        )

    } catch(erro) {
        return next(erro);
    }

}