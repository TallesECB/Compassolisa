const serialize = ({ _id, nome, cpf, data_nascimento, email, habilitado }, token) => ({
  _id,
  nome,
  cpf,
  data_nascimento,
  email,
  habilitado,
  token
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
