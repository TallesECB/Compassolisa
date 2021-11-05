const UserRepository = require('../repository/UserRepository');

const idNotFound = require('../errors/idNotFound');
const underAge = require('../errors/underAge');
const emailUnique = require('../errors/emailUnique');
const cpfUnique = require('../errors/cpfUnique');

const moment = require('moment');

class UserService {
  async create(payload) {
    const minAge = 18
    const years = moment().diff(moment(payload.data_nascimento, 'DD/MM/YYYY'), 'years', true)
    if(years < minAge) {
      throw new underAge(payload.nome);
    }
  
    const validationCpf = {
      cpf: payload.cpf
    }
    const validCpf = await UserRepository.getAll(validationCpf)
    if(validCpf.docs.length > 0) {
      throw new cpfUnique(validationCpf.cpf)
    } 

    const validationEmail = {
      email: payload.email
    }
    const validEmail = await UserRepository.getAll(validationEmail)
    if(validEmail.docs.length > 0) {
      throw new emailUnique(validationEmail.email)
    }     

    const result = await UserRepository.create(payload);
    return result;
  }
  async getAll({offset, limit, ...payloadFind}) {
    const result = await UserRepository.getAll(payloadFind, offset, limit);
    return result;
  }
  async getById(id) {
    const result = await UserRepository.getById(id);
    if(!result) {
      throw new idNotFound(`User - ${id}`);
    } 
    return result
  }
  async update(id, payload) {
    if(!await UserRepository.getById(id)) {
      throw new idNotFound(`User - ${id}`);
    }

    const minAge = 18
    const years = moment().diff(moment(payload.data_nascimento, 'DD-MM-YYYY'), 'years', true)

    if(!years >= minAge) {
      throw new underAge(payload.nome)
    } 

    const validationCpf = {
      cpf: payload.cpf
    }
    const validCpf = await UserRepository.getAll(validationCpf)
    if(validCpf.docs.length > 0 ) {
      for(let i = 0; i < validCpf.docs.length; i++) {
        if(validCpf.docs[i].id != id) {
          throw new cpfUnique(validationCpf.cpf)
        } 
      }
    }         

    const validationEmail = {
      email: payload.email
    }
    const validEmail = await UserRepository.getAll(validationEmail)
    if(validEmail.docs.length > 0 ) {
      for(let i = 0; i < validEmail.docs.length; i++) {
        if(validEmail.docs[i].id != id) {
          throw new emailUnique(validationEmail.email)
        } 
      }
    }     

    const result = await UserRepository.update(id, payload);
    return result;
  }
  async remove(id) {
    if(!await UserRepository.getById(id)) {
      throw new idNotFound(`User - ${id}`);
    } 

    const result = await UserRepository.remove(id);
    return result;
  }
}

module.exports = new UserService();
