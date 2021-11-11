const CarSchema = require('../schema/CarSchema');

class CarRepository {
  async create(payload) {
    return CarSchema.create(payload);
  }

  async getAll(payloadFind, offset = 0, limit = 100) {
    return CarSchema.paginate(payloadFind, { offset, limit });
  }

  async getById(id) {
    return CarSchema.findById(id);
  }

  async update(id, payload) {
    return CarSchema.findByIdAndUpdate(id, payload, { new: true });
  }

  async updateAcessory(idCar, idAcessory, payload) {
    const result = await CarSchema.findOneAndUpdate(
      { 'acessorios._id': idAcessory, _id: idCar },
      { $set: {'acessorios.$.descricao' : payload.descricao} },
      { new: true, safe: true, upsert: true }
    );

    return result;
  }

  async remove(id) {
    return CarSchema.findByIdAndRemove(id);
  }
}

module.exports = new CarRepository();
