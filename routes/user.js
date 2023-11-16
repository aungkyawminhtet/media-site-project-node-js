const router = require('express').Router();
const { required } = require('joi');
const controller = require("../controllers/user");
const {Schema} = require("../helpers/schema");
const {validatebody, validateParam} = require("../helpers/validator");
const {validateToken}= require("../helpers/validator");

router.post("/", validateToken, controller.login);
router.post("/register",validatebody(Schema.userSchema), controller.register);

router.delete("/:id", validateParam(Schema.allSchema.id, "id"), controller.drop);

module.exports = router;