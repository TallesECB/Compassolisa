const HaveOneMatrix = require('../../errors/HaveOneMatrix');
const Conflicts = require('../../errors/Conflicts');

class MatrixValid {
  async filialCheck(adressRental, payload) {
    if (adressRental.isFilial > 1) {
      throw new Conflicts(`${payload.cnpj} - Matrix`);
    }
    if (adressRental.isFilial === 0) {
      throw new HaveOneMatrix(payload.cnpj);
    }
  }
}

module.exports = new MatrixValid();
