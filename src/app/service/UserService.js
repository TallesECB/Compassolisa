const moment = require('moment');
const UserRepository = require('../repository/UserRepository');

const NotFound = require('../errors/NotFound');
const UnderAge = require('../errors/UnderAge');

const CPFValid = require('../helpers/users/CpfValid');
const EmailValid = require('../helpers/users/EmailValid');

class UserService {
  async create(payload) {
    const minAge = 18;
    const years = moment().diff(moment(payload.data_nascimento, 'DD/MM/YYYY'), 'years', true);
    if (years < minAge) {
      throw new UnderAge(payload.nome);
    }

    await CPFValid.createCPF(payload);
    await EmailValid.createEmail(payload);

    const result = await UserRepository.create(payload);
    return result;
  }

  async getAll({ offset, limit, ...payloadFind }) {
    const result = await UserRepository.getAll(payloadFind, offset, limit);
    if (result.docs.length === 0) {
      throw new NotFound(`Query ${Object.keys(payloadFind)} = ${Object.values(payloadFind)}`);
    }
    return result;
  }

  async getById(id) {
    const result = await UserRepository.getById(id);
    if (!result) {
      throw new NotFound(`User - ${id}`);
    }
    return result;
  }

  async update(id, payload) {
    if (!(await UserRepository.getById(id))) {
      throw new NotFound(`User - ${id}`);
    }

    const minAge = 18;
    const years = moment().diff(moment(payload.data_nascimento, 'DD-MM-YYYY'), 'years', true);

    if (years < minAge) {
      throw new UnderAge(payload.nome);
    }

    await CPFValid.updateCPF(payload, id);
    await EmailValid.updateEmail(payload, id);

    const result = await UserRepository.update(id, payload);
    return result;
  }

  async remove(id) {
    if (!(await UserRepository.getById(id))) {
      throw new NotFound(`User - ${id}`);
    }

    const result = await UserRepository.remove(id);
    return result;
  }
}

module.exports = new UserService();
