const RentalRepository = require('../repository/RentalRepository');
const cnpjUnique = require('../errors/cnpjUnique')
const mainOfficeUnique = require('../errors/mainOfficeUnique')
const idNotFound = require('../errors/idNotFound');

const axios = require('axios').default;

class RentalService {
  async create(payload) {
    let isFilial = 0

    await Promise.all(payload.endereco.map(async (object, i) => {
      const payloadAxios = await axios.get(`https://viacep.com.br/ws/${object.cep}/json/`)

      payload.endereco[i].logradouro = payloadAxios.data.logradouro;
      payload.endereco[i].bairro = payloadAxios.data.bairro;
      payload.endereco[i].localidade = payloadAxios.data.localidade;
      payload.endereco[i].uf = payloadAxios.data.uf;

      if(payload.endereco[i].isFilial === false) {
        isFilial += 1
      }

      return (payload)
    }))

    const validationCNPJ = {
      cnpj: payload.cnpj
    }
    const validCNPJ = await RentalRepository.getAll(validationCNPJ);
    if(validCNPJ.docs.length > 0) {
      throw new cnpjUnique(validationCNPJ.cnpj);
    } 
    if(isFilial > 1) {
      throw new mainOfficeUnique(payload.cnpj)
    }

    const result = await RentalRepository.create(payload);
    return result;
  }

  async getAll({offset, limit, ...payloadFind}) {
    if(payloadFind.cep) {
      payloadFind['endereco.cep'] = payloadFind.cep
      delete payloadFind.cep
    }
    if(payloadFind.logradouro) {
      payloadFind['endereco.logradouro'] = payloadFind.logradouro
      delete payloadFind.logradouro
    }
    if(payloadFind.complemento) {
      payloadFind['endereco.complemento'] = payloadFind.complemento
      delete payloadFind.complemento
    }
    if(payloadFind.bairro) {
      payloadFind['endereco.bairro'] = payloadFind.bairro
      delete payloadFind.bairro
    }
    if(payloadFind.number) {
      payloadFind['endereco.number'] = payloadFind.number
      delete payloadFind.number
    }
    if(payloadFind.localidade) {
      payloadFind['endereco.localidade'] = payloadFind.localidade
      delete payloadFind.localidade
    }
    if(payloadFind.uf) {
      payloadFind['endereco.uf'] = payloadFind.uf
      delete payloadFind.uf
    }
    const result = await RentalRepository.getAll(payloadFind, offset, limit);
    return result;
  }
  async getById(id) {
    const result = await RentalRepository.getById(id);
    if(!result) {
      throw new idNotFound(`Rental - ${id}`);
    } 
    return result
  }
  async update(id, payload) {
    if(!await RentalRepository.getById(id)) {
      throw new idNotFound(`Rental - ${id}`);
    }
    let isFilial = 0

    await Promise.all(payload.endereco.map(async (object, i) => {
      const payloadAxios = await axios.get(`https://viacep.com.br/ws/${object.cep}/json/`)

      payload.endereco[i].logradouro = payloadAxios.data.logradouro;
      payload.endereco[i].bairro = payloadAxios.data.bairro;
      payload.endereco[i].localidade = payloadAxios.data.localidade;
      payload.endereco[i].uf = payloadAxios.data.uf;

      if(payload.endereco[i].isFilial === false) {
        isFilial += 1
      }

      return (payload)
    }))

    const validationCNPJ = {
      cnpj: payload.cnpj
    }
    const validCNPJ = await RentalRepository.getAll(validationCNPJ)
    if(validCNPJ.docs.length > 0 ) {
      for(let i = 0; i < validCNPJ.docs.length; i++) {
        if(validCNPJ.docs[i].id != id) {
          throw new cnpjUnique(validationCNPJ.cnpj)
        } 
      }
    }    

    if(isFilial > 1) {
      throw new mainOfficeUnique(payload.cnpj)
    }

    const result = await RentalRepository.update(id, payload);
    return result;
  }
  async remove(id) {
    if(!await RentalRepository.getById(id)) {
      throw new idNotFound(`Rental - ${id}`);
    } 
    const result = await RentalRepository.remove(id);
    return result;
  }
}

module.exports = new RentalService();
