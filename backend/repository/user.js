const {models:{User}}=require('../models');


exports.createUser=async(userData)=>{

    return await User.create(userData)

}


exports.updateUser = async (userName, updatedData) => {
    const user = await User.findOne({where:{userName}});
    if (user) {
      return await user.update(updatedData);
    }
    throw new Error('User not found');
  };

  

exports.getUserByUserName=async(username)=>{
 
    const user= await User.findOne({ where: { login:username } });
    
  return user
  }


  exports.getUsersSortedByField = async (field, order = 'ASC') => {
    try {
      
      const validFields = ['public_repos', 'public_gists', 'followers', 'following', 'created_at'];
      if (!validFields.includes(field)) {
        throw new Error('Invalid field for sorting.');
      }
  
     
      const validOrders = ['ASC', 'DESC'];
      if (!validOrders.includes(order.toUpperCase())) {
        throw new Error('Invalid order specified.');
      }
  
    
      const users = await User.findAll({
        order: [[field, order.toUpperCase()]]
      });
  
      return users;
    } catch (error) {
      console.error('Error retrieving users:', error);
      throw error;
    }
  };

  exports.deleteUser=async(userName)=>{
    const user = await User.findOne({ where: { login:userName } });
  if (user) {
    await user.destroy();
    return user;
  }
  throw new Error('User not found');
  }