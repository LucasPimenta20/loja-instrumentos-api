const express = require('express');
const router = express.Router();
const instrumentoController = require('../controllers/instrumentoController');

router.get('/', instrumentoController.listar);
router.get('/:id', instrumentoController.buscarPorId);
router.post('/', instrumentoController.criar);
router.put('/:id', instrumentoController.atualizar);
router.delete('/:id', instrumentoController.excluir);

module.exports = router;