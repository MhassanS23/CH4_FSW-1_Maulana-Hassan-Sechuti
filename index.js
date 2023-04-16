const express = require('express');
const app = express();
const port = 8000;
const path = require('path')
const handler = require('./handler');
const middleware = require('./Middleware/middleware');
const expressLayout = require('express-ejs-layouts');
const upload = require("./utils/multer");
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config()

const PUBLIC_DIRECTORY = path.join(__dirname, "public")

app.use(express.json({limit: "50m"}));
app.use(express.urlencoded({limit: "50mb", extended: false}));
app.use(expressLayout);
app.set("view engine", "ejs");
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

app.use("/public", express.static(PUBLIC_DIRECTORY))

//display ejs
app.get("/", handler.displayDashboard);
app.get("/cars", handler.getListCar);
app.get("/createCar", handler.displayCreate);
app.get("/updateCar/:id", middleware.setCar, handler.displayUpdate);
app.get("/cars/:id/delete", middleware.setCar, handler.displayDelete);

//display API
app.get("/cars/:id", handler.getBookById);
app.post("/createCar", upload.single('img'), handler.createCar);
app.post("/updateCar/:id", upload.single('img'), handler.updateCar);

app.listen(port, ()=>{
    console.log(
        "Server sudah berjalan, silahkan buka http://localhost:%d",
        port
      );
});