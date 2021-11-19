const Joi = require('joi').extend(require('@joi/date'));
const serialize = require('../../serialize/handlingErrorsValidation');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
        id: Joi.string()
            .regex(/^[0-9A-Fa-f\d]/)
            .min(24)
            .max(24),
        id_carro: Joi.string()
            .regex(/^[0-9A-Fa-f\d]/)
            .min(24)
            .max(24),
        id_locadora: Joi.string()
            .regex(/^[0-9A-Fa-f\d]/)
            .min(24)
            .max(24),
        status: Joi.string().trim(),
        valor_diaria: Joi.string().trim(),
        placa: Joi.string().trim()
    });

    const { error } = await schema.validate(req.body, { abortEarly: false });

    if (error) throw error;

    return next();
  } catch (error) {
    const result = await serialize.serializeErrors(error);
    return res.status(400).json(result);
  }
};
