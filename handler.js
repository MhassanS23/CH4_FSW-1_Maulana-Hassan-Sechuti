const Car = require("./Car")
const {cloudinary} = require("./utils/cloudinary");
const {cars_data} = require('./models')

function getListCar(req, res){
    cars_data.findAll().then(cars=>{
        res.render("listPage", {
            title: "Cars Page",
            data: cars
        })
    })
}

function displayDashboard(req, res){
    res.render('dashboard', {
        title: "Dashboard Page"
    });
}

async function displayDelete(req, res){
    await cars_data.destroy({
        where: {id : req.params.id}
    }).then(cars =>{
        res.redirect('/cars'); 
    }).catch(error=>{
        res.status(422).json(error)
    })
}

async function displayUpdate(req, res){
    const cars = await cars_data.findByPk(req.params.id);
    res.render("updatePage", {
        title: "Update Cars Page",
        data: cars
    });

}

async function displayCreate(req, res){
    const all_images = await cloudinary.api.resources();
    const images = await all_images.resources;

    res.render("createPage", {
        title: "Create Cars Page",
        image: images,
    })
}

function getBookById(req, res){
    const cars = req.cars;

    res.status(200).json(cars);
}

async function createCar (req, res){
    const result = await cloudinary.uploader.upload(req.file.path);
    await cars_data.create({
        name: req.body.name,
        price: req.body.price,
        size: req.body.size,
        image: result.url
    }).then(cars =>{
        res.redirect('/cars'); 
    }).catch(error=>{
        res.status(422).json(error)
    })
}

async function updateCar(req, res){
    const ids = req.params.id;
    let new_img = '';

    if(req.file == undefined){
         new_img = req.body.img_old;
    }else{
        const upload_img=  await cloudinary.uploader.upload(req.file.path);
         new_img = upload_img.url;
    }

    await cars_data.update({
        name: req.body?.name,
        price: req.body?.price,
        size: req.body?.size,
        image: new_img
    }, {
        where: {id: ids}
    }).then(cars =>{
        res.redirect('/cars');
    }).catch(error=>{
        res.status(422).json("errornya", error)
    })

}

function deleteCar(req, res){
   const result = req.body;
    const data = req.params;

    res.json(data)
}



module.exports = {
    getListCar,
    createCar,
    updateCar,
    deleteCar,
    getBookById,
    displayCreate,
    displayDashboard,
    displayUpdate,
    displayDelete
};