const RentalSchema = require('../schema/RentalSchema');

class RentalRepository {
  async create(payload) {
    return RentalSchema.create(payload);
  }

  async getAll(payloadFind, offset = 0, limit = 100) {
    const arrayAddress = ['cep', 'logradouro', 'complemento', 'bairro', 'number', 'localidade', 'uf', 'isFilial'];

    Object.keys(payloadFind).map((object) => {
      if (arrayAddress.includes(object)) {
        payloadFind[`endereco.${object}`] = payloadFind[object];
        delete payloadFind[object];
      }
      return payloadFind;
    });

    return RentalSchema.paginate(payloadFind, { offset, limit });
  }

  async getById(id) {
    return RentalSchema.findById(id);
  }

  async update(id, payload) {
    return RentalSchema.findByIdAndUpdate(id, payload, { new: true });
  }

  async remove(id) {
    return RentalSchema.findByIdAndRemove(id);
  }
}

module.exports = new RentalRepository();
