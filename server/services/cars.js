const { CarModel } = require('../schemas/cars');

exports.deletee= async (carId) => { 
 try {
   var deletedCar = await CarModel.findOneAndDelete({carId: carId});
   return deletedCar
    
  } catch (error) {
    console.error('Failed to delete car:', error);
  }
};

exports.get = async (carId) => {

  try {
    var findCar = await CarModel.findOne({ carId:carId });
    return findCar;
  } catch (error) {
    console.error('Failed to get car ,services:', error);
    
  }
};


exports.add = async (reqBody) => {

  try {

    var cars=await CarModel.create(reqBody);
    return cars;

  } catch (error) {
    console.error(error);
  }

}

exports.update = async (carId, reqBody) => {

  const { modelNumber, isUse, isActive, numberOfSeats, type } = reqBody;

  try {
   
    const updatedCar = await CarModel.findOneAndUpdate(
      { carId: carId },
      { modelNumber, isUse, isActive, numberOfSeats, type },
      { new: true }
    );

    return updatedCar;
  
  } catch (error) {
    console.error('Failed to update car:', error);
  }
};

