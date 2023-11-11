const route = require('express').Router();

route.get("/", (req, res, next) => {
    res.status(200).json({msg: "All Users"});
});

route.post("/", (req, res, next) => {
    res.status(200).json(req.body);
});

route.route("/:id")
    .get((req, res) => res.json({msg: "single post id is " + req.params.id}))
    .patch((req, res) => res.json({msg: "update user id is " + req.params.id}))
    .delete((req, res,next) => res.json({msg: `delete user id is ${req.params.id}`}))

// route.get("/:id", (req, res, next) => {
//     let id = req.params.id;
//     res.json({msg: `single user id is ${id}`});
// });

// route.patch("/:id", (req, res, next) => {
//     res.status(200).json({msg: `update user id is ${req.params.id}`});
// });

// route.delete("/:id", (req, res, next) => {
//     let id = req.params.id;

//     res.status(200).json({msg: `delete user id is ${id}`});
// })


module.exports = route;