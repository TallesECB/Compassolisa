class limitMaxPagination extends Error {
    constructor(limit) {
        const mensagem = `${limit} -> limit está excedendo o maximo, favor somente até 1000!`
        super(mensagem)
        this.name = 'limitMaxPagination'
        this.idErro = 5
        this.statusCode = 400
    }   
}

module.exports = limitMaxPagination