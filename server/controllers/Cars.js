const {CarModel} = require('../schemas/cars');
const{add, update,get,deletee} = require('../services/cars');

exports.addCar = async(req,res)=>{
    console.log(req.body);
    try{
      add( req.body)
      res.json({ message: 'Added car successfully' });
    }catch(error){
      console.error(error);
      res.status(500).json({message: 'internal server error'});
    }
    

}

exports.deleteCar = async (req, res) => {
const carId  = req.params.carId;
  console.log(carId);
    try {
      const deletedCar = await CarModel.findOne({ carId: carId });
      if (!deletedCar) {
        return res.status(404).json({ message: 'Car not found' });
      }
      deletedCar.isActive=false;
      res.json({ message: 'Car deleted successfully' });
    } catch (error) {
      console.error('Failed to delete cars:', error);
      res.status(500).json({ message: 'Failed to delete user' });
    }
  };
  
  exports.getAllCars = async (req, res) => {
    try {
      const cars = await CarModel.find();
      res.json(cars);
    } catch (error) {
      console.error('Failed to get cars:', error);
      res.status(500).json({ message: 'Failed to get cars' });
    }
  };
  
  exports.updateCar = async (req, res) => {
    const { carId } = req.params;
    try {
        const updatedCar = await CarModel.findOne({ carId: carId });
      if (!updatedCar) {
        return res.status(404).json({ message: 'Car not found' });
      }
      const currentIsUse = updatedCar.isUse;
      const newIsUse = !currentIsUse;
      const updatedCarWithNewIsUse = await CarModel.findOneAndUpdate(
        { carId: carId },
        { isUse: newIsUse }
      );
      res.json(updatedCarWithNewIsUse);
    } catch (error) {
      console.error('Failed to update car:', error);
      res.status(500).json({ message: 'Failed to update car' });
    }
  };

  exports.getCarByNumberOfSeats = async (req, res) => {
    const numberOfSeats = req.params.numOfSeats;
  
    try {
        var findCar=await get(numberOfSeats);
        if (!findCar) {
          return res.status(404).json({ message: 'car not found' });
        }
        res.json(numberOfSeats);
      }
     catch (error) {
      console.error('Failed to get car:', error);
      res.status(500).json({ message: 'Failed to get car' });
      
    }
  };

