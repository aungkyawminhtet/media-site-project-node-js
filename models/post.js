const mongoose = require('mongoose');
const {Schema} = mongoose;

const postSchema = new Schema({
    user: {type: Schema.Types.ObjectId, required: true, ref: "user"},
    cat: {type: Schema.Types.ObjectId, required: true, ref: "category"},
    tag: {type: Schema.Types.ObjectId, required: true, ref:"tag"},
    like: {type: Number, default: 0},
    image: {type: String, required: true},
    title: {type: String, required: true},
    decs: {type: String, required: true},
    create_at : {type: Date, default: Date.now}
});

const post = mongoose.model("post", postSchema);
module.exports = post;