const moment = require('moment');
const Conflict = require('../../errors/Conflicts');
const ReserveRepository = require('../../repository/ReserveRepository');

class ReserveValid {
  async ValidatingReserveCarCreate({ data_inicio, data_fim }, id_carro, rentalID) {
    const carCheck = await ReserveRepository.getAll({ id_carro, rentalID });
    if (carCheck.docs.length !== 0) {
      carCheck.docs.forEach((object) => {
        if (
          moment(data_inicio, 'DD/MM/YYYY').isBetween(
            moment(object.data_inicio, 'DD/MM/YYYY'),
            moment(object.data_fim, 'DD/MM/YYYY')
          )
        ) {
          throw new Conflict(
            `It is not possible to make the reservation Car - ${id_carro} because this Car is already reserved on this date ${object.data_inicio} until the day ${object.data_fim}`
          );
        }
        if (
          moment(data_fim, 'DD/MM/YYYY').isBetween(
            moment(object.data_inicio, 'DD/MM/YYYY'),
            moment(object.data_fim, 'DD/MM/YYYY')
          )
        ) {
          throw new Conflict(
            `It is not possible to make the reservation Car - ${id_carro} because this Car is already reserved on this date ${object.data_inicio} until the day ${object.data_fim}`
          );
        }
        if (!moment(data_inicio, 'DD/MM/YYYY').diff(moment(object.data_fim, 'DD/MM/YYYY'))) {
          throw new Conflict(
            `It is not possible to make the reservation Car - ${id_carro} because this Car is already reserved on this date ${object.data_fim}`
          );
        }
        if (!moment(data_fim, 'DD/MM/YYYY').diff(moment(object.data_inicio, 'DD/MM/YYYY'))) {
          throw new Conflict(
            `It is not possible to make the reservation Car - ${id_carro} because this Car is already reserved on this date ${object.data_inicio}`
          );
        }
        if (!moment(data_inicio, 'DD/MM/YYYY').diff(moment(object.data_inicio, 'DD/MM/YYYY'))) {
          throw new Conflict(
            `It is not possible to make the reservation Car - ${id_carro} because this Car is already reserved on this date ${object.data_inicio}`
          );
        }
        if (!moment(data_fim, 'DD/MM/YYYY').diff(moment(object.data_fim, 'DD/MM/YYYY'))) {
          throw new Conflict(
            `It is not possible to make the reservation Car - ${id_carro} because this Car is already reserved on this date ${object.data_fim}`
          );
        }
      });
    }
  }

  async ValidatingReserveUserCreate({ data_inicio, data_fim }, id_user, rentalID) {
    const userCheck = await ReserveRepository.getAll({ id_user, rentalID });
    if (userCheck.docs.length !== 0) {
      userCheck.docs.forEach((object) => {
        if (
          moment(data_inicio, 'DD/MM/YYYY').isBetween(
            moment(object.data_inicio, 'DD/MM/YYYY'),
            moment(object.data_fim, 'DD/MM/YYYY')
          )
        ) {
          throw new Conflict(
            `It is not possible to make the reservation Car because this User - ${id_user} already have a reservation on this date ${object.data_inicio} until the day ${object.data_fim}`
          );
        }
        if (
          moment(data_fim, 'DD/MM/YYYY').isBetween(
            moment(object.data_inicio, 'DD/MM/YYYY'),
            moment(object.data_fim, 'DD/MM/YYYY')
          )
        ) {
          throw new Conflict(
            `It is not possible to make the reservation Car because this User - ${id_user} already have a reservation on this date ${object.data_inicio} until the day ${object.data_fim}`
          );
        }
        if (!moment(data_inicio, 'DD/MM/YYYY').diff(moment(object.data_fim, 'DD/MM/YYYY'))) {
          throw new Conflict(
            `It is not possible to make the reservation Car because this User - ${id_user} already have a reservation on this date ${object.data_fim}`
          );
        }
        if (!moment(data_fim, 'DD/MM/YYYY').diff(moment(object.data_inicio, 'DD/MM/YYYY'))) {
          throw new Conflict(
            `It is not possible to make the reservation Car because this User - ${id_user} already have a reservation on this date ${object.data_inicio}`
          );
        }
        if (!moment(data_inicio, 'DD/MM/YYYY').diff(moment(object.data_inicio, 'DD/MM/YYYY'))) {
          throw new Conflict(
            `It is not possible to make the reservation Car because this User - ${id_user} already have a reservation on this date ${object.data_inicio}`
          );
        }
        if (!moment(data_fim, 'DD/MM/YYYY').diff(moment(object.data_fim, 'DD/MM/YYYY'))) {
          throw new Conflict(
            `It is not possible to make the reservation Car because this User - ${id_user} already have a reservation on this date ${object.data_fim}`
          );
        }
      });
    }
  }

  async ValidatingReserveCarUpdate({ data_inicio, data_fim }, id_carro, rentalID, id) {
    const carCheck = await ReserveRepository.getAll({ id_carro, rentalID });
    if (carCheck.docs.length !== 0) {
      carCheck.docs.forEach((object) => {
        if (
          moment(data_inicio, 'DD/MM/YYYY').isBetween(
            moment(object.data_inicio, 'DD/MM/YYYY'),
            moment(object.data_fim, 'DD/MM/YYYY')
          ) &&
          id !== object.id
        ) {
          throw new Conflict(
            `Unable to update Car - ${id_carro} reservation date because this Car is already reserved on this date ${object.data_inicio} until the day ${object.data_fim}`
          );
        }
        if (
          moment(data_fim, 'DD/MM/YYYY').isBetween(
            moment(object.data_inicio, 'DD/MM/YYYY'),
            moment(object.data_fim, 'DD/MM/YYYY')
          ) &&
          id !== object.id
        ) {
          throw new Conflict(
            `Unable to update Car - ${id_carro} reservation date because this Car is already reserved on this date ${object.data_inicio} until the day ${object.data_fim}`
          );
        }
        if (!moment(data_inicio, 'DD/MM/YYYY').diff(moment(object.data_fim, 'DD/MM/YYYY')) && id !== object.id) {
          throw new Conflict(
            `Unable to update Car - ${id_carro} reservation date because this Car is already reserved on this date ${object.data_fim}`
          );
        }
        if (!moment(data_fim, 'DD/MM/YYYY').diff(moment(object.data_inicio, 'DD/MM/YYYY')) && id !== object.id) {
          throw new Conflict(
            `Unable to update Car - ${id_carro} reservation date because this Car is already reserved on this date ${object.data_inicio}`
          );
        }
        if (!moment(data_inicio, 'DD/MM/YYYY').diff(moment(object.data_inicio, 'DD/MM/YYYY')) && id !== object.id) {
          throw new Conflict(
            `Unable to update Car - ${id_carro} reservation date because this Car is already reserved on this date ${object.data_inicio}`
          );
        }
        if (!moment(data_fim, 'DD/MM/YYYY').diff(moment(object.data_fim, 'DD/MM/YYYY')) && id !== object.id) {
          throw new Conflict(
            `Unable to update Car - ${id_carro} reservation date because this Car is already reserved on this date ${object.data_fim}`
          );
        }
      });
    }
  }

  async ValidatingReserveUserUpdate({ data_inicio, data_fim }, id_user, rentalID, id) {
    const userCheck = await ReserveRepository.getAll({ id_user, rentalID });
    if (userCheck.docs.length !== 0) {
      userCheck.docs.forEach((object) => {
        if (
          moment(data_inicio, 'DD/MM/YYYY').isBetween(
            moment(object.data_inicio, 'DD/MM/YYYY'),
            moment(object.data_fim, 'DD/MM/YYYY')
          ) &&
          id !== object.id
        ) {
          throw new Conflict(
            `Unable to update Car reservation date because this User - ${id_user} already have a reservation on this date ${object.data_inicio} until the day ${object.data_fim}`
          );
        }
        if (
          moment(data_fim, 'DD/MM/YYYY').isBetween(
            moment(object.data_inicio, 'DD/MM/YYYY'),
            moment(object.data_fim, 'DD/MM/YYYY')
          ) &&
          id !== object.id
        ) {
          throw new Conflict(
            `Unable to update Car reservation date because this User - ${id_user} already have a reservation on this date ${object.data_inicio} until the day ${object.data_fim}`
          );
        }
        if (!moment(data_inicio, 'DD/MM/YYYY').diff(moment(object.data_fim, 'DD/MM/YYYY')) && id !== object.id) {
          throw new Conflict(
            `Unable to update Car reservation date because this User - ${id_user} already have a reservation on this date ${object.data_fim}`
          );
        }
        if (!moment(data_fim, 'DD/MM/YYYY').diff(moment(object.data_inicio, 'DD/MM/YYYY')) && id !== object.id) {
          throw new Conflict(
            `Unable to update Car reservation date because this User - ${id_user} already have a reservation on this date ${object.data_inicio}`
          );
        }
        if (!moment(data_inicio, 'DD/MM/YYYY').diff(moment(object.data_inicio, 'DD/MM/YYYY')) && id !== object.id) {
          throw new Conflict(
            `Unable to update Car reservation date Car because this User -${id_user} already have a reservation on this date ${object.data_inicio}`
          );
        }
        if (!moment(data_fim, 'DD/MM/YYYY').diff(moment(object.data_fim, 'DD/MM/YYYY')) && id !== object.id) {
          throw new Conflict(
            `Unable to update Car reservation date because this User - ${id_user} already have a reservation on this date ${object.data_fim}`
          );
        }
      });
    }
  }
}

module.exports = new ReserveValid();
