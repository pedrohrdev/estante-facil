# Plano guiado — API da Estante Fácil

**Prazo:** 4, 5 e 6 de novembro de 2026  
**Disponibilidade:** 4 horas por dia, 12 horas no total  
**Tecnologias atuais:** JavaScript, Node.js, Express, MongoDB e Mongoose

## Objetivo do MVP

Entregar uma API que permita consultar e administrar o catálogo, autenticar clientes e equipe e registrar pedidos simples com baixa de estoque. O pedido representa a compra; pagamento online, entrega, cupons e integrações externas ficam fora do escopo desta primeira versão. A proposta é terminar uma versão demonstrável e aprender cada camada, não reproduzir toda a operação de uma grande rede varejista.

## Dia 1 — quarta-feira, 4/11 (4h): catálogo de livros

- [ ] **Tarefa 1 — Conferir a base e a configuração (30 min)**
  - Revisar inicialização do Express, conexão MongoDB e variáveis de ambiente.
  - Confirmar que `.env` não entra no Git e documentar as variáveis necessárias em `.env.example`, sem segredos.
- [ ] **Tarefa 2 — Definir os dados do livro (45 min)**
  - Completar o schema com campos do catálogo: título, autor, editora, ISBN, descrição, categoria, preço e estoque.
  - Definir campos obrigatórios, tipos e limites básicos.
- [ ] **Tarefa 3 — Implementar consulta do catálogo (60 min)**
  - Criar `GET /livros` e `GET /livros/:id`.
  - Permitir busca por título/autor e filtro por categoria; tratar ID inválido e livro inexistente.
- [ ] **Tarefa 4 — Completar operações administrativas de livros (75 min)**
  - Criar atualização e remoção, além do cadastro já existente.
  - Separar rota, controller e model; propagar erros para o middleware.
- [ ] **Tarefa 5 — Conferir o contrato da API (30 min)**
  - Fazer chamadas manuais para cadastro, listagem, busca, atualização, remoção e erros comuns.
  - Anotar exemplos de request/response para a documentação do último dia.

**Entrega do dia:** catálogo consultável e CRUD de livros funcionando localmente.

## Dia 2 — quinta-feira, 5/11 (4h): contas e permissões

- [ ] **Tarefa 6 — Modelar usuários e perfis (45 min)**
  - Criar usuário com nome, e-mail único, senha armazenada com hash e perfil (`cliente`, `funcionario` ou `dono`).
  - Definir como contas da equipe serão criadas: apenas por uma conta com permissão de dono ou por configuração controlada no desenvolvimento.
- [ ] **Tarefa 7 — Registrar cliente e autenticar (75 min)**
  - Criar cadastro público de cliente e login.
  - Retornar token de acesso; nunca devolver hash/senha nas respostas.
- [ ] **Tarefa 8 — Proteger rotas e autorizar por perfil (75 min)**
  - Criar middleware para validar token e outro para verificar perfis.
  - Permitir leitura do catálogo sem login; restringir alterações de livros e estoque à equipe autorizada.
- [ ] **Tarefa 9 — Validar os limites de acesso (45 min)**
  - Conferir chamadas sem token, com token inválido e com perfil sem permissão.
  - Ajustar respostas 401/403 e confirmar que dados sensíveis não aparecem.

**Entrega do dia:** clientes conseguem se cadastrar e entrar; rotas administrativas exigem identidade e perfil autorizado.

## Dia 3 — sexta-feira, 6/11 (4h): pedidos e fechamento

- [ ] **Tarefa 10 — Modelar pedido simples (45 min)**
  - Criar pedido com cliente, itens (livro, quantidade e preço registrado no pedido), total e status.
  - Não aceitar preço enviado pelo cliente como valor confiável.
- [ ] **Tarefa 11 — Criar pedido e controlar estoque (90 min)**
  - Implementar `POST /pedidos` para cliente autenticado.
  - Conferir disponibilidade, calcular total no servidor e reduzir estoque apenas quando todos os itens forem válidos.
  - Evitar estoque negativo; se transação não estiver disponível na configuração local do MongoDB, manter o escopo simples e documentar essa limitação.
- [ ] **Tarefa 12 — Consultar pedidos e limitar acesso (45 min)**
  - Permitir ao cliente consultar os próprios pedidos.
  - Permitir que a equipe consulte/atualize o status conforme o escopo concluído.
- [ ] **Tarefa 13 — Documentar e fazer a revisão final (60 min)**
  - Documentar como configurar e iniciar o projeto, variáveis de ambiente, endpoints, perfis e exemplos de uso.
  - Percorrer o fluxo: cadastrar/consultar livro → registrar cliente → login → criar pedido → consultar pedido e estoque.
  - Corrigir bloqueios prioritários e registrar limitações conhecidas.

**Entrega do dia:** fluxo demonstrável de consulta de livros e criação/consulta de pedidos, com controle básico de acesso e estoque.

## Ordem de prioridade se o tempo apertar

1. Catálogo e erros compreensíveis.
2. Login e bloqueio das rotas administrativas.
3. Pedido com cálculo de preço no servidor e validação do estoque.
4. Documentação de execução e exemplos.

Se alguma tarefa ultrapassar o tempo previsto, reduzir primeiro o escopo de filtros, atualização de status e detalhes do catálogo. Não armazenar dados de cartão nem simular integração de pagamento nesta entrega.

## Como vamos trabalhar guiados

Em cada tarefa: entender o objetivo, identificar os arquivos envolvidos, implementar uma parte pequena, revisar o que aconteceu e registrar o próximo passo. Manter JavaScript nesta entrega; deixar a migração para TypeScript para depois do MVP estar estável.
