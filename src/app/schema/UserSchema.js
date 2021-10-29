const mongoose = require('mongoose');

const mongoosePaginateV2 = require('mongoose-paginate-v2')

const UserSchema = mongoose.Schema({
  nome: String,
  cpf: { 
    type: String,
    unique: true
  },
  data_nascimento: {
    type: String,
  },
  email: {
    type: String,
    unique: true
  },
  senha: {
    type: String,
    select: false
  },
  habilitado: {
    type: String,
    enum: ['sim', 'nao']
  },
  __v: {
    type: Number,
    select: false
  }
})

UserSchema.plugin(mongoosePaginateV2);

const modelUser = mongoose.model('User', UserSchema);

module.exports = modelUser;