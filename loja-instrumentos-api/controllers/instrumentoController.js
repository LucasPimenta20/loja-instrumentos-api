const db = require('../config/db');

function validarId(id) {
  return Number.isInteger(Number(id)) && Number(id) > 0;
}

function validarDados(nome, tipo, preco) {
  if (typeof nome !== 'string' || nome.trim() === '') {
    return 'O campo nome é obrigatório e deve ser um texto.';
  }
  if (typeof tipo !== 'string' || tipo.trim() === '') {
    return 'O campo tipo é obrigatório e deve ser um texto.';
  }
  if (preco === undefined || preco === null || preco === '' ||
      !Number.isFinite(Number(preco)) || Number(preco) < 0) {
    return 'O campo preco é obrigatório e deve ser um número maior ou igual a zero.';
  }
  return null;
}

exports.listar = async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT id, nome, tipo, preco FROM instrumento ORDER BY id'
    );
    return res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao listar instrumentos:', error.message);
    return res.status(500).json({ erro: 'Não foi possível listar os instrumentos.' });
  }
};

exports.buscarPorId = async (req, res) => {
  const { id } = req.params;
  if (!validarId(id)) {
    return res.status(400).json({ erro: 'O id deve ser um número inteiro positivo.' });
  }

  try {
    const [rows] = await db.execute(
      'SELECT id, nome, tipo, preco FROM instrumento WHERE id = ?',
      [Number(id)]
    );
    if (rows.length === 0) {
      return res.status(404).json({ erro: 'Instrumento não encontrado.' });
    }
    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Erro ao buscar instrumento:', error.message);
    return res.status(500).json({ erro: 'Não foi possível buscar o instrumento.' });
  }
};

exports.criar = async (req, res) => {
  const { nome, tipo, preco } = req.body;
  const erroValidacao = validarDados(nome, tipo, preco);
  if (erroValidacao) {
    return res.status(400).json({ erro: erroValidacao });
  }

  try {
    const [result] = await db.execute(
      'INSERT INTO instrumento (nome, tipo, preco) VALUES (?, ?, ?)',
      [nome.trim(), tipo.trim(), Number(preco)]
    );
    const [rows] = await db.execute(
      'SELECT id, nome, tipo, preco FROM instrumento WHERE id = ?',
      [result.insertId]
    );
    return res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Erro ao criar instrumento:', error.message);
    return res.status(500).json({ erro: 'Não foi possível cadastrar o instrumento.' });
  }
};

exports.atualizar = async (req, res) => {
  const { id } = req.params;
  const { nome, tipo, preco } = req.body;

  if (!validarId(id)) {
    return res.status(400).json({ erro: 'O id deve ser um número inteiro positivo.' });
  }
  const erroValidacao = validarDados(nome, tipo, preco);
  if (erroValidacao) {
    return res.status(400).json({ erro: erroValidacao });
  }

  try {
    const [result] = await db.execute(
      'UPDATE instrumento SET nome = ?, tipo = ?, preco = ? WHERE id = ?',
      [nome.trim(), tipo.trim(), Number(preco), Number(id)]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Instrumento não encontrado.' });
    }

    const [rows] = await db.execute(
      'SELECT id, nome, tipo, preco FROM instrumento WHERE id = ?',
      [Number(id)]
    );
    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar instrumento:', error.message);
    return res.status(500).json({ erro: 'Não foi possível atualizar o instrumento.' });
  }
};

exports.excluir = async (req, res) => {
  const { id } = req.params;
  if (!validarId(id)) {
    return res.status(400).json({ erro: 'O id deve ser um número inteiro positivo.' });
  }

  try {
    const [result] = await db.execute(
      'DELETE FROM instrumento WHERE id = ?',
      [Number(id)]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Instrumento não encontrado.' });
    }
    return res.status(200).json({ mensagem: 'Instrumento excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir instrumento:', error.message);
    return res.status(500).json({ erro: 'Não foi possível excluir o instrumento.' });
  }
};