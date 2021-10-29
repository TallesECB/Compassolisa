const Joi = require('joi').extend(require('@joi/date'));

module.exports = async (req, res, next) => {  
    try {
        const schema = Joi.object({
            nome: Joi.string().required(),
            cpf: Joi.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/).required(), 
            data_nascimento: Joi.date().format('DD/MM/YYYY').required(),  
            email: Joi.string().email().required(), 
            senha: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).required(),
            habilitado: Joi.string().valid('sim','não').required()
        });
        
        const { error } = await schema.validate(req.body, { abortEarly: false });
    
        if (error) throw error;
    
        return next(error);
    } catch (error) {
        return res.status(400).json(error.message);
    }

}