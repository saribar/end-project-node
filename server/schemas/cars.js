const mongoose = require('mongoose')
const Joi = require("joi")

const CarsSchema = new mongoose.Schema({
    type: {
       type: String,
       require: true
    },
    numberOfSeats: {
        type: Number,
        require: true
    },
    isActive: {
        type: Boolean,
        require: true
    } ,
    isUse: {
        type: Boolean,
        require: true
    } 
})

// module.exports=mongoose.model("Car", CarsSchema);
const CarModel=mongoose.model('Car', CarsSchema)
exports.CarModel=CarModel

