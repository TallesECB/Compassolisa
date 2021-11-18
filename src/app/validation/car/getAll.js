const Joi = require('joi');
const serialize = require('../../serialize/handlingErrorsValidation');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      offset: Joi.string().min(0),
      limit: Joi.string().min(0).max(1000),
      modelo: Joi.string().trim(),
      cor: Joi.string().trim(),
      ano: Joi.number().min(1950).max(2022),
      descricao: Joi.string().trim().lowercase(),
      quantidadePassageiros: Joi.number()
    });

    const { error } = await schema.validate(req.query, { abortEarly: false });

    if (error) throw error;

    return next();
  } catch (error) {
    const result = await serialize.serializeErrors(error);
    return res.status(400).json(result);
  }
};
