const commentDB = require("../models/comment");
const helper = require("../helpers/utils");

const all = async(req, res, next) => {
    let comments = await commentDB.find();
    helper.fMmsg(res, "all comments", comments);
}

const post = async(req, res, next) => {
    let result = await new commentDB(req.body).save();
    helper.fMmsg(res, "comment is added", result);
}

const drop = async(req, next , res) => {
    let commnetId = await commentDB.findById(req.params.id);
    if(commnetId){
        await commentDB.findByIdAndDelete(commnetId);
        helper.fMmsg(res, "deleted comment");
    }else{
        next(new Error("No comment with that id"));
    }
}

module.exports = {
    all,
    post,
    drop
}