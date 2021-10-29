class invalidObjectId extends Error {
    constructor(id) {
        const mensagem = `${id} -> inválido, favor verificar!`;
        super(mensagem);
        this.name = 'invalidObjectId';
        this.idErro = 1;
        this.statusCode = 400;
    }
}

module.exports = invalidObjectId;