const router = require("express").Router();
const DB = require("../models/gallery");
const { saveFile, saveFiles, deleteFile } = require("../helpers/gallery");
const helper = require("../helpers/utils");


router.post("/", saveFiles, (req, res, next) => {
    let filenames = req.body.images;
    let images = filenames.split(",");
    images.forEach(async(image) => {
        await new DB({name : image}).save();
    }); 
    helper.fMmsg(res, "image Uploaded");
});


router.get("/", async(req, res, next) => {
    let images = await DB.find();
    helper.fMmsg(res, "all images", images);
});

router.delete("/:name", async(req, res, next) => {
    let image = req.params.name;
    let imagename = await DB.findOne({name : image});
    if(imagename){
        await DB.findByIdAndDelete(imagename._id);
        deleteFile(imagename.name);
        helper.fMmsg(res, "image deleted");
    }else{
        next(new Error("No image with that file name"));
    }
});

module.exports = router;