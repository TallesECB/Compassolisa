class CnpjUnique extends Error {
  constructor(cnpj) {
    super();
    this.statusCode = 409;

    this.description = 'Conflict';
    this.name = `CNPJ - ${cnpj} -> Already in Use!`;
  }
}

module.exports = CnpjUnique;
