const enderecoResult = (endereco) => ({
  cep: endereco.cep,
  logradouro: endereco.logradouro,
  complemento: endereco.complemento,
  bairro: endereco.bairro,
  number: endereco.number,
  localidade: endereco.localidade,
  uf: endereco.uf
});

const serialize = ({ id, nome, cnpj, atividades, endereco }) => ({
  id,
  nome,
  cnpj,
  atividades,
  endereco: endereco.map(enderecoResult)
});

const paginateSerialize = ({ docs, limit, totalDocs, pagingCounter, totalPages }) => ({
  rentals: docs.map(serialize),
  limit,
  total: totalDocs,
  offset: pagingCounter,
  offsets: totalPages
});

module.exports = {
  serialize,
  paginateSerialize
};
