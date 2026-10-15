const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const instrumentoRoutes = require('./routes/instrumentoRoutes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({
    mensagem: 'API REST - Loja de Instrumentos',
    rotas: {
      listar: 'GET /instrumento',
      buscarPorId: 'GET /instrumento/:id',
      criar: 'POST /instrumento',
      atualizar: 'PUT /instrumento/:id',
      excluir: 'DELETE /instrumento/:id'
    }
  });
});

app.use('/instrumento', instrumentoRoutes);

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada.' });
});

app.use((err, req, res, next) => {
  console.error('Erro inesperado:', err);
  res.status(500).json({ erro: 'Erro interno do servidor.' });
});

module.exports = app;