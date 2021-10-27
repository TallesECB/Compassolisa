class notAcessory extends Error {
    constructor(car) {
        const mensagem = `${car} necessário ter pelo menos uma descricao/acessorio`
        super(mensagem)
        this.name = 'notAcessory'
        this.idErro = 3
        this.statusCode = 400
    }   
}

module.exports = notAcessory