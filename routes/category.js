const express = require('express');
const Category = require('../models/Category');
const Categoria = require('../models/Category');
const router = express.Router();

router.get('/categories', async (req, res) => {
  try {
    let category = await Category.find();
    console.log('Documentos encontrados:', category);
    let category = await Categoria.find();
    if (!category) return res.status(404).json({ msg: 'No existen categorias' });

    res.status(200).json({ msg: 'Operacion procesada correctamente.', categories: [...category] });
  } catch (err) {
    res.status(500).json({ msg: 'Error al buscar las categorias.' });
    console.log(err);
  }
});

module.exports = router;