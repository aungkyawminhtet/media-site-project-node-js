const DB = require("../models/user");
const helper = require("../helpers/utils");

const login = async(req, res, next) => {
    let phoneUser = await DB.findOne({phone: req.body.phone}).select("-__v -created");
    if(helper.comparepass(req.body.password, phoneUser.password)){
        let user = phoneUser.toObject();
        user.token = helper.maketoken(user);
        helper.fMmsg(res, "Success login", user);
    }else{
        next(new Error("Your are not Correct password"));
    }
}

const register = async(req, res, next)=>{
    let userName = await DB.findOne({name: req.body.name});
    if(userName){
        next(new Error("Name is already in use"));
        return;
    }

    let userEmail = await DB.findOne({email: req.body.email});
    if(userEmail){
        next(new Error("Email is already in use"));
        return;
    }

    let userPhone = await DB.findOne({phone : req.body.phone});
    if(userPhone){
        next(new Error("Phone is already in use"));
        return;
    }

    req.body.password = helper.encode(req.body.password);

    let result = await new DB(req.body).save();

    helper.fMmsg(res, "Success register", result);
}

const drop = async(req, res, next) => {
    await DB.findByIdAndDelete(req.params.id);
    helper.fMmsg(res,"User Deleded");
}

module.exports = {
    login,
    register,
    drop
}