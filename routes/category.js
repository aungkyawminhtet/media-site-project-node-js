const router = require('express').Router();
const controller = require("../controllers/category");
const {saveFile} = require("../helpers/gallery");
const {Schema} = require("../helpers/schema");
const {validatebody, validateParam} = require("../helpers/validator");

router.get("/", controller.all);

router.post("/",[saveFile,validatebody(Schema.addCat), controller.post]);

router.route("/:id")
    .get(validateParam(Schema.allSchema.id, "id") ,controller.get)
    .patch(validateParam(Schema.allSchema.id, "id"),controller.patch)
    .delete(validateParam(Schema.allSchema.id, "id"),controller.drop)

module.exports = router;