const joi = require('joi');

module.exports = {
    Schema : {
        addCat: joi.object({
            name:joi.string().required(),
            image: joi.string().required()
        }),

        userSchema: joi.object({
            name: joi.string().required(),
            email: joi.string().email().required(),
            phone: joi.string().min(9).max(11).required(),
            password: joi.string().min(8).max(15).required()
        }),

        postSchema: joi.object({
            cat : joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            title : joi.string().required(),
            image: joi.string().required(),
            decs: joi.string().required()
        }),

        allSchema: {
            id: joi.object({
                id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
            }),
            image: {
                image: joi.object({
                    name: joi.string().required()
                })
            }
        }
    }
}