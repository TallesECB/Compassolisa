const CarSchema = require('../schema/CarSchema');

class CarRepository {
  async create(payload) {
    return CarSchema.create(payload);
  }

  async getAll(payloadFind, offset = 1, limit = 100) {
    return CarSchema.paginate(payloadFind, { offset, limit });
  }

  async getById(id) {
    return CarSchema.findById(id);
  }

  async update(id, payload) {
    return CarSchema.findByIdAndUpdate(id, payload, { new: true });
  }

  async updateAcessory(idAcessory, payload) {
    const result = await CarSchema.findOneAndUpdate(
      { 'acessorios._id': idAcessory },
      { acessorios: payload },
      { returnOriginal: false }
    );
    return result;
  }

  async remove(id) {
    return CarSchema.findByIdAndRemove(id);
  }
}

module.exports = new CarRepository();
