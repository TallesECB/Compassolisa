const axios = require('axios').default;
const BadRequest = require('../errors/BadRequest');

class GenerateAdress {
  async getAdress(payload) {
    let isFilial = 0;
    await Promise.all(
      payload.endereco.map(async (object, i) => {
        const resultCep = await axios.get(`https://viacep.com.br/ws/${object.cep}/json/`);

        if (resultCep.data.erro === true) {
          throw new BadRequest(`CEP ${object.cep} -> Invalid!`);
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
