const DB = require("../models/user");
const helper = require("../helpers/utils");

const login = async(req, res, next) => {
    let password = helper.encode(req.body.password);
    helper.fMmsg(res, "Success login", password);
    
}

const register = async(req, res, next)=>{
    helper.fMmsg(res, "Success register", req.body);
}

module.exports = {
    login,
    register
}