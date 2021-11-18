const Joi = require('joi').extend(require('@joi/date'));
const { CpfRegex } = require('../utils/regex')
const serialize = require('../../serialize/handlingErrorsValidation');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      offset: Joi.string().min(0),
      limit: Joi.string().min(0).max(1000),
      nome: Joi.string().trim(),
      cpf: Joi.string()
        .regex(CpfRegex)
        .min(14)
        .max(14)
        .messages({
          'CPF Format': `cpf must have the xxx.xxx.xxx-xx format`
        }),
      data_nascimento: Joi.date().format('DD/MM/YYYY').messages({
        'date.format': `{#label} with value {:[.]} fails to match the required format: DD/MM/YYYY`
      }),
      email: Joi.string().email(),
      habilitado: Joi.string().valid('sim', 'não')
    });

    const { error } = await schema.validate(req.query, { abortEarly: false });

    if (error) throw error;

    return next(error);
  } catch (error) {
    const result = await serialize.serializeErrors(error)
    return res.status(400).json(result);
  }
};
