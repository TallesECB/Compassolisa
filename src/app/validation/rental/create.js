const Joi = require('joi').extend(require('@joi/date'));

module.exports = async (req, res, next) => {  
    try {
        const schema = Joi.object({
            id: Joi.string().trim().required(),
            nome: Joi.string().trim().required(),
            cnpj: Joi.string().required(), 
            atividades: Joi.string().trim().required(),
            endereco: Joi.array().items(
                {cep:Joi.string().trim().required()},
                //{logradouro:Joi.string().trim().required()}, //utilizar a api de cep 
                //{complemento:Joi.string().trim()},
                //{bairro:Joi.string().trim().required()},
                {number:Joi.string().trim().required()},
                //{localidade:Joi.string().trim().required()},
                //{uf:Joi.string().trim().required()}
            ).required().unique(),
        });
        
        const { error } = await schema.validate(req.body, { abortEarly: false });
        
        if (error) throw error;

        return next(error)
    } catch (error) {
        const handlingErrors = error.details
        const result = []

        handlingErrors.forEach(object => {
            result.push({
                description: object.path[0],
                name: object.message
            })
        })
        return res.status(400).json(result);
    }

}