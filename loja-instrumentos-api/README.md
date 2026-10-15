# API REST — Loja de Instrumentos

Projeto acadêmico para a disciplina CMP2304 — Tecnologia de Construção de Software I.

## Requisitos
- Node.js (versão LTS recomendada)
- MySQL ou MariaDB
- Postman (para testar as rotas)

## 1. Criar o banco de dados
Execute o arquivo `database.sql` no MySQL/MariaDB. O script cria o banco `loja_instrumentos`, a tabela `instrumento` e três registros de exemplo.

Exemplo pelo terminal:
```bash
mysql -u root -p < database.sql
```

## 2. Configurar a conexão
Copie `.env.example` para `.env` e informe as credenciais locais do seu banco:
```bash
cp .env.example .env
```
No Windows, também é possível copiar o arquivo manualmente e renomeá-lo para `.env`.

## 3. Instalar e executar
Na pasta do projeto:
```bash
npm install
npm run dev
```
A API ficará disponível em `http://localhost:3000`. Para executar sem Nodemon, use `npm start`.

## Rotas CRUD

| Método | Rota | Função |
|---|---|---|
| GET | `/instrumento` | Lista todos os instrumentos |
| GET | `/instrumento/:id` | Busca um instrumento por ID |
| POST | `/instrumento` | Cadastra um instrumento |
| PUT | `/instrumento/:id` | Atualiza nome, tipo e preço |
| DELETE | `/instrumento/:id` | Exclui um instrumento |

## Exemplos para Postman

### POST `http://localhost:3000/instrumento`
Selecione **Body > raw > JSON**:
```json
{
  "nome": "Guitarra elétrica",
  "tipo": "Cordas",
  "preco": 1899.90
}
```

### PUT `http://localhost:3000/instrumento/1`
```json
{
  "nome": "Violão eletroacústico",
  "tipo": "Cordas",
  "preco": 799.90
}
```

Para GET, informe a URL da rota. Para DELETE, use, por exemplo, `http://localhost:3000/instrumento/1`.

## Códigos HTTP utilizados
- `200`: consulta, atualização ou exclusão concluída.
- `201`: cadastro realizado.
- `400`: dados inválidos.
- `404`: rota ou instrumento não encontrado.
- `500`: erro interno ou falha de execução no banco.

As consultas usam `?` e parâmetros separados, evitando concatenar valores enviados pelo usuário diretamente no SQL.

## Estrutura
```text
loja-instrumentos-api/
├── config/
│   └── db.js
├── controllers/
│   └── instrumentoController.js
├── routes/
│   └── instrumentoRoutes.js
├── .env.example
├── .gitignore
├── app.js
├── database.sql
├── package.json
├── README.md
└── server.js
```

## Publicar no GitHub
1. Crie um repositório público chamado `loja-instrumentos-api`.
2. Não envie o arquivo `.env` nem a pasta `node_modules`.
3. Na pasta do projeto, execute:
```bash
git init
git add .
git commit -m "Implementa API REST da loja de instrumentos"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/loja-instrumentos-api.git
git push -u origin main
```
Troque `SEU-USUARIO` pelo seu usuário do GitHub.

Antes de entregar, rode a API e teste todas as cinco rotas no Postman. Revise o código para conseguir explicar como funcionam as rotas, as consultas parametrizadas e o tratamento de erros.