const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    unique: true,
  },
  nombre_categoria: {
    type: String,
    required: true,
  },
});

CategoriaSchema.pre('save', async function (next) {
  this.categoryName = this.categoryName.toUpperCase();
  next();
});

module.exports = mongoose.model('Categoria', CategoriaSchema);
