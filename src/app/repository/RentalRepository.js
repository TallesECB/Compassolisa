const RentalSchema = require('../schema/RentalSchema');
const Repository = require('./GenericRepository');

class RentalRepository extends Repository {
  constructor() {
    super(RentalSchema);
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
}

module.exports = new RentalRepository();
