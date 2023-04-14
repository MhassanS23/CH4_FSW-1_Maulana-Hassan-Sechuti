const carss = require("./cars.json");
class Car{
    static listCars = [carss];

    
    constructor(params){
        this.id = this._generateId()
        this.nama = params.nama;
        this.img = params.img;
        this.price = params.price;
        this.size = params.size;
    }

    _generateId(){
        const recordId = this.constructor.listCars[this.constructor.listCars.length - 1]?.id || 0
        return recordId + 1;
    }


    update(params){
        const idx = this.constructor.listCars.findIndex((i)=> i.id === this.id);

        params.nama && (this.nama = params.nama);
        params.price && (this.price = params.price);
        params.size && (this.size = params.size);
        params.img && (this.img = params.img);

        this.constructor.listCars[idx] = this;

        return this;
    }

    delete(){
        this.constructor.listCars = this.constructor.listCars.filter((i)=> i.id !== this.id);
    }

    static create(params){
        const cars = new this(params);

        this.listCars.push(cars);

        return cars;
    }

    static find(id){
        const cars = this.listCars.find((i)=> i.id === Number(id));
        if(!cars) return null;

        return cars;
    }

    static list(){
        return this.listCars;
    }
}

module.exports = Car