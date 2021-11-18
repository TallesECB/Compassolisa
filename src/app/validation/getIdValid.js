const Joi = require('joi').extend(require('@joi/date'));
const serialize = require('../serialize/handlingErrorsValidation');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id: Joi.string()
        .required()
        .regex(/^[0-9A-Fa-f\d]/)
        .min(24)
        .max(24)
    });

    const { error } = await schema.validate(req.params, { abortEarly: false });

    if (error) throw error;
    return next(error);
  } catch (error) {
    const result = await serialize.serializeErrors(error);
    return res.status(400).json(result);
  }
};
