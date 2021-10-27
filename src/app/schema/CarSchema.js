const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
  modelo: String,
  cor: String,
  ano: Number,
  acessorios: [{
    descricao: String, _id: false
  }],
  quantidadedePassageiros: Number
})

const modelCar = mongoose.model('Car', CarSchema);

module.exports = modelCar;