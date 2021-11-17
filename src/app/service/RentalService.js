const RentalRepository = require('../repository/RentalRepository');

const IdNotFound = require('../errors/IdNotFound');
const HaveOneMatrix = require('../errors/HaveOneMatrix');

const Conflicts = require('../errors/Conflicts');

const GenerateAdress = require('../helpers/GenerateAdress');

class RentalService {
  async create(payload) {
    const adressRental = await GenerateAdress.getAdress(payload);

    const validCNPJ = await RentalRepository.getAll({ cnpj: payload.cnpj });
    if (validCNPJ.docs.length > 0) {
      throw new Conflicts(payload.cnpj);
    }
    if (adressRental.isFilial > 1) {
      throw new Conflicts(payload.cnpj);
    }
    if (adressRental.isFilial === 0) {
      throw new HaveOneMatrix(payload.cnpj);
    }

    const result = await RentalRepository.create(adressRental.payload);
    return result;
  }

  async getAll({ offset, limit, ...payloadFind }) {
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

    const adressRental = await GenerateAdress.getAdress(payload);

    const validCNPJ = await RentalRepository.getAll({ cnpj: payload.cnpj });
    if (validCNPJ.docs.length > 0) {
      for (let i = 0; i < validCNPJ.docs.length; i++) {
        if (validCNPJ.docs[i].id !== id) {
          throw new Conflicts(payload.cnpj);
        }
      }
    }

    if (adressRental.isFilial > 1) {
      throw new Conflicts(payload.cnpj);
    }
    if (adressRental.isFilial === 0) {
      throw new HaveOneMatrix(payload.cnpj);
    }

    const result = await RentalRepository.update(id, adressRental.payload);
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
