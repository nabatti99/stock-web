require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const homeRouter = require("./routers/home.router");

const app = express();
const port = process.env.PORT;

app.set("view engine", "pug");
app.set("views", "views");

app.use(express.static("public"));

app.use("/", homeRouter);

app.listen(port, function () {
    console.log("Server is running on port " + port);
});