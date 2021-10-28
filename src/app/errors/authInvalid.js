class authInvalid extends Error {
    constructor() {
        const mensagem = `Email ou senha inválida, favor verificar!`
        super(mensagem)
        this.name = 'authInvalid'
        this.idErro = 4
        this.statusCode = 400
    }   
}

module.exports = authInvalid