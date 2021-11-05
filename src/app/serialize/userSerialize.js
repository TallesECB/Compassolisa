const serialize = ({_id, nome, cpf, data_nascimento, email, habilitado}, tokenId) => {
    return ({_id, nome, cpf, data_nascimento, email, habilitado, token: tokenId})
}

const paginateSerialize = ({docs, limit, totalDocs, pagingCounter, totalPages}) => {
    return {
        usuarios: docs.map(serialize),
        limit,
        total: totalDocs,
        offset: pagingCounter,
        offsets: totalPages
    }
}

module.exports = {
    serialize, paginateSerialize
}