# ClientFlow

ClientFlow é uma aplicação full stack de cadastro e gerenciamento de clientes, desenvolvida como projeto de portfólio com foco em organização de dados, operações CRUD completas e integração real entre frontend, backend e banco de dados.

## Visão do projeto

O sistema foi criado para centralizar o cadastro de clientes em uma interface moderna, com visual premium e organização pensada para simular uma plataforma profissional.

Com o ClientFlow é possível:

- cadastrar clientes
- listar clientes
- editar clientes
- excluir clientes
- acompanhar status de clientes ativos e inativos
- persistir dados em banco PostgreSQL

## Tecnologias utilizadas

### Frontend
- React
- Vite
- CSS

### Backend
- Node.js
- Express

### Banco de dados e ORM
- PostgreSQL
- Prisma

## Funcionalidades

- formulário de cadastro de clientes
- listagem em cards
- edição de registros
- exclusão de registros
- status ativo/inativo
- contadores de clientes
- integração completa com API
- persistência real no banco de dados

## Estrutura do projeto

```bash
clientflow/
  frontend/
  backend/


  Layout e proposta visual

O projeto segue uma direção visual com:

tema escuro
azul frio como cor principal
detalhes premium
hero section destacada
interface inspirada em plataformas modernas

Como rodar o projeto localmente
1. Clonar o repositório
git clone URL_DO_SEU_REPOSITORIO
2. Entrar na pasta do projeto
cd clientflow
Rodando o backend
1. Entrar na pasta backend
cd backend
2. Instalar as dependências
npm install
3. Configurar o arquivo .env
Crie um arquivo .env dentro da pasta backend com este formato:
PORT=3001
DATABASE_URL="SUA_URL_POSTGRESQL"
FRONTEND_URL="http://localhost:5173"
4. Rodar as migrations
npx prisma migrate dev
5. Gerar o Prisma Client
npx prisma generate
6. Iniciar o backend
npm run dev

O backend ficará disponível em:

http://localhost:3001
Rodando o frontend
1. Entrar na pasta frontend
cd frontend
2. Instalar as dependências
npm install
3. Configurar o arquivo .env

Crie um arquivo .env dentro da pasta frontend com este conteúdo:

VITE_API_URL=http://localhost:3001
4. Iniciar o frontend
npm run dev

O frontend ficará disponível em:

http://localhost:5173
Rotas da API
GET /clients

Retorna todos os clientes cadastrados.

POST /clients

Cria um novo cliente.

PUT /clients/:id

Atualiza um cliente existente.

DELETE /clients/:id

Remove um cliente.

Modelo de cliente
{
  "id": 1,
  "name": "Thiago",
  "email": "thiago@email.com",
  "phone": "51 99999-9999",
  "company": "Empresa X",
  "city": "Canoas",
  "status": "ativo"
}
Status do projeto
frontend concluído
backend concluído
integração frontend/backend concluída
banco de dados integrado
CRUD completo funcionando localmente
deploy público pendente
Aprendizados aplicados neste projeto
componentização no React
gerenciamento de estado com useState
efeitos com useEffect
consumo de API com fetch
criação de API REST com Express
integração com PostgreSQL
uso de Prisma ORM
migrations de banco
organização full stack em pastas separadas
Autor

Thiago Kerber
Desenvolvedor Front-end / Full Stack Júnior em construção de portfólio e transição para o mercado.

Observação

Este projeto está pronto e funcional em ambiente local, com backend, frontend e banco integrados. O deploy público pode ser realizado futuramente em plataformas como Vercel, Render e Neon.