const router = require('express').Router();
const controller = require("../controllers/post");
const {validateToken, validatebody} = require("../helpers/validator");
const {Schema}  = require("../helpers/schema");
const {saveFile} = require("../helpers/gallery");

router.get("/", controller.all);

router.post("/",[validateToken, saveFile, validatebody(Schema.postSchema), controller.post]);

router.route("/:id")
    .get(controller.get)
    .patch(controller.patch)
    .delete(controller.drop)

module.exports = router;