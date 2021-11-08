class HaveOneMatrix extends Error {
  constructor(cnpj) {
    super();
    this.statusCode = 409;

    this.description = 'Conflict';
    this.name = `CNPJ ${cnpj} -> It is necessary to have a one Matrix!`;
  }
}

module.exports = HaveOneMatrix;
