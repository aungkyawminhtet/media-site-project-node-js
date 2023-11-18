const mongoose = require("mongoose");
const { Schema } = mongoose;
const gallerySchema = new Schema({
    name: {type: String, required: true},
    created: {type: Date, default: Date.now}
});

const gallery = mongoose.model("gallery", gallerySchema);
module.exports = gallery;