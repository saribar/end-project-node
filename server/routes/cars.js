const express = require("express")
const router = express.Router()
const {updateCar,getAllCars,deleteCar,addCar} = require("..//controllers/Cars");

router.post('/', addCar);
router.put('/:carId', updateCar);
router.delete('/:carId', deleteCar);
router.get('/',getAllCars);
module.exports = router