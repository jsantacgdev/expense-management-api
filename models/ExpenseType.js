const mongoose = require('mongoose');

const ExpenseType = new mongoose.Schema({
  codigo: {
    type: String,
    required: true,
    unique: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
}, 
{
  collection: 'tipo_gasto',
});

ExpenseType.pre('save', async function (next) {
  this.descripcion = this.descripcion.toUpperCase();
  next();
});

module.exports = mongoose.model('Tipo_Gasto', ExpenseType);
