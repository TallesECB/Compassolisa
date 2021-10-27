class userMenorIdade extends Error {
    constructor(user) {
        const mensagem = `${user} usuario menor de idade, necessário ter mais de 18!`
        super(mensagem)
        this.name = 'userMenorIdade'
        this.idErro = 2
        this.statusCode = 400
    }   
}

module.exports = userMenorIdade