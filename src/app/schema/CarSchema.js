const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const CarSchema = mongoose.Schema({
  modelo: String,
  cor: String,
  ano: Number,
  acessorios: [{
    descricao: String, _id: false
  }],
  quantidadedePassageiros: Number
})

CarSchema.plugin(mongoosePaginate);

const modelCar = mongoose.model('Car', CarSchema);

module.exports = modelCar;