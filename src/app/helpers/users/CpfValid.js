const UserRepository = require('../../repository/UserRepository');
const Conflicts = require('../../errors/Conflicts');

class CpfValid {
  async createCPF(payload) {
    const validCpf = await UserRepository.getAll({ cpf: payload.cpf });
    if (validCpf.docs.length > 0) {
      throw new Conflicts(`CPF ${payload.cpf}`);
    }
  }
  async updateCPF(payload, id) {
    const validCpf = await UserRepository.getAll({ cpf: payload.cpf });
    if (validCpf.docs.length > 0) {
      for (let i = 0; i < validCpf.docs.length; i++) {
        if (validCpf.docs[i].id !== id) {
          throw new Conflicts(`CPF ${payload.cpf}`);
        }
      }
    }
  }
}

module.exports = new CpfValid();
