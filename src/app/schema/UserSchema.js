const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  nome: String,
  cpf: { //verificar se esse unique aqui dentro está correto
    type: String,
    unique: true
  },
  data_nascimento: Date,
  email: String,
  senha: String,
  habilitado: {
      type: String,
      enum: ['sim', 'nao'],
      message: '{VALUE} is not supported'
  }
})


const modelUser = mongoose.model('User', UserSchema);


module.exports = modelUser;