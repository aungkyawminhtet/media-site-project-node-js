const router = require('express').Router();
const controller = require("../controllers/user");
const {Schema} = require("../helpers/schema");
const {validatebody} = require("../helpers/validator");

router.post("/",validatebody(Schema.userSchema), controller.login);
router.post("/register", controller.register);

module.exports = router;