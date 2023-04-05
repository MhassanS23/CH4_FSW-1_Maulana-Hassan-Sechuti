const Car = require("./Car")

function getListCar(req, res){
    const cars = Car.list();
    res.status(200).json(cars);
}

function getBookById(req, res){
    const cars = req.cars;

    res.status(200).json(cars);
}

function createCar(req, res){
    const cars = Car.create(req.body);
    res.status(201).json(cars);
}

function updateCar(req, res){
    const cars = req.cars;

    cars.update(req.body)
    res.status(200).json(cars)
}

function deleteCar(req, res){
    const cars = req.cars;

    cars.delete();
    res.status(204).end();
}

module.exports = {
    getListCar,
    createCar,
    updateCar,
    deleteCar,
    getBookById,
};