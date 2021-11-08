const mongoose = require('mongoose');
const mongoosePaginateV2 = require('mongoose-paginate-v2');

const UserSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true
  },
  data_nascimento: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true,
    select: false
  },
  habilitado: {
    type: String,
    required: true,
    enum: ['sim', 'nao']
  }
});

UserSchema.plugin(mongoosePaginateV2);

const modelUser = mongoose.model('User', UserSchema);

module.exports = modelUser;
