class underAge extends Error {
    constructor(user) {
        const mensagem = `${user} -> usuário menor de idade, necessário ter mais de 18!`;
        super(mensagem);
        this.name = 'underAge';
        this.idErro = 2;
        this.statusCode = 400;
    }   
}

module.exports = underAge;