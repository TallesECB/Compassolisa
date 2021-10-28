const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  nome: String,
  cpf: { //verificar se esse unique aqui dentro está correto
    type: String,
    unique: true
  },
  data_nascimento: Date,
  email: {
    type: String,
    unique: true,
    message: 'Email já consta em nosso banco de dados, favor vericar.'
  },
  senha: {
    type: String,
    select: false
  },
  habilitado: {
    type: String,
    enum: ['sim', 'nao'],
    message: '{VALUE} is not supported'
  }
})


const modelUser = mongoose.model('User', UserSchema);


module.exports = modelUser;