const Conflicts = require('../../errors/Conflicts');
const RentalRepository = require('../../repository/RentalRepository');

class CnpjValid {
  async createCNPJ(payload) {
    const validCNPJ = await RentalRepository.getAll({ cnpj: payload.cnpj });
    if (validCNPJ.docs.length > 0) {
      throw new Conflicts(`CNPJ ${payload.cnpj}`);
    }
  }

  async updateCNPJ(payload, id) {
    const validCNPJ = await RentalRepository.getAll({ cnpj: payload.cnpj });
    if (validCNPJ.docs.length > 0) {
      for (let i = 0; i < validCNPJ.docs.length; i++) {
        if (validCNPJ.docs[i].id !== id) {
          throw new Conflicts(`CNPJ ${payload.cnpj}`);
        }
      }
    }
  }
}

module.exports = new CnpjValid();
