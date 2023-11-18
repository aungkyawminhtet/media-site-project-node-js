const DB = require("../models/tag");
const helper = require("../helpers/utils");

const all = async(req, res, next) => {
    let tags = await DB.find();
    helper.fMmsg(res, "all tag", tags);
}

const post = async(req, res, next) => {
    let tagname = await DB.findOne({name: req.body.name});
    if(tagname){
        next(new Error("Name is already user"));
        return;
    }
    
    let result = await new DB(req.body).save();
    helper.fMmsg(res, "Tag post", result);
}

const get = async(req, next, res) => {
    let tagId = await DB.findById(req.params.id);
    if(tagId){
        helper.fMmsg(res, "single tag", tagId);
    }else{
        next(new Error("No tag found with that id"));
    }
}

const patch = async(req, res, next) => {
    let tagId = await DB.findById(req.params.id);
    if(tagId){
        await DB.findByIdAndUpdate(tagId._id, req.body);
        let retTag = await DB.findById(tagId._id);
        helper.fMmsg(res, "update post", retTag);
    }else{
        next(new Error("No tag found with that id"));
    }

}

const drop = async(req, res, next) => {
    let tagId = await DB.findById(req.params.id);
    if(tagId){
        await DB.findByIdAndDelete(tagId);
        helper.fMmsg(res, "deleted tag");
    }else{
        next(new Error("No tag found with that id"));
    }
}

module.exports = {
    all,
    get,
    post,
    patch,
    drop
}