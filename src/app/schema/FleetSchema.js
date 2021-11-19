const mongoose = require('mongoose');
const mongoosePaginateV2 = require('mongoose-paginate-v2');

const FleetSchema = mongoose.Schema({
  id_carro: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true
  },
  id_locadora: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rental',
    required: true
  },
  status: {
    type: String,
    required: true
  },
  valor_diaria: {
    type: String,
    required: true
  },
  placa: {
    type: String,
    required: true
  }
});

FleetSchema.plugin(mongoosePaginateV2);

const modelFleet = mongoose.model('Fleet', FleetSchema);

module.exports = modelFleet;
