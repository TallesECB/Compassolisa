const moment = require('moment');
const BadRequest = require('../../errors/BadRequest');

class DateValid {
  async validatingDate(data_inicio, data_fim) {
    const dateBefore = moment(data_inicio, 'DD/MM/YYYY').isBefore(moment(data_fim, 'DD/MM/YYYY'), 'days');
    if (!dateBefore) {
      throw new BadRequest(`${data_inicio} The start date is expected to be earlier than the end date.`);
    }
    const dateBeforeCurrentDate = moment().isSameOrBefore(moment(data_inicio, 'DD/MM/YYYY'), 'days');
    if (!dateBeforeCurrentDate) {
      throw new BadRequest(`${data_inicio} The start date is expected to be after the current date.`);
    }
  }
}

module.exports = new DateValid();
