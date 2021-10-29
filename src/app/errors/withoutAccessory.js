class withoutAccessory extends Error {
    constructor(car) {
        const mensagem = `${car} -> é necessário ter pelo menos uma descricao/acessorio`;
        super(mensagem);
        this.name = 'withoutAccessory';
        this.idErro = 3;
        this.statusCode = 400;
    }   
}

module.exports = withoutAccessory;