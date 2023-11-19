const joi = require('joi');

module.exports = {
    Schema : {
        addCat: joi.object({
            name:joi.string().required(),
            image: joi.string().required(),
            user: joi.optional()
        }),

        userSchema: joi.object({
            name: joi.string().required(),
            email: joi.string().email().required(),
            phone: joi.string().min(9).max(11).required(),
            password: joi.string().min(8).max(15).required()
        }),

        postSchema: joi.object({
            cat : joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            tag: joi.string().regex(/^[0-9a-fA-F]{24}$/),
            title : joi.string().required(),
            image: joi.string().required(),
            decs: joi.string().required(),
            user: joi.optional()
        }),

        tagSchema: joi.object({
            name: joi.string().required(),
            image: joi.string().required(),
            user: joi.optional()
        }),

        commentSchema: joi.object({
            postId : joi.string().regex(/^[0-9a-fA-F]{24}$/),
            name: joi.string().required(),
            email: joi.string().required(),
            content: joi.string().required(),
            user: joi.optional()
        }),

        allSchema: {
            id: joi.object({
                id: joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
            }),
            page: joi.object({
                page: joi.number().required(),
            }),

            image: {
                image: joi.object({
                    name: joi.string().required()
                })
            }
        }
    }
}