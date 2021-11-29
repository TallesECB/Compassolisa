const Conflicts = require('../../errors/Conflicts');
const FleetRepository = require('../../repository/FleetRepository');

class PlacaValid {
  async createPlaca(payload) {
    const validPlaca = await FleetRepository.getAll({ placa: payload.placa });
    if (validPlaca.docs.length > 0) {
      throw new Conflicts(`Placa ${payload.placa}`);
    }
  }

  async updatePlaca(payload, id) {
    const validPlaca = await FleetRepository.getAll({ placa: payload.placa });
    if (validPlaca.docs.length > 0) {
      for (let i = 0; i < validPlaca.docs.length; i++) {
        if (validPlaca.docs[i].id !== id) {
          throw new Conflicts(`Placa ${payload.placa}`);
        }
      }
    }
  }
}

module.exports = new PlacaValid();
