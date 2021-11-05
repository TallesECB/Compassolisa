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
    let findAcessory = false
    if(!await CarRepository.getById(idCar)) {
      throw new idNotFound(`Car - ${idCar}`);
    }
    
    const Cars = await CarRepository.getById(idCar)



    Cars.acessorios.forEach((object,i) => {
      if(object._id == idAcessory && object.descricao === payload.descricao) {
        Cars.acessorios[i].remove()
        findAcessory = true
      }
      if(object._id == idAcessory && object.descricao !== payload.descricao) {
        object.descricao = payload.descricao
        findAcessory = true
      }

    })

    if(!findAcessory) {
      throw new idNotFound(`Acessory - ${idAcessory}`);
    }
    const result = await CarRepository.updateAcessory(idAcessory, Cars.acessorios);
    return result
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
