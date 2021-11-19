const mongoose = require('mongoose');
const mongoosePaginateV2 = require('mongoose-paginate-v2');

const ReserveSchema = mongoose.Schema({
    id_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 
    data_inicio: {
        type: String,
        required: true
    },
    data_fim: {
        type: String,
        required: true
    },
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
    valor_final: {
        type: String,
        required: true
    }
});

ReserveSchema.plugin(mongoosePaginateV2);

const modelReserve = mongoose.model('Reserve', ReserveSchema);

module.exports = modelReserve;
