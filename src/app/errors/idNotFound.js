class idNotFound extends Error {
    constructor(id) {
        const mensagem = `${id} -> não foi encontrado!`
        super(mensagem)
        this.name = 'idNotFound'
        this.idErro = 0
        this.statusCode = 404
    }   
}

module.exports = idNotFound