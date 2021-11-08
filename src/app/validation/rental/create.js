const Joi = require('joi').extend(require('@joi/date'));

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      nome: Joi.string().trim().min(4).required(),
      cnpj: Joi.string()
        .required()
        .regex(/^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/),
      atividades: Joi.string().trim().required(),
      endereco: Joi.array()
        .items({
          cep: Joi.string()
            .regex(/[0-9]{5}-[0-9]{3}$/)
            .trim()
            .required(),
          complemento: Joi.string().trim(),
          number: Joi.string().trim().required(),
          isFilial: Joi.boolean().required()
        })
        .required()
        .unique()
    });

    const { error } = await schema.validate(req.body, { abortEarly: false });

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
