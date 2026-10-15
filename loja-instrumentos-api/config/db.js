const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'loja_instrumentos',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Verifica a conexão ao iniciar a aplicação.
pool.getConnection()
  .then((connection) => {
    console.log('Conexão com MySQL/MariaDB estabelecida.');
    connection.release();
  })
  .catch((error) => {
    console.error('Não foi possível conectar ao banco de dados:', error.message);
  });

module.exports = pool;