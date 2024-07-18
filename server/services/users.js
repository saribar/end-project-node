const { UserModel } = require('../schemas/user');

exports.deletee= async (userId) => { 
 try {
   var deletedUser = await UserModel.findOneAndDelete({userId: userId});
   return deletedUser
    
    
  } catch (error) {
    console.error('Failed to delete user:', error);
   
  }
};

exports.get = async (userId) => {

  try {
    var findUser = await UserModel.findOne({ userId:userId });
    return findUser;
  } catch (error) {
    console.error('Failed to get user ,services:', error);
    
  }
};


exports.add = async (reqBody) => {

  try {

    var users=await UserModel.create(reqBody);
    return users;

  } catch (error) {
    console.error(error);
  }

}

exports.update = async (userId, reqBody) => {

  const { name, email, phone } = reqBody;

  try {
   
    const updatedUser = await UserModel.findOneAndUpdate(
      { userId: userId },
      { name, email, phone },
      { new: true }
    );

    return updatedUser;
  
  } catch (error) {
    console.error('Failed to update user:', error);
  }
};

