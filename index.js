const express = require('express');
const app = express();
const port = 8000;
const handler = require('./handler');
const middleware = require('./Middleware/middleware');
const expressLayout = require('express-ejs-layouts');
const upload = require("./utils/multer");



app.use(express.json({limit: "50m"}));
app.use(express.urlencoded({limit: "50mb", extended: false}));
app.use(expressLayout);
app.set("view engine", "ejs");

app.use("/public", express.static(__dirname + "/public"))

//display ejs
app.get("/", handler.displayDashboard);
app.get("/cars", handler.getListCar);
app.get("/createCar", handler.displayCreate);
app.get("/updateCar/:id", handler.displayUpdate);
app.get("/cars/:id/delete", handler.displayDelete);

//display API
app.get("/cars/:id", middleware.setCar, handler.getBookById);
app.post("/createCar", upload.single('img'), handler.createCar);
app.post("/updateCar/:id", upload.single('img'), handler.updateCar);
app.post("/deleteCar/:id", handler.deleteCar);

app.listen(port, ()=>{
    console.log(
        "Server sudah berjalan, silahkan buka http://localhost:%d",
        port
      );
});