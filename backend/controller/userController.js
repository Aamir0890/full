const userService=require('../services/user')

exports.createUser = async (req, res) => {
    try {
      const { username } = req.params; 

      const user = await userService.getUserByUsername(username);
  
      res.status(200).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    }
  };

  exports.updateUser = async (req, res) => {
    try {
      const { username } = req.params; 
      const data = req.body; 
  
      const updatedUser = await userService.updateUser(username, data);
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  };

  exports.deleteUser = async (req, res) => {
    try {
      const { username } = req.params; 
  
      const result = await userService.deleteUser(username);
      if (!result) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Failed to delete user' });
    }
  };

  exports.sortUsers = async (req, res) => {
    try {
      const { field } = req.query; 
  
      if (!field) {
        return res.status(400).json({ error: 'Sorting field is required' });
      }
  
      const sortedUsers = await userService.sortUsers(field);
      res.status(200).json(sortedUsers);
    } catch (error) {
      console.error('Error sorting users:', error);
      res.status(500).json({ error: 'Failed to sort users' });
    }
  };