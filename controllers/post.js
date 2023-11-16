const DB = require("../models/post");
const helper = require("../helpers/utils");

const all = async(req, res, next) => {
    let posts = await DB.find().populate('user', ("-password -__v"));
    helper.fMmsg(res, "All posts", posts);
}

const get = async(req, res, next) => {
     let post = await DB.findById(req.params.id).populate("user", "-password -__v");
     if(post){
        helper.fMmsg(res, "Single Post", post);
     }else{
        next(new Error("No post found with that id"));
     }
}

const post = async(req, res, next) => {
    // console.log(req.body.user);
    // let savePost = await new DB(req.body).save();
    helper.fMmsg(res, "post Added", req.body.user);
}

const patch = async(req, res, next) => {
    let post = await DB.findById(req.params.id);
    if(post){
        await DB.findByIdAndUpdate(post._id, req.body);
        let retpost = await DB.findById(post._id);
        helper.fMmsg(res, "updated post", retpost);
    }else{
        next(new Error("No post found with that id"));
    }
}

const drop = async(req, res, next) => {
    await DB.findByIdAndDelete(req.params.id);
    helper.fMmsg(res, "Post Deleted");
}

module.exports = {
    all,
    get,
    post,
    patch,
    drop
}