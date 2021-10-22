const CarRepository = require('../repository/CarRepository');

class CarService {
  async create(payload) {
    try {
      const result = await CarRepository.create(payload);
      return result;
    } catch (error) {
      return error;
    }
  }
  async find() {
    try {
      const result = await CarRepository.find();
      return result;
    } catch (error) {
      return error;
    }
  }
  async findById(id) {
    try {
      const result = await CarRepository.findById(id);
      return result;
    } catch (error) {
      return error
    }
  }
}

module.exports = new CarService();
