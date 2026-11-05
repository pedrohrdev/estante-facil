import mongoose from 'mongoose';

const livroSchema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: [true, 'O título do livro é obrigatório'],
            trim: true
        },
        preco: {
            type: mongoose.Schema.Types.Decimal128,
            required: [true, 'O preço do livro é obrigatório'],
            validate: {
                validator: (valor) =>
                    valor !== null && /^\d+(?:\.\d{1,2})?$/.test(valor.toString()),
                message: 'Informe o preço em reais, sem valor negativo e com até duas casas decimais'
                
            }
        },
        descricao: {
            type: String,
            required: [true, 'A descrição do livro é obrigatória'],
            trim: true
        },
        editora: {
            type: String,
            trim: true
        },
        formato: {
            type: String,
            enum: {
                values: ['Físico', 'Ebook', 'Audiolivro'],
                message: 'Formato inválido'
            },
            required: [true, 'O formato do livro é obrigatório'],
            trim: true
        },
        paginas: {
            type: Number,
            required: function() {
                return this.formato !== 'Audiolivro';
            },
            min: [1, 'O número de páginas deve ser pelo menos 1'],
            validate: {
                validator: Number.isInteger,
                message: 'O número de páginas deve ser inteiro'
            },
        },
        anoEdicao: {
            type: Number,
            min: [1, 'O ano de edição deve ser maior doque zero'],
            max: [new Date().getFullYear(), 'O ano de edição não pode ser no futuro'],
            validate: {
                validator: Number.isInteger,
                message: 'O ano de edição deve ser inteiro'
            }
        },
        dimensao: {
            type: String,
            trim: true
        },
        autor: {
            type: String,
            required: [true, 'O autor é obrigatório'],
            trim: true
        },
        isbn: {
            type: String,
            unique: true,
            required: [true, 'O ISBN é obrigatório'],
            set: (valor) =>
                typeof valor === 'string'
                ? valor.replace(/[\s-]/g, '').toUpperCase()
                : valor,
            match: [
                /^(?:\d{9}[\dX]|97[89]\d{10})$/,
                'O ISBN deve ter formato ISBN-10 ou ISBN-13',
            ],
        },
        estoque: {
            type: Number,
            required: [true, 'A quantidade em estoque é obrigatória!'],
            min: [0, 'O estoque não deve ser negativo'],
            validate: {
                validator: Number.isInteger,
                message: 'O valor deve ser um número inteiro'
            }   
        }
    },
    {
        timestamps: true, // Cria automaticamente createdAt e updatedAt
    }
);

const Livro = mongoose.model('Livro', livroSchema);

export default Livro;