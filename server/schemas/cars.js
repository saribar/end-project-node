const mongoose = require('mongoose')
const Joi = require("joi")

const CarSchema = new mongoose.Schema({
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
    },
    modelNumber: {
        type:String,
        require: true
    },
    carId:{
        type:String,
        require: true
    }
})

// module.exports=mongoose.model("Car", CarsSchema);
const CarModel=mongoose.model('Car', CarSchema)
exports.CarModel=CarModel

