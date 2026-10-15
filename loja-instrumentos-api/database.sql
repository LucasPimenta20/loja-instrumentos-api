CREATE DATABASE IF NOT EXISTS loja_instrumentos
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE loja_instrumentos;

CREATE TABLE IF NOT EXISTS instrumento (
  id INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(120) NOT NULL,
  tipo VARCHAR(80) NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  PRIMARY KEY (id),
  CHECK (preco >= 0)
);

-- Dados opcionais para testes no Postman:
INSERT INTO instrumento (nome, tipo, preco) VALUES
('Violão acústico', 'Cordas', 599.90),
('Teclado musical', 'Teclas', 1299.00),
('Bateria acústica', 'Percussão', 3499.50);