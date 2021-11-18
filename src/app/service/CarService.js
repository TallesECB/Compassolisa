const CarRepository = require('../repository/CarRepository');

const NotFound = require('../errors/NotFound');
const WithoutAccessory = require('../errors/WithoutAccessory');
const AcessoryValid = require('../helpers/cars/AcessoryValid');

class CarService {
  async create(payload) {
    if (payload.acessorios.length === 0 || payload.acessorios.descricao === '') {
      throw new WithoutAccessory(payload.modelo);
    }
    const result = await CarRepository.create(payload);
    return result;
  }

  async getAll({ offset, limit, ...payloadFind }) {
    const result = await CarRepository.getAll(payloadFind, offset, limit);
    if(result.docs.length === 0) {
      throw new NotFound(`Query ${Object.keys(payloadFind)} = ${Object.values(payloadFind)}`)
    }
    return result;
  }

  async getById(id) {
    const result = await CarRepository.getById(id);
    if (!result) {
      throw new NotFound(`Car - ${id}`);
    }
    return result;
  }

  async update(id, payload) {
    if (!(await CarRepository.getById(id))) {
      throw new NotFound(`Car - ${id}`);
    }
    const result = await CarRepository.update(id, payload);
    return result;
  }

  async updateAcessory(idCar, idAcessory, payload) {
    const cars = await CarRepository.getById(idCar);
    if (!cars) {
      throw new NotFound(`Car - ${idCar}`);
    }
    
    await AcessoryValid.findAcessory(cars, idAcessory)

    const result = await CarRepository.updateAcessory(idCar, idAcessory, payload);
    return result;
  }

  async remove(id) {
    if (!(await CarRepository.getById(id))) {
      throw new NotFound(`Car - ${id}`);
    }

    const result = await CarRepository.remove(id);
    return result;
  }
}

module.exports = new CarService();
