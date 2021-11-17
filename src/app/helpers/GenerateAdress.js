const axios = require('axios').default;
const CepInvalid = require('../errors/CepInvalid');

class GenerateAdress {
  async getAdress(payload) {
    let isFilial = 0;
    await Promise.all(
      payload.endereco.map(async (object, i) => {
        const resultCep = await axios.get(`https://viacep.com.br/ws/${object.cep}/json/`);

        if (resultCep.data.erro === true) {
          throw new CepInvalid(object.cep);
        }

        payload.endereco[i].logradouro = resultCep.data.logradouro;
        payload.endereco[i].bairro = resultCep.data.bairro;
        payload.endereco[i].localidade = resultCep.data.localidade;
        payload.endereco[i].uf = resultCep.data.uf;

        if (payload.endereco[i].isFilial === false) {
          isFilial += 1;
        }
      })
    );

    return { payload, isFilial };
  }
}

module.exports = new GenerateAdress();
