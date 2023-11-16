let jwt = require("jsonwebtoken");
let userDB = require("../models/user");

module.exports = {
    validatebody: (schema) => {
        return(req, res, next) => {
            const result = schema.validate(req.body);
            if(result.error){
                next(new Error(result.error.details[0].message));
            }else{
                next();
            }
        }
    },
    validateParam: (schema, name) => {
        return(req, res, next) => {
            let obj = {}
            obj[`${name}`] = req.params[`${name}`]

            let result = schema.validate(obj);
            if(result.error){
                next(new Error(result.Error.details[0].message));
            }else{
                next();
            }
        }
    },
    validateToken: async(req, res, next) => {
        let token = req.headers.authorization;
        if(token){
            token = token.split(" ")[1];
            let decoded = jwt.decode(token, process.env.SECRECT_KEY);

            let user = await userDB.findById(decoded._id);
            if(user){
                req.body["user"] = user;
                next();
            }else{
                next(new Error("Authorization Error"));
            }
        }else{
            next(new Error("Authorization Error"));
        }

    }
}