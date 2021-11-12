const axios = require('axios').default;
const RentalRepository = require('../repository/RentalRepository');

const CnpjUnique = require('../errors/CnpjUnique');
const MainOfficeUnique = require('../errors/MainOfficeUnique');
const IdNotFound = require('../errors/IdNotFound');
const CepInvalid = require('../errors/CepInvalid');
const HaveOneMatrix = require('../errors/HaveOneMatrix');

class RentalService {
  async create(payload) {
    let isFilial = 0;

    await Promise.all(
      payload.endereco.map(async (object, i) => {
        const resultCep = await axios.get(`https://viacep.com.br/ws/${object.cep}/json/`);
        if (resultCep.data.erro === true) {
          throw new CepInvalid(object.cep);
        }
        payload.endereco[i].logradouro = resultCep.data.logradouro;
        payload.endereco[i].bairro = resultCep.data.bairro;
        payload.endereco[i].localidade = resultCep.data.localidade;
        payload.endereco[i].uf = resultCep.data.uf;
        if (payload.endereco[i].isFilial === false) {
          isFilial += 1;
        }
        return payload;
      })
    );

    const validationCNPJ = {
      cnpj: payload.cnpj
    };
    const validCNPJ = await RentalRepository.getAll(validationCNPJ);
    if (validCNPJ.docs.length > 0) {
      throw new CnpjUnique(validationCNPJ.cnpj);
    }
    if (isFilial > 1) {
      throw new MainOfficeUnique(payload.cnpj);
    }
    if (isFilial === 0) {
      throw new HaveOneMatrix(payload.cnpj);
    }

    const result = await RentalRepository.create(payload);
    return result;
  }

  async getAll({ offset, limit, ...payloadFind }) {
    const arrayAddress = ['cep', 'logradouro', 'complemento', 'bairro', 'number', 'localidade', 'uf', 'isFilial'];

    Object.keys(payloadFind).map((object) => {
      if (arrayAddress.includes(object)) {
        payloadFind[`endereco.${object}`] = payloadFind[object];
        delete payloadFind[object];
      }
      return payloadFind;
    });

    const result = await RentalRepository.getAll(payloadFind, offset, limit);
    return result;
  }

  async getById(id) {
    const result = await RentalRepository.getById(id);
    if (!result) {
      throw new IdNotFound(`Rental - ${id}`);
    }
    return result;
  }

  async update(id, payload) {
    if (!(await RentalRepository.getById(id))) {
      throw new IdNotFound(`Rental - ${id}`);
    }
    let isFilial = 0;

    await Promise.all(
      payload.endereco.map(async (object, i) => {
        const resultCep = await axios.get(`https://viacep.com.br/ws/${object.cep}/json/`);
        if (resultCep.data.erro === true) {
          throw new CepInvalid(object.cep);
        }
        payload.endereco[i].logradouro = resultCep.data.logradouro;
        payload.endereco[i].bairro = resultCep.data.bairro;
        payload.endereco[i].localidade = resultCep.data.localidade;
        payload.endereco[i].uf = resultCep.data.uf;

        if (payload.endereco[i].isFilial === false) {
          isFilial += 1;
        }

        return payload;
      })
    );

    const validationCNPJ = {
      cnpj: payload.cnpj
    };
    const validCNPJ = await RentalRepository.getAll(validationCNPJ);
    if (validCNPJ.docs.length > 0) {
      for (let i = 0; i < validCNPJ.docs.length; i++) {
        if (validCNPJ.docs[i].id !== id) {
          throw new CnpjUnique(validationCNPJ.cnpj);
        }
      }
    }

    if (isFilial > 1) {
      throw new MainOfficeUnique(payload.cnpj);
    }

    if (isFilial === 0) {
      throw new HaveOneMatrix(payload.cnpj);
    }

    const result = await RentalRepository.update(id, payload);
    return result;
  }

  async remove(id) {
    if (!(await RentalRepository.getById(id))) {
      throw new IdNotFound(`Rental - ${id}`);
    }
    const result = await RentalRepository.remove(id);
    return result;
  }
}

module.exports = new RentalService();
