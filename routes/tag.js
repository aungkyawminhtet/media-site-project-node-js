const router = require("express").Router();
const controller = require("../controllers/tag");
const {saveFile} = require("../helpers/gallery");
const { validateToken, validatebody, validateParam} = require("../helpers/validator");
const {Schema} = require("../helpers/schema");

router.get("/",[validateToken, controller.all]);

router.post("/",[validateToken, saveFile, validatebody(Schema.tagSchema), controller.post]);

router.route("/:id")
    .get([validateToken, validateParam(Schema.allSchema.id, "id"), controller.get])
    .patch([validateToken, validateParam(Schema.allSchema.id) , controller.patch])
    .delete(validateToken, controller.drop);

module.exports = router;