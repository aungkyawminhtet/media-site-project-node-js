const router = require("express").Router();
const controller = require("../controllers/comment");
const {validateToken, validatebody, validateParam} = require("../helpers/validator");
const {Schema} = require("../helpers/schema");

router.get("/", controller.all);

router.get("/:id",[validateParam(Schema.allSchema.id, "id"), controller.get]);

router.post("/", [validateToken, validatebody(Schema.commentSchema), controller.post]);

router.delete("/:id",[validateToken, validateParam(Schema.allSchema.id, "id"), controller.drop]);

module.exports = router;
 