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
  tipo_gasto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tipo_Gasto',
    required: true,
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
