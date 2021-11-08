const Joi = require('joi').extend(require('@joi/date'));

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
    const handlingErrors = error.details;
    const result = [];
    handlingErrors.forEach((object) => {
      result.push({
        description: object.path[0],
        name: object.message
      });
    });
    return res.status(400).json(result);
  }
};
