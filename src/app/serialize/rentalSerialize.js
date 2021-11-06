const serialize = ({id, nome, cnpj, atividades, endereco}) => {
    return {id, nome, cnpj, atividades, endereco}
}

const paginateSerialize = ({docs, limit, totalDocs, pagingCounter, totalPages}) => {
    return {
        rentals: docs.map(serialize),
        limit,
        total: totalDocs,
        offset: pagingCounter,
        offsets: totalPages
    }
}

module.exports = {
    serialize, paginateSerialize
}

