const moment = require('moment');

const ReserveRepository = require('../repository/ReserveRepository');
const RentalRepository = require('../repository/RentalRepository');
const FleetRepository = require('../repository/FleetRepository');

const DecodingToken = require('../helpers/reserves/DecodingToken');
const DateValid = require('../helpers/reserves/DateValid');
const ReserveValid = require('../helpers/reserves/ReserveValid');

const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');

class ReserveService {
  async create(payload, { rentalID }, { authorization }) {
    if (!(await RentalRepository.getById(rentalID))) {
      throw new NotFound(`Rental ${rentalID}`);
    }

    await DateValid.validatingDate(payload.data_inicio, payload.data_fim);

    const { id_carro } = payload;
    await ReserveValid.ValidatingReserveCarCreate(payload, id_carro, rentalID);

    if (!(await FleetRepository.getById(payload.id_carro, rentalID))) {
      throw new NotFound(`Frota ${payload.id_carro}`);
    }

    const { status } = await FleetRepository.getById(payload.id_carro, rentalID);
    if (status !== 'disponivel') {
      throw new BadRequest(`Fleet ${payload.id_carro} Not Available`);
    }

    const token = authorization.split(' ')[1];
    const { _id, email, habilitado } = await DecodingToken.tokenDecoded(token);

    if (habilitado.toLowerCase() !== 'sim') {
      throw new BadRequest(`User ${email} must have license`);
    }

    payload.id_user = _id;
    payload.id_locadora = rentalID;

    const { id_user } = payload;
    await ReserveValid.ValidatingReserveUserCreate(payload, id_user, rentalID);

    const daysReserve = moment(payload.data_fim, 'DD/MM/YYYY').diff(
      moment(payload.data_inicio, 'DD/MM/YYYY'),
      'days',
      false
    );
    const { valor_diaria } = await FleetRepository.getById(payload.id_carro, rentalID);

    payload.valor_final = daysReserve * valor_diaria;

    const result = await ReserveRepository.create(payload);
    return result;
  }

  async getAll({ offset, limit, ...payloadFind }, { rentalID }) {
    if (!(await RentalRepository.getById(rentalID))) {
      throw new NotFound(`Rental ${rentalID}`);
    }

    payloadFind.id_locadora = rentalID;
    const result = await ReserveRepository.getAll(payloadFind, offset, limit);
    if (result.docs.length === 0) {
      throw new NotFound(`Query ${Object.keys(payloadFind)} = ${Object.values(payloadFind)}`);
    }
    return result;
  }

  async getById(id, rentalID) {
    const result = await ReserveRepository.getById(id);
    if (!result) {
      throw new NotFound(`Reserve - ${id}`);
    }
    if (!(await RentalRepository.getById(rentalID))) {
      throw new NotFound(`Rental ${rentalID}`);
    }
    return result;
  }

  async update(id, rentalID, payload, { authorization }) {
    if (!(await ReserveRepository.getById(id))) {
      throw new NotFound(`Reserve - ${id}`);
    }

    await DateValid.validatingDate(payload.data_inicio, payload.data_fim);

    const reserveCheckDifference = await ReserveRepository.getById(id, rentalID);
    const differenceReserve = moment(reserveCheckDifference.data_inicio, 'DD/MM/YYYY').diff(moment(), 'days', false);
    if (differenceReserve <= 2) {
      throw new BadRequest(
        `Reserve ${id} cannot be updated because it is scheduled for ${differenceReserve} days from now.`
      );
    }

    if (!(await FleetRepository.getById(payload.id_carro, rentalID))) {
      throw new NotFound(`Frota ${payload.id_carro}`);
    }

    const { status } = await FleetRepository.getById(payload.id_carro, rentalID);
    if (status !== 'disponivel') {
      throw new BadRequest(`Fleet ${payload.id_carro} Not Available`);
    }

    const { id_carro } = payload;
    await ReserveValid.ValidatingReserveCarUpdate(payload, id_carro, rentalID, id);

    const token = authorization.split(' ')[1];
    const { _id } = await DecodingToken.tokenDecoded(token);

    payload.id_user = _id;
    payload.id_locadora = rentalID;

    const id_user = _id;
    await ReserveValid.ValidatingReserveUserUpdate(payload, id_user, rentalID, id);

    const daysReserve = moment(payload.data_fim, 'DD/MM/YYYY').diff(
      moment(payload.data_inicio, 'DD/MM/YYYY'),
      'days',
      false
    );
    const { valor_diaria } = await FleetRepository.getById(payload.id_carro, rentalID);
    payload.valor_final = daysReserve * valor_diaria;

    const result = await ReserveRepository.update(id, rentalID, payload);
    return result;
  }

  async remove(id, rentalID) {
    if (!(await RentalRepository.getById(rentalID))) {
      throw new NotFound(`Rental ${rentalID}`);
    }
    if (!(await ReserveRepository.getById(id))) {
      throw new NotFound(`Reserve - ${id}`);
    }

    const result = await ReserveRepository.remove(id, rentalID);
    return result;
  }
}

module.exports = new ReserveService();
