const RentalRepository = require('../repository/RentalRepository');

const NotFound = require('../errors/NotFound');

const GenerateAdress = require('../helpers/GenerateAdress');
const CNPJValid = require('../helpers/rentals/CnpjValid');
const MatrixValid = require('../helpers/rentals/MatrixValid');

class RentalService {
  async create(payload) {
    const adressRental = await GenerateAdress.getAdress(payload);

    await CNPJValid.createCNPJ(payload);
    await MatrixValid.filialCheck(adressRental, payload);

    const result = await RentalRepository.create(adressRental.payload);
    return result;
  }

  async getAll({ offset, limit, ...payloadFind }) {
    const result = await RentalRepository.getAll(payloadFind, offset, limit);
    if (result.docs.length === 0) {
      throw new NotFound(`Query ${Object.keys(payloadFind)} = ${Object.values(payloadFind)}`);
    }
    return result;
  }

  async getById(id) {
    const result = await RentalRepository.getById(id);
    if (!result) {
      throw new NotFound(`Rental - ${id}`);
    }
    return result;
  }

  async update(id, payload) {
    if (!(await RentalRepository.getById(id))) {
      throw new NotFound(`Rental - ${id}`);
    }

    const adressRental = await GenerateAdress.getAdress(payload);

    await CNPJValid.updateCNPJ(payload, id);
    await MatrixValid.filialCheck(adressRental, payload);

    const result = await RentalRepository.update(id, adressRental.payload);
    return result;
  }

  async remove(id) {
    if (!(await RentalRepository.getById(id))) {
      throw new NotFound(`Rental - ${id}`);
    }
    const result = await RentalRepository.remove(id);
    return result;
  }
}

module.exports = new RentalService();
