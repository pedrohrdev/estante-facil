import User from '../models/user.model.js';
import RecursoJaCadastrado from '../errors/RecursoJaCadastrado.js';

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