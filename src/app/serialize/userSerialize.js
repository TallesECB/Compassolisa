const serialize = ({ _id, nome, cpf, data_nascimento, email, habilitado }, tokenId) => ({
  _id,
  nome,
  cpf,
  data_nascimento,
  email,
  habilitado,
  token: tokenId
});

const paginateSerialize = ({ docs, limit, totalDocs, pagingCounter, totalPages }) => ({
  usuarios: docs.map(serialize),
  limit,
  total: totalDocs,
  offset: pagingCounter,
  offsets: totalPages
});

module.exports = {
  serialize,
  paginateSerialize
};
