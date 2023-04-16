const {cars_data} = require('../models')


async function setCar(req, res, next){
    const id = req.params.id;
    const cars = await cars_data.findByPk(id);
    if(!cars){
        res.render('404_notfound',{
            title: "404"
        });
        return;
    }
    req.cars = cars.id;
    next();
}

module.exports = {
    setCar,
}