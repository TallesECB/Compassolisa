class invalidObjectId extends Error {
    constructor(id) {
        const mensagem = `${id} inválido!`
        super(mensagem)
        this.name = 'invalidObjectId'
        this.idErro = 1
        this.statusCode = 400
    }
}

module.exports = invalidObjectId