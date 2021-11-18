const NotFound = require('../../errors/NotFound');

class AcessoryValid {
    async findAcessory(cars, idAcessory) {
        let accessoryExists = false
        cars.acessorios.forEach((object) => {
            if (object._id.toString() === idAcessory.toString()) {
                accessoryExists = true;
            }
        });
        
        if (!accessoryExists) {
            throw new NotFound(`Acessory - ${idAcessory}`);
        } 
    }
}

module.exports = new AcessoryValid();
