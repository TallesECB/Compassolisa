const Joi = require('joi');

module.exports = async (req, res, next) => {  
    try {
        const schema = Joi.object({
            offset: Joi.string(),
            limit: Joi.string(),
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