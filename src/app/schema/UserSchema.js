const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  nome: String,
  cpf: String,
  data_nascimento: String,
  email: String,
  senha: String,
  habilitado: {
      type: String,
      enum: ['sim', 'nao']
  }
})

const modelUser = mongoose.model('User', UserSchema);

module.exports = modelUser;