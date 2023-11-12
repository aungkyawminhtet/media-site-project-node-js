require('dotenv').config();
const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');

const userRoute = require("./routes/user");
const postRoute = require("./routes/post");

app.use(express.json());

const funcky = (req, res, next) => {
  res.status(200).json({msg: "you can all access"});
}

const isLogged = (req, res, next) => {
  if( 2 == 2){
    // res.json({msg : "you pass isLogged"});
    next();
  }else{
    next(new Error("Your are not login"));
  }
}

const isAdmin = (req, res, next) => {
  if(5 == 5){
    // res.json({msg: "your is admin"});
    next();
  }else{
    next(new Error("Your are not admin"));
  }
}

app.get("/users",isLogged, isAdmin, funcky);


// app.use("/users", userRoute);
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