const express = require('express');
const app = express();
const port = 8000;
const handler = require('./handler')
const middleware = require('./middleware')


app.use(express.json());


app.get("/cars", handler.getListCar);
app.get("/cars/:id", middleware.setCar, handler.getBookById);

app.post("/cars", handler.createCar);

app.put("/cars/:id", middleware.setCar, handler.updateCar);

app.delete("/cars/:id", middleware.setCar, handler.deleteCar);

app.listen(port, ()=>{
    console.log(
        "Server sudah berjalan, silahkan buka http://localhost:%d",
        port
      );
});