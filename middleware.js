const Car = require("./Car")


function setCar(req, res, next){
    const cars = Car.find(req.params.id);

    if(!cars){
        res.status(404).json({
            error: "Cars not found!"
        });
    return;
    }
    req.cars = cars;
    next();
}

module.exports = {
    setCar,
}