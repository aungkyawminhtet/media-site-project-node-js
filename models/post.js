const mongoose = require('mongoose');
const {Schema} = mongoose;

const postSchema = new Schema({
    user: {type: Schema.Types.ObjectId, required: true, ref: "User"},
    title: {type: String, required: true},
    decs: {type: String, required: true},
    create_at : {type: Date, default: Date.now}
});

const post = mongoose.model("Post", postSchema);
module.exports = post;