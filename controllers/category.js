const DB = require("../models/category");
const helper = require("../helpers/utils");

const all = async(req, res, next) => {
    let categories = await DB.find();
    helper.fMmsg(res, "All categories", categories);
}

const post = async(req, res, next) => {
    let dbCat = await DB.findOne({name: req.body.name});
    if(dbCat){
        next(new Error("Name is already exit"));
        return;
    }
    let result = await new DB(req.body).save();
    helper.fMmsg(res, "Category Added", result);
}

const get = async(req, res, next) => {
    let category = await DB.findById(req.params.id);
    if(category){
        helper.fMmsg(res, "single category", category);
    }else{
        next(new Error("no found categroy with that id"));
    }
}

const patch = async(req, res, next) => {
    let category = await DB.findById(req.params.id);
    if(category){
        await DB.findByIdAndUpdate(category._id , req.body);
        let retcategory = await DB.findById(category._id);
        helper.fMmsg(res, "category updated", retcategory);
    }else{
        next(new Error("No found with that id"));
    }
}

const drop = async(req, res, next) => {
    let dbCat = await DB.findById(req.params.id);
    if(dbCat){
        await DB.findByIdAndDelete(dbCat._id);
        helper.fMmsg(res, "Deleted Categroy");
    }else{
        next(new Error("NO Category with that id"));
    }
}

module.exports = {
    all,
    post,
    patch,
    get,
    drop
}