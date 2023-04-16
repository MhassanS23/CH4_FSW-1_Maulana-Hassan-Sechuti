const Car = require("./Car")
const {cloudinary} = require("./utils/cloudinary");
const {cars_data} = require('./models')

function getListCar(req, res){
    const message = req.flash('success');
    const error = req.flash('error');
    cars_data.findAll().then(cars=>{
        res.render("listPage", {
            title: "Cars Page",
            data: cars,
            message: message,
            formatRupiah : formatRupiah,
            error: error
        })
    })
}

function formatRupiah(params) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    }).format(params);
  }

function displayDashboard(req, res){
    res.render('dashboard', {
        title: "Dashboard Page"
    });
}

async function displayDelete(req, res){
    const ids = req.params.id
    await cars_data.destroy({
        where: {id : ids}
    }).then(cars =>{
        req.flash('error', 'Data Berhasil Dihapus!');
        res.redirect('/cars'); 
    }).catch(error=>{
        req.flash('error', 'Data Gagal Dihapus!');
        res.redirect('/cars');
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
        req.flash('success', 'Data Berhasil Ditambahkan!');
        res.redirect('/cars'); 
    }).catch(error=>{
        req.flash('error', 'Data Gagal Ditambahkan! Silahkan Cek Inputan Harga tidak boleh dari 9');
        res.redirect('/cars');
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
    console.log(ids);

    await cars_data.update({
        name: req.body?.name,
        price: req.body?.price,
        size: req.body?.size,
        image: new_img
    }, {
        where: {id: ids}
    }).then(cars =>{
        req.flash('success', 'Data Berhasil Diubah!');
        res.redirect('/cars');
    }).catch(error=>{
        req.flash('error', 'Data Gagal Diubah!');
        res.redirect('/cars');
    })

}



module.exports = {
    getListCar,
    createCar,
    updateCar,
    getBookById,
    displayCreate,
    displayDashboard,
    displayUpdate,
    displayDelete
};