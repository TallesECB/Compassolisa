const CarRepository = require('../repository/CarRepository');

const idNotFound = require('../errors/idNotFound');
const withoutAccessory = require('../errors/withoutAccessory');


class CarService {
  async create(payload) {
    if(payload.acessorios.length === 0 || payload.acessorios.descricao === "") {
      throw new withoutAccessory(payload.modelo);
    } 
    const result = await CarRepository.create(payload);
    return result;
  }
  async getAll({offset, limit, ...payloadFind}) { 
    if(payloadFind.descricao) {
      payloadFind['acessorios.descricao'] = payloadFind.descricao
      delete payloadFind.descricao
    }
    const result = await CarRepository.getAll(payloadFind, offset, limit);
    return result;
  }
  async getById(id) {   
    const result = await CarRepository.getById(id);
    if(!result) {
      throw new idNotFound(`Car - ${id}`);
    } 
    return result;
  }
  async update(id, payload) {
    if(!await CarRepository.getById(id)) {
      throw new idNotFound(`Car - ${id}`);
    }
    const result = await CarRepository.update(id, payload);
    return result;
  }
  async updateAcessory(idCar, idAcessory, payload) {
    if(!await CarRepository.getById(idCar)) {
      throw new idNotFound(`Car - ${idCar}`);
    }
    
    const Cars = await CarRepository.getById(idCar)

    Cars.acessorios.forEach(object => {
      if(object._id == idAcessory && object.descricao == payload.descricao) {
        //const result = await CarRepository.removeAcessory(idAcessory);
        //return result;

        console.log('this is for delete')
      }
      if(object._id == idAcessory && object.descricao != payload.descricao ) {
        //const result = await CarRepository.updateAcessory(idAcessory, payload);
        //return result;
        console.log('this is for update')
      }
    })

    const result = await CarRepository.updateAcessory(idAcessory, payload);
    return result;

    //throw new idNotFound(`Acessory - ${idAcessory}`);
  
  }
  async remove(id) { 
    if(!await CarRepository.getById(id)) {
      throw new idNotFound(`Car - ${id}`);
    } 

    const result = await CarRepository.remove(id);
    return result;
  }
}

module.exports = new CarService();
