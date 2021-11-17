const moment = require('moment');
const UserRepository = require('../repository/UserRepository');

const IdNotFound = require('../errors/IdNotFound');
const UnderAge = require('../errors/UnderAge');

const Conflicts = require('../errors/Conflicts');

class UserService {
  async create(payload) {
    const minAge = 18;
    const years = moment().diff(moment(payload.data_nascimento, 'DD/MM/YYYY'), 'years', true);
    if (years < minAge) {
      throw new UnderAge(payload.nome);
    }

    const validCpf = await UserRepository.getAll({ cpf: payload.cpf });
    if (validCpf.docs.length > 0) {
      throw new Conflicts(payload.cpf);
    }

    const validEmail = await UserRepository.getAll({ email: payload.email });
    if (validEmail.docs.length > 0) {
      throw new Conflicts(payload.email);
    }

    const result = await UserRepository.create(payload);
    return result;
  }

  async getAll({ offset, limit, ...payloadFind }) {
    const result = await UserRepository.getAll(payloadFind, offset, limit);
    return result;
  }

  async getById(id) {
    const result = await UserRepository.getById(id);
    if (!result) {
      throw new IdNotFound(`User - ${id}`);
    }
    return result;
  }

  async update(id, payload) {
    if (!(await UserRepository.getById(id))) {
      throw new IdNotFound(`User - ${id}`);
    }

    const minAge = 18;
    const years = moment().diff(moment(payload.data_nascimento, 'DD-MM-YYYY'), 'years', true);

    if (years < minAge) {
      throw new UnderAge(payload.nome);
    }

    const validCpf = await UserRepository.getAll({ cpf: payload.cpf });
    if (validCpf.docs.length > 0) {
      for (let i = 0; i < validCpf.docs.length; i++) {
        if (validCpf.docs[i].id !== id) {
          throw new Conflicts(payload.cpf);
        }
      }
    }

    const validEmail = await UserRepository.getAll({ email: payload.email });
    if (validEmail.docs.length > 0) {
      for (let i = 0; i < validEmail.docs.length; i++) {
        if (validEmail.docs[i].id !== id) {
          throw new Conflicts(payload.email);
        }
      }
    }

    const result = await UserRepository.update(id, payload);
    return result;
  }

  async remove(id) {
    if (!(await UserRepository.getById(id))) {
      throw new IdNotFound(`User - ${id}`);
    }

    const result = await UserRepository.remove(id);
    return result;
  }
}

module.exports = new UserService();
