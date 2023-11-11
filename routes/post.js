const router = require('express').Router();

router.get("/", (req, res, next) => {
    res.json({msg : "All posts"});
});

router.post("/",(req, res, next) => {
    res.status(200).json(req.body);
});

router.route("/:id")
    .get((req, res, next) => res.json({msg: `Single post id is ${req.params.id}`}))
    .patch((req, res, next) => res.json({msg: `update post id id${req.params.id}`}))
    .delete((req,res,next) => res.json({msg: `delete post id is  ${req.params.id}`}))

// router.get("/:id", (req, res, next) => {
//     res.json({msg : `Single post id is ${req.params.id}`});
// });

// router.patch("/:id", (req, res, next) => {
//     let id = req.params.id;
//     res.status(200).json({msg: `update post id is ${id}`});
// });

// router.delete("/:id", (req, res, next) => {
//     res.status(200).json({msg : `delete post id is ${req.params.id}`});
// });

module.exports = router;