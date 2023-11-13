require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

const fileupload = require("express-fileupload");
// const {saveFile, saveFiles, deleteFile} = require("./helpers/gallery");

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');

const userRoute = require("./routes/user");
const postRoute = require("./routes/post");
const categoryRoute = require("./routes/category");

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(fileupload());
app.use(express.json());

// app.post('/gallery',saveFiles , async(req, res, next) => {
//   // await deleteFile(req.body.name);
//   res.json({msg: "file upload", imageName: req.body.images});
// });

app.use("/category", categoryRoute);
app.use("/users", userRoute);
app.use("/posts", postRoute);

app.use((err, req, res, next) => {
  err.status = err.status || 200; 
  res.status(err.status).json({
    con:false,
    msg: err.message});
});

app.get("*", (req, res, next) => {
  res.status(200).json({msg : "No Route Foung!"});
});



app.listen(process.env.PORT, console.log(`Server is running in port ${process.env.PORT}`));