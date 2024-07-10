const mongoose = require('mongoose')
const Joi = require("joi")

const CarsSchema = new mongoose.Schema({
    type: String,
    numberOfSeats: Number,
    isActive: Boolean,
    isUse: Boolean
})

const CarModel=mongoose.model('Car', CarsSchema)
exports.CarModel=CarModel

