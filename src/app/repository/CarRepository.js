const CarSchema = require('../schema/CarSchema');
const Repository = require('./GenericRepository');

class CarRepository extends Repository {
  constructor() {
    super(CarSchema);
  }

  async getAll(payloadFind, offset = 0, limit = 100) {
    if (payloadFind.descricao) {
      payloadFind['acessorios.descricao'] = payloadFind.descricao;
      delete payloadFind.descricao;
    }

    return CarSchema.paginate(payloadFind, { offset, limit });
  }

  async updateAcessory(idCar, idAcessory, payload) {
    const result = CarSchema.findOneAndUpdate(
      { _id: idCar, 'acessorios._id': idAcessory },
      { $set: { 'acessorios.$.descricao': payload.descricao } },
      { new: true, safe: true, upsert: true }
    );
    return result;
  }
}

module.exports = new CarRepository();
