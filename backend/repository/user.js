
const {models:{User}}=require('../models');
const {models:{Friends}}=require('../models')

exports.createUser=async(userData)=>{

    return await User.create(userData)

}

exports.getUser=async(data)=>{
  return await User.findOne({where:{login:data}})
}

exports.updateUser = async (userName, updatedData) => {
    const user = await User.findOne({where:{login:userName}});
    if (user) {
      return await user.update(updatedData);
    }
    throw new Error('User not found');
  };

  
exports.getUserByUserName=async(username)=>{
 
    const user= await User.findOne({ where: { login:username } });
    
  return user
  }


  exports.getUsersSortedByField = async (field) => {
    try {
      const order='ASC'
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


  exports.getFriends = async (userName) => {
    try {
      const user = await Friends.findOne({ where: { username: userName } });
      return user ? user.friendUsernames : null;
    } catch (error) {
      console.error('Error fetching friends:', error);
      throw error;
    }
  };


  exports.createOrUpdateFriends = async (userName, mutualFriends) => {
    try {
      const [friendsEntry, created] = await Friends.upsert({
        username: userName,
        friendUsernames: mutualFriends
      }, { returning: true });
      
      console.log(`Friends entry ${created ? 'created' : 'updated'} for user ${userName}`);
      
      return friendsEntry;
    } catch (error) {
      console.error('Error creating/updating friends entry:', error);
      throw error;
    }
  };
