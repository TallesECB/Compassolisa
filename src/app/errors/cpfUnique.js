class CpfUnique extends Error {
  constructor(cpf) {
    super();
    this.statusCode = 409;

    this.description = 'Conflict';
    this.name = `CPF - ${cpf} -> Already in Use!`;
  }
}

module.exports = CpfUnique;
