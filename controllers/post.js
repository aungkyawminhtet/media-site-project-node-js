const DB = require("../models/post");
const commentDB = require("../models/comment");
const helper = require("../helpers/utils");

const all = async(req, res, next) => {
    // res.json({msg : "this is all"});
    let posts = await DB.find().populate("user cat", "-__v -password");
    helper.fMmsg(res, "All posts", posts);
}

const get = async(req, res, next) => {
     let post = await DB.findById(req.params.id).select("title content");
    //  let post = await DB.findById(req.params.id).populate("user cat", "-password -__v");
     let comments = await commentDB.find({postId: post._id});
     post = post.toObject();
     post["comments"] = comments;
     helper.fMmsg(res, "Single Post", post);
     if(post){
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

const bytag = async(req, res, next) => {
    let tags = await DB.find({tag: req.params.id});
    if(tags){
        helper.fMmsg(res, "all post tag", tags);
    }else{
        next(new Error("No post with that id"));
    }
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

const paginate = async(req, res, next) => {
    let page = req.params.page;
    page = page == 1 ? 0 : page - 1;
    let limit = Number(process.env.POST_LIMIT);
    let skipCount = limit * page;
    let posts = await DB.find().skip(skipCount).limit(limit);
    helper.fMmsg(res, "Paginate post", posts);
}

const togglelike = async(req ,res, next) => {
    let post = await DB.findById(req.params.id);
    if(post){
        if(req.params.page == 1)
            post.like = post.like + 1;
        else
            post.like = post.like - 1;
        await DB.findByIdAndUpdate(post._id, post);
        let retpost = await DB.findById(req.params.id);
        helper.fMmsg(res, "add like", retpost);
    }else{
        next(new Error("NO post with that id"));
    }
}

// const removelike = async(req, res, next) => {
//     let post = await DB.findById(req.params.id);
//     // console.log(post);
//     if(post){
//         post.like = post.like - 1;
//         await DB.findByIdAndUpdate(post._id, post);
//         let retlike = await DB.findById(req.params.id);
//         helper.fMmsg(res, "remove like", retlike);
//     }else{
//         next(new Error("No post with that id"));
//     }
// }

module.exports = {
    all,
    get,
    post,
    patch,
    drop,
    bycat,
    byuserId,
    paginate,
    bytag,
    togglelike
}