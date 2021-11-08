const serialize = ({id, nome, cnpj, atividades, endereco}) => {
    //utilizando esse forEach para achar uma forma de remover o isFilial e o _id do endereço, do retorno.
    endereco.forEach((object, i) => {
        endereco[i].cep = object.cep
        endereco[i].logradouro =  object.logradouro
        endereco[i].complemento = object.complemento
        endereco[i].bairro = object.bairro
        endereco[i].number =  object.number,
        endereco[i].localidade = object.localidade
        endereco[i].uf = object.uf
    })
    console.log(endereco)
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

