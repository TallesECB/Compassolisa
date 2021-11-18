const Joi = require('joi');
const serialize = require('../../serialize/handlingErrorsValidation');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      modelo: Joi.string().trim().required(),
      cor: Joi.string().trim().required(),
      ano: Joi.number().min(1950).max(2022).required(),
      acessorios: Joi.array()
        .items({ descricao: Joi.string().trim().lowercase().required() })
        .required()
        .unique()
        .messages({
          'array.unique': `Acessorios contains a duplicate value`
        }),
      quantidadePassageiros: Joi.number().required()
    });

    const { error } = await schema.validate(req.body, { abortEarly: false });

    if (error) throw error;

    return next();
  } catch (error) {
    const result = await serialize.serializeErrors(error)
    return res.status(400).json(result);
  }
};
