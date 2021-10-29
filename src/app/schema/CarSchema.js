const mongoose = require('mongoose');
const mongoosePaginateV2 = require('mongoose-paginate-v2')

const CarSchema = mongoose.Schema({
  modelo: String,
  cor: String,
  ano: Number,
  acessorios: [{
    descricao: String, _id: false
  }],
  quantidadedePassageiros: Number
})

CarSchema.plugin(mongoosePaginateV2);

const modelCar = mongoose.model('Car', CarSchema);

module.exports = modelCar;