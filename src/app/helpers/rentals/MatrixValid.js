const BadRequest = require('../../errors/BadRequest');
const Conflicts = require('../../errors/Conflicts');

class MatrixValid {
  async filialCheck(adressRental, payload) {
    if (adressRental.isFilial > 1) {
      throw new Conflicts(`${payload.cnpj} - Matrix`);
    }
    if (adressRental.isFilial === 0) {
      throw new BadRequest(`CNPJ ${payload.cnpj} -> It is necessary to have a one Matrix!`);
    }
  }
}

module.exports = new MatrixValid();
