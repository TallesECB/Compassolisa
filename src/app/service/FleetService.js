const FleetRepository = require('../repository/FleetRepository');
const RentalRepository = require('../repository/RentalRepository');
const CarRepository = require('../repository/CarRepository');

const PlacaValid = require('../helpers/fleets/PlacaValid');

const NotFound = require('../errors/NotFound');

class FleetService {
  async create(payload, { rentalID }) {
    if (!(await RentalRepository.getById(rentalID))) {
      throw new NotFound(`Rental ${rentalID}`);
    }
    payload.id_locadora = rentalID;

    const { id_carro } = payload;
    if (!(await CarRepository.getById(id_carro))) {
      throw new NotFound(`Car ${id_carro}`);
    }

    await PlacaValid.createPlaca(payload);

    const result = await FleetRepository.create(payload);
    return result;
  }

  async getAll({ offset, limit, ...payloadFind }, { rentalID }) {
    if (!(await RentalRepository.getById(rentalID))) {
      throw new NotFound(`Rental ${rentalID}`);
    }

    payloadFind.id_locadora = rentalID;
    const result = await FleetRepository.getAll(payloadFind, offset, limit);
    if (result.docs.length === 0) {
      throw new NotFound(`Query ${Object.keys(payloadFind)} = ${Object.values(payloadFind)}`);
    }
    return result;
  }

  async getById(id, rentalID) {
    if (!(await RentalRepository.getById(rentalID))) {
      throw new NotFound(`Rental ${rentalID}`);
    }

    const result = await FleetRepository.getById(id, rentalID);
    if (!result) {
      throw new NotFound(`Fleet - ${id}`);
    }
    return result;
  }

  async update(id, rentalID, payload) {
    if (!(await RentalRepository.getById(rentalID))) {
      throw new NotFound(`Rental ${rentalID}`);
    }
    payload.id_locadora = rentalID;

    const { id_carro } = payload;
    if (!(await CarRepository.getById(id_carro))) {
      throw new NotFound(`Car ${id_carro}`);
    }

    if (!(await FleetRepository.getById(id, rentalID))) {
      throw new NotFound(`Fleet - ${id}`);
    }

    await PlacaValid.updatePlaca(payload, id);

    const result = await FleetRepository.update(id, rentalID, payload);
    return result;
  }

  async remove(id, rentalID) {
    if (!(await RentalRepository.getById(rentalID))) {
      throw new NotFound(`Rental ${rentalID}`);
    }
    if (!(await FleetRepository.getById(id, rentalID))) {
      throw new NotFound(`Fleet - ${id}`);
    }

    const result = await FleetRepository.remove(id, rentalID);
    return result;
  }
}

module.exports = new FleetService();
