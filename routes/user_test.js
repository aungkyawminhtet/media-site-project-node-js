const route = require('express').Router();
const controller = require('../controllers/user_test');

route.get("/", controller.all);

route.post("/", controller.post);

route.route("/:id")
    .get(controller.get)
    .patch(controller.patch)
    .delete(controller.drop)

module.exports = route;