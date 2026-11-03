import "dotenv/config";
import app from "./src/app.js";
import { conectaNoBanco, verificaConexaoBanco } from './src/config/dbConnect.js';

const PORT = 3000;

async function inicia() {

  try {

    const conexao = await conectaNoBanco();
    verificaConexaoBanco(conexao);    

    app.listen(PORT, () => {
      console.log(`\nServidor rodando na porta ${PORT}\n`);
    });

  } catch(erro) {
      console.error(' Falha ao iniciar a API. Verifique a conexão com o banco de dados.', erro);

      process.exit(1);
  }


};

inicia()