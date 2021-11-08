const Joi = require('joi');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      modelo: Joi.string().trim().required(),
      cor: Joi.string().trim().required(),
      ano: Joi.number().min(1950).max(2022).required(),
      acessorios: Joi.array().items({ descricao: Joi.string().trim().lowercase().required() }).required().unique(),
      quantidadePassageiros: Joi.number().required()
    });

    const { error } = await schema.validate(req.body, { abortEarly: false });

    if (error) throw error;

    return next();
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
