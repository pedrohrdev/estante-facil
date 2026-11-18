import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            trim: true,
            required: [true, 'O nome de usuario é obrigatório']
        },
        email: {
            type: String,
            required: [true, 'O e-mail é obrigatorio'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Por favor, insira um e-mail válido']
        },
        senha: {
            type: String,
            required: [true, 'A senha é obrigatória'],
            select: false
        },
        perfil: {
            type: String,
            enum: ['cliente', 'funcionário', 'admin'],
            default: 'cliente'
        }
    },
    {
        timestamps: true
    }
);

// Hook: roda automaticamente antes de cada save()
userSchema.pre('save', async function(next) {

    // Se a senha nao mudou(ex: usuario so trocou o nome), pula.
    // Sem isso, aconteceria o hash de uma hash, e ninguem iria conseguir logar
    if(!this.isModified('senha')) return next();

    // Se tudo ok faazemos o hash
    this.senha = await bcrypt.hash(this.senha, 12);

    next();

});

userSchema.methods.compararSenha = function(senhaDigitada) {
    // Compara a senha digitada com o hash guardado.
    // Retorna true ou false
    return bcrypt.compare(senhaDigitada, this.senha);
}

const User = mongoose.model('User', userSchema);

export default User;   