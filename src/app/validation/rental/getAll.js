const Joi = require('joi').extend(require('@joi/date'));
const { CnpjRegex } = require('../utils/regex');
const { CepRegex } = require('../utils/regex');
const serialize = require('../../serialize/handlingErrorsValidation');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      offset: Joi.number().min(0).default(1),
      limit: Joi.number().min(0).max(1000),
      nome: Joi.string().trim().min(4),
      cnpj: Joi.string().regex(CnpjRegex),
      atividades: Joi.string().trim(),
      cep: Joi.string().regex(CepRegex).trim(),
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
    const result = await serialize.serializeErrors(error);
    return res.status(400).json(result);
  }
};
