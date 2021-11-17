class HaveOneMatrix extends Error {
  constructor(cnpj) {
    super();
    this.statusCode = 400;

    this.description = 'Bad Request';
    this.name = `CNPJ ${cnpj} -> It is necessary to have a one Matrix!`;
  }
}

module.exports = HaveOneMatrix;
