const fs = require('fs');

const saveFile = async(req, res, next) => {
    let file = req.files.file;
    let fileName = new Date().valueOf() + "_" + file.name;
    file.mv(`./uploads/${fileName}`);
    req.body['image'] = fileName;
    next();
    // console.log(req.files.file.name);
}

const saveFiles = async(req, res, next) => {
    let fileNames = [];
    let files = req.files.files;
    files.forEach(file => {
        let fileName = new Date().valueOf() + "_" + file.name;
        file.mv(`./uploads/${fileName}`);
        fileNames.push(fileName);
    });
    req.body["images"] = fileNames.join();
    next();
}

const deleteFile = async(fileName) => {
    await fs.unlinkSync(`./uploads/${fileName}`);
}


module.exports = {
    saveFile,
    saveFiles,
    deleteFile
}