const DB = require("../models/post");
const helper = require("../helpers/utils");

const all = async(req, res, next) => {
    // res.json({msg : "this is all"});
    let posts = await DB.find().populate("user cat", "-__v -password");
    helper.fMmsg(res, "All posts", posts);
}

const get = async(req, res, next) => {
     let post = await DB.findById(req.params.id).populate("user cat", "-password -__v");
     if(post){
        helper.fMmsg(res, "Single Post", post);
     }else{
        next(new Error("No post found with that id"));
     }
}

const post = async(req, res, next) => {
    // console.log(req.body);
    let userId  = req.body.user._id;
    delete req.body.user;
    req.body.user = userId;
    let savePost = await new DB(req.body).save();
    helper.fMmsg(res, "post Added", savePost);
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

const bycat = async(req, res, next) => {
    let posts = await DB.find({cat: req.params.id});
    // console.log(posts);
    helper.fMmsg(res, "all post from cat", posts);
}

const byuserId = async(req, res, next) => {
    let post = await DB.find({user: req.params.id}).populate("user", "-password -__v");
    helper.fMmsg(res, "all post from user", post);
}

const drop = async(req, res, next) => {
    let post = await DB.findById(req.params.id);
    if(post){
        await DB.findByIdAndDelete(req.params.id);
        helper.fMmsg(res, "Post Deleted");
    }else{
        next(new Error("No post is with that id"));
    }
}

module.exports = {
    all,
    get,
    post,
    patch,
    drop,
    bycat,
    byuserId
}