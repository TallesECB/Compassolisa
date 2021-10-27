const Joi = require('joi');
const moment = require('moment')
const underAge = require('../../errors/underAge')

module.exports = async (req, res, next) => {  
    
    try {
        const minAge = 18
        let isValidDate = false
        
        const schema = Joi.object({
            nome: Joi.string().required(),
            cpf: Joi.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/).required(), 
            data_nascimento: Joi.date().required(),  
            email: Joi.string().email().required(), 
            senha: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).required(),
            habilitado: Joi.string().required()
        });
        
        const years = moment().diff(moment(req.body.data_nascimento, 'YYYY-MM-DD'), 'years', true)
        if(years >= minAge) {
            isValidDate = true
        }
       
        if(isValidDate) {
            const { error } = await schema.validate(req.body, { abortEarl: true });
    
            if (error) throw error
    
            return next();
        } else {
            throw new underAge(req.body.nome)
        }
    } catch (error) {
        return res.status(400).json(error.message);
    }

}