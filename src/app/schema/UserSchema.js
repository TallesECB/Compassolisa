const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const uniqueValidator = require('mongoose-unique-validator');

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
  }
})

UserSchema.plugin(mongoosePaginate);
UserSchema.plugin(uniqueValidator);

const modelUser = mongoose.model('User', UserSchema);

module.exports = modelUser;