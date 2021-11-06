const mongoose = require('mongoose');
const mongoosePaginateV2 = require('mongoose-paginate-v2')

const RentalSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  cnpj: { 
    type: String,
    required: true
  },
  atividades: {
    type: String,
    required: true
  },
  endereco: [{
    cep: {
      type: String,
      required: true,
    },
    logradouro: {
        type: String,
        required: false
    },
    complemento: {
        type: String,
        required: false
    },
    isFilial: {
      type: Boolean,
      required: true
    },
    bairro: {
        type: String,
        required: false
    },
    number: {
        type: String,
        required: true
    },
    localidade: {
        type: String,
        required: false
    },
    uf: {
        type: String,
        required: false
    }
  }],

})

RentalSchema.plugin(mongoosePaginateV2);

const modelRental = mongoose.model('Rental', RentalSchema);

module.exports = modelRental;