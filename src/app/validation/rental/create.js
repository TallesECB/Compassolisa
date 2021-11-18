const Joi = require('joi').extend(require('@joi/date'));
const { CnpjRegex } = require('../utils/regex');
const { CepRegex } = require('../utils/regex');
const serialize = require('../../serialize/handlingErrorsValidation');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      nome: Joi.string().trim().min(4).required(),
      cnpj: Joi.string().required().regex(CnpjRegex).messages({
        'string.pattern.base': `{#label} with value {:[.]} fails to match the required pattern format: xx.xxx.xxx/xxxx-xx`
      }),
      atividades: Joi.string().trim().required(),
      endereco: Joi.array()
        .items({
          cep: Joi.string()
            .regex(CepRegex)
            .messages({
              'string.pattern.base': `{#label} with value {:[.]} fails to match the required format: xxxxx-xxx`
            })
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

    return next();
  } catch (error) {
    const result = await serialize.serializeErrors(error);
    return res.status(400).json(result);
  }
};
