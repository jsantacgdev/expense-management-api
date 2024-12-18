const express = require('express');
const Expense = require('../models/Expense');
const router = express.Router();

router.post('/expenses', async (req, res) => {
  try {
    
    const usuarioId = req.body.user;
    
    let expenses = await Expense.find({ usuario: usuarioId });
    if (!expenses) return res.status(404).json({ msg: 'No existen gastos aun' });
    
    console.log(expenses);

    const resultado = expenses.map(doc => ({
      id: doc.id,
      nombre_gasto: doc.nombre_gasto,
      cantidad: doc.cantidad,
      fecha_gasto: doc.fecha_gasto,
      tipo_gasto: doc.tipo_gasto,
      categoria: doc.categoria,
      usuario: doc.usuario,
    }));

    res.status(200).json({ msg: 'Operacion procesada correctamente.', gastos: resultado });

  } catch (err) {

    res.status(500).json({ msg: 'Error al buscar los gastos del usuario.' });
    console.log(err);
  }
});

module.exports = router;