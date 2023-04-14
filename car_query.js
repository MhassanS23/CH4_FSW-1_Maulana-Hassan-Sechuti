const {cars_data} = require('./models')

cars_data.create({
    name: "Mazda",
    price: 550150004,
    size: "Big",
    image: "cars02.jpg"
}).then(data=>{
    console.log(data);
})

