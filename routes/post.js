const router = require('express').Router();
const controller = require("../controllers/post");
const {validateToken, validatebody, validateParam} = require("../helpers/validator");
const {Schema}  = require("../helpers/schema");
const {saveFile} = require("../helpers/gallery");

router.get("/", controller.all);

router.post("/",[validateToken, saveFile, validatebody(Schema.postSchema), controller.post]);

router.get("/bycat/:id", controller.bycat);

router.get("/byuser/:id", controller.byuserId);

router.get("/bytag/:id", controller.bytag);

router.get("/paginate/:page",[validateParam(Schema.allSchema.page, "page"), controller.paginate]);

router.get("/like/toggle/:id/:page", validateParam(Schema.allSchema.id, "id"), controller.togglelike);

// router.get("/like/add/:id", validateParam(Schema.allSchema.id, "id"), controller.addlike);

// router.get("/like/remove/:id", validateParam(Schema.allSchema.id, "id"), controller.removelike);

router.route("/:id")
    .get(controller.get)
    .patch([validateToken, controller.patch])
    .delete(controller.drop)

module.exports = router;