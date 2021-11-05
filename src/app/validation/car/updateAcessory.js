const Joi = require('joi');

module.exports = async (req, res, next) => {  
    try {
        const reqs = {
            id: req.params.id,
            idAcessory: req.params.idAcessory,
            descricao: req.body.descricao
        }
        const schema = Joi.object({
            id: Joi.string().required().regex(/^[0-9A-Fa-f\d]/).min(24).max(24),
            idAcessory: Joi.string().required().regex(/^[0-9A-Fa-f\d]/).min(24).max(24),
            descricao: Joi.string().trim().required()
        });   

        const { error } = await schema.validate(reqs, { abortEarly: false });

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

