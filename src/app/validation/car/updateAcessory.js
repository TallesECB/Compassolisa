const Joi = require('joi');

module.exports = async (req, res, next) => {  
    try {
        const schema = Joi.object({
            descricao: Joi.string().trim().required()
        });   

        const { error } = await schema.validate(req.body, { abortEarly: false });

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

