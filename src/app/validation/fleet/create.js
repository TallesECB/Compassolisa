const Joi = require('joi').extend(require('@joi/date'));
const serialize = require('../../serialize/handlingErrorsValidation');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id_carro: Joi.string()
        .required()
        .regex(/^[0-9A-Fa-f\d]/)
        .min(24)
        .max(24),
      id_locadora: Joi.string()
        .required()
        .regex(/^[0-9A-Fa-f\d]/)
        .min(24)
        .max(24),
      status: Joi.string().trim().required(),
      valor_diaria: Joi.string().trim().required(),
      placa: Joi.string().trim().required()
    });

    const { error } = await schema.validate(req.body, { abortEarly: false });

    if (error) throw error;

    return next();
  } catch (error) {
    const result = await serialize.serializeErrors(error);
    return res.status(400).json(result);
  }
};
