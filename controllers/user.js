const DB = require("../dbs/user");
const helpers = require("../helpers/utils");

const all = async(req, res, next) => {
    let users = await DB.find();
    helpers.fMmsg(res, "All users", users);
}

const get = async(req, res, nect) => {
    let id = req.params.id;
    let user = await DB.findById(id);
    helpers.fMmsg(res, "Single user", user);
}

const post = async(req, res, next) => {
    let userSave = new DB(req.body);
    let result = await userSave.save();
    helpers.fMmsg(res, "user added", result);
}

const patch = async(req, res, next) => {
    let user = await DB.findById(req.params.id);
    if(user){
        await DB.findByIdAndUpdate(user._id, req.body);
        let retUser = await DB.findById(user._id);
        helpers.fMmsg(res, "updated user", retUser);
    }else{
         next(new Error("No found update with that id"));
    }
}

const drop = async(req, res, next) => {
    await DB.findByIdAndDelete(req.params.id);
    helpers.fMmsg(res, "deleted user");
}

module.exports = {
    all,
    get,
    post,
    patch,
    drop
}