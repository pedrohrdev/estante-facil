import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';
import RecursoJaCadastrado from '../errors/RecursoJaCadastrado.js';
import NaoAutorizado from '../errors/NaoAutorizado.js';

export async function registrarUserService(nome, email, senha) {

    // Email ja existe?
    const emailJaCadastrado = await User.findOne({ email: email});

    if(emailJaCadastrado) {
        throw new RecursoJaCadastrado('O e-mail informado ja está em uso.');
    }

    const usuarioCriado = await User.create({nome, email, senha});

    return {
        id: usuarioCriado.id, // So para testes em desenvolvimento, no futuro não 
        nome: usuarioCriado.nome,
        email: usuarioCriado.email

    }

};

export async function loginUserService(email, senha) {

    // Buscar user pelo email
    const userExiste = await User.findOne({ email: email }).select('+senha');

    if(!userExiste) {
        throw new NaoAutorizado('E-mail ou senha inválidos.')
    };

    const userComSenhaCorreta = await userExiste.compararSenha(senha)
    
    if(!userComSenhaCorreta) {
        throw new NaoAutorizado('E-mail ou senha inválidos');
    };

    const token = jwt.sign(
        {
            // Informações que serão armazenadas no token
            id: userExiste.id,
            perfil: userExiste.perfil,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return token;

}