import mongoose from 'mongoose';

async function conectaNoBanco() {

  await mongoose.connect(process.env.DB_CONNECTION_STRING);
  return mongoose.connection;

}

function verificaConexaoBanco(conexao) {
  conexao.on('error', (erro) => {
    console.error(`Erro ao conectar com o banco: \n${erro}`);
  });

  conexao.once('open', () => {
    console.log('Conectou ao Banco com sucesso!');
  });
}

export { conectaNoBanco, verificaConexaoBanco };
