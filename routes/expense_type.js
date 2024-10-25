const express = require('express');
const ExpenseType = require('../models/ExpenseType');
const router = express.Router();

router.get('/expense_types', async (req, res) => {
  try {
    let expenseTypes = await ExpenseType.find();
    if (!expenseTypes) return res.status(404).json({ msg: 'No existen tipos de gasto' });

    const resultado = expenseTypes.map(doc => ({
      codigo: doc.codigo,
      descripcion: doc.descripcion
    }));

    res.status(200).json({ msg: 'Operacion procesada correctamente.', tipos: resultado });

  } catch (err) {

    res.status(500).json({ msg: 'Error al buscar las categorias.' });
    console.log(err);
  }
});

module.exports = router;