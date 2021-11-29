const Conflicts = require('../../errors/Conflicts');
const RentalRepository = require('../../repository/RentalRepository');
// const GetPattern = require('../GetPattern')

class CnpjValid {
  async createCNPJ(payload) {
    // await GetPattern.VerifyCNPJ(payload.cnpj)
    const validCNPJ = await RentalRepository.getAll({ cnpj: payload.cnpj });
    if (validCNPJ.docs.length > 0) {
      throw new Conflicts(`CNPJ ${payload.cnpj}`);
    }
  }

  async updateCNPJ(payload, id) {
    // await GetPattern.VerifyCNPJ(payload.cnpj)
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
