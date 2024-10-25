const mongoose = require('mongoose');

const GastoSchema = new mongoose.Schema({
  nombre_gasto: {
    type: String,
    required: true,
  },
  cantidad: {
    type: String,
    required: true,
  },
  fecha_gasto: {
    type: Date,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  usuario: {
    type: String,
    required: true,
  }
},
{
  collection: 'gastos'
});

GastoSchema.pre('save', async function (next) {
  this.categoryName = this.categoryName.toUpperCase();
  next();
});

module.exports = mongoose.model('Gasto', GastoSchema);
