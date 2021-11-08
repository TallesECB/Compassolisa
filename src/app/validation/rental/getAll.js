const Joi = require('joi').extend(require('@joi/date'));

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      offset: Joi.number().min(0).default(1),
      limit: Joi.number().min(0).max(1000),
      nome: Joi.string().trim().min(4),
      cnpj: Joi.string().regex(/^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/),
      atividades: Joi.string().trim(),
      cep: Joi.string()
        .regex(/[0-9]{5}-[0-9]{3}$/)
        .trim(),
      complemento: Joi.string().trim(),
      bairro: Joi.string().trim(),
      localidade: Joi.string().trim(),
      logradouro: Joi.string().trim(),
      uf: Joi.string().trim(),
      number: Joi.string().trim(),
      isFilial: Joi.boolean()
    });

    const { error } = await schema.validate(req.query, { abortEarly: false });

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
