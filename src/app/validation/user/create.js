const Joi = require('joi').extend(require('@joi/date'));
const { CpfRegex } = require('../utils/regex')
const { SenhaRegex } = require('../utils/regex')
const serialize = require('../../serialize/handlingErrorsValidation');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      nome: Joi.string().trim().required(),
      cpf: Joi.string()
        .regex(CpfRegex)
        .messages({
          'string.pattern.base': `{#label} with value {:[.]} fails to match the required pattern format: xxx.xxx.xxx-xx`
        })
        .min(14)
        .max(14)
        .required(),
      data_nascimento: Joi.date()
        .format('DD/MM/YYYY')
        .messages({
          'date.format': `{#label} with value {:[.]} fails to match the required format: DD/MM/YYYY`
        })
        .required(),
      email: Joi.string().trim().email().required(),
      senha: Joi.string()
        .regex(SenhaRegex)
        .required(),
      habilitado: Joi.string().valid('sim', 'não').required()
    });

    const { error } = await schema.validate(req.body, { abortEarly: false });

    if (error) throw error;

    return next(error);
  } catch (error) {
    const result = await serialize.serializeErrors(error)
    return res.status(400).json(result);
  }
};
