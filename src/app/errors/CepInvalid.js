class CepInvalid extends Error {
  constructor(cep) {
    super();
    this.statusCode = 400;

    this.description = 'Bad Request';
    this.name = `CEP ${cep} -> Invalid!`;
  }
}

module.exports = CepInvalid;
