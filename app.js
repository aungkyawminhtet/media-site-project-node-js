const express = require('express');
const app = express();
const userRoute = require("./routes/user");
const postRoute = require("./routes/post");

app.use(express.json());

app.use("/users", userRoute);
app.use("/posts", postRoute);

app.get("*", (req, res, next) => {
  res.status(200).json({msg : "No Route Foung!"});
});



app.listen(3000, console.log("Server is running in port 3000"));