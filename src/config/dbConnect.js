import mongoose from 'mongoose';

async function conectaNoBanco() {

  await mongoose.connect(process.env.DB_CONNECTION_STRING);
  return mongoose.connection;

}

function verificaConexaoBanco(conexao) {
  conexao.on('error', (erro) => {
    console.error(`Erro ao conectar com o banco: \n${erro}`);
  });

  if (conexao.readyState === 1) {
    console.log('Conectou ao Banco com sucesso!');
    return;
  }

  conexao.once('open', () => {
    console.log('Conectou ao Banco com sucesso!');
  });
}

export { conectaNoBanco, verificaConexaoBanco };
