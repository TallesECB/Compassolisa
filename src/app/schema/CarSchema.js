const mongoose = require('mongoose');
const mongoosePaginateV2 = require('mongoose-paginate-v2');

const CarSchema = mongoose.Schema({
  modelo: {
    type: String,
    required: true
  },
  cor: {
    type: String,
    required: true
  },
  ano: {
    type: Number,
    required: true
  },
  acessorios: [
    {
      descricao: {
        type: String,
        required: true
      }
    }
  ],
  quantidadePassageiros: {
    type: Number,
    required: true
  }
});

CarSchema.plugin(mongoosePaginateV2);

const modelCar = mongoose.model('Car', CarSchema);

module.exports = modelCar;
