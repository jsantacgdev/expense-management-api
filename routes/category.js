const express = require('express');
const Categoria = require('../models/Category');
const router = express.Router();

router.get('/categories', async (req, res) => {
  try {
    let category = await Categoria.find();
    if (!category) return res.status(404).json({ msg: 'No existen categorias' });

    const resultado = category.map(doc => ({
      codigo: doc.codigo,
      nombre_categoria: doc.nombre_categoria
    }));

    res.status(200).json({ msg: 'Operacion procesada correctamente.', categories: resultado });

  } catch (err) {

    res.status(500).json({ msg: 'Error al buscar las categorias.' });
    console.log(err);
  }
});

module.exports = router;