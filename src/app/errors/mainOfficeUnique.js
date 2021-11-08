class MainOfficeUnique extends Error {
  constructor(cnpj) {
    super();
    this.statusCode = 409;

    this.description = 'Conflict';
    this.name = `CNPJ - ${cnpj} -> This rental company can only have one matrix!`;
  }
}

module.exports = MainOfficeUnique;
