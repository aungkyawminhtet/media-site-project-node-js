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
    }
}