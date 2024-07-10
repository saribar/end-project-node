const express = require("express")
const router = express.Router()
// const Car = require("../models/cars");
const {updateCar,getAllCars,deleteCar,addCar} = require("../../controllers/Cars");

router.post('/', addCar);
router.put('/:carId', updateCar);
router.delete('/:carId', deleteCar);
router.get('/',getAllCars);
// router.get('/:numberOfSeats',getCarByNumberOfSeats);
module.exports = router