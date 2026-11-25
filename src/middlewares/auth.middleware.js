import jwt from 'jsonwebtoken';
import AcessoProibido from '../errors/AcessoProibido.js';
import NaoAutorizado from '../errors/NaoAutorizado.js';

export function autenticar(req, res, next) {

    const { authorization } = req.headers;

    if(!authorization || !authorization.startsWith('Bearer ')) {
        return next(new NaoAutorizado('Token não informado.'))
    };

    const token = authorization.split(' ')[1];

    try {

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        req.user = { id: payload.id, perfil: payload.perfil };

        return next();


    } catch {
        return next(new NaoAutorizado('Token inválido ou expirado'))
    }

}

export function autorizar(...perfisPermitidos) {
    return function (req, res, next) {
        if (!req.user) {
            return next(new NaoAutorizado('Autenticação necessária.'));
        }

        if (!perfisPermitidos.includes(req.user.perfil)) {
            return next(new AcessoProibido());
        }

        return next();
    };
}