const router = require('express').Router();
const controller = require("../controllers/category");
const {saveFile} = require("../helpers/gallery");
const {Schema} = require("../helpers/schema");
const {validatebody, validateParam , validateToken} = require("../helpers/validator");

router.get("/", validateToken, controller.all);

router.post("/",[validateToken, saveFile,validatebody(Schema.addCat), controller.post]);

router.route("/:id")
    .get(validateParam(Schema.allSchema.id, "id") ,controller.get)
    .patch([validateToken, validateParam(Schema.allSchema.id, "id"),controller.patch])
    .delete([validateToken, validateParam(Schema.allSchema.id, "id"),controller.drop])

module.exports = router;