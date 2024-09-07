const { default: axios } = require('axios')
const userRepository=require('../repository/user')


exports.getUserByUsername=async(username)=>{
    try {
        
        let user = await userRepository.getUserByUserName(username);
       
        if (!user) {
          console.log('API called');
          const response = await axios.get(`https://api.github.com/users/${username}`);
          user = response.data; 
          
          
          const simplifiedUser = {
            login: user.login,
            id: user.id,
            node_id: user.node_id,
            avatar_url: user.avatar_url,
            url: user.url,
            html_url: user.html_url,
            followers_url: user.followers_url,
            following_url: user.following_url,
            gists_url: user.gists_url,
            starred_url: user.starred_url,
            subscriptions_url: user.subscriptions_url,
            organizations_url: user.organizations_url,
            repos_url: user.repos_url,
            events_url: user.events_url,
            received_events_url: user.received_events_url,
            type: user.type,
            site_admin: user.site_admin,
            name: user.name,
            company: user.company,
            blog: user.blog,
            location: user.location,
            email: user.email,
            hireable: user.hireable,
            bio: user.bio,
            twitter_username: user.twitter_username,
            public_repos: user.public_repos,
            public_gists: user.public_gists,
            followers: user.followers,
            following: user.following,
            created_at: user.created_at,
            updated_at: user.updated_at
          };
          
    
          
          await userRepository.createUser(simplifiedUser);
        }
        
        return user;
      } catch (error) {
        
        console.error('Error fetching user:', {
          message: error.message,
          stack: error.stack
        });
        throw error; 
      }
}

exports.updateUser=async(username,data)=>{
    const user=await userRepository.updateUser(username,data)
    return user;
}

exports.deleteUser=async(username)=>{
    return await userRepository.deleteUser(username)
}

exports.sortUsers=async(data)=>{
    return await userRepository.getUsersSortedByField(data);
}


exports.processFriends = async (userName) => {
  try {
    
    const existingFriends = await userRepository.getFriends(userName);
    
    if (existingFriends && existingFriends.length > 0) {
      console.log(`Friends list for ${userName} already exists in the database.`);
      return { username: userName, friendUsernames: existingFriends };
    }

    
    let user = await userRepository.getUser(userName);
    
   
    if (!user) {
      console.log(`User ${userName} not found in database. Fetching from GitHub API.`);
      try {
        const userResponse = await axios.get(`https://api.github.com/users/${userName}`);
        user = userResponse.data;
       
      } catch (apiError) {
        console.error('Error fetching user data from GitHub API:', apiError);
        throw new Error(`User ${userName} not found in database or GitHub`);
      }
    }

   
    let mutualFriends = [];
    if (user && user.followers_url) {
      try {
        const followersResponse = await axios.get(user.followers_url);
        const followers = followersResponse.data.map(follower => follower.login);

        const followingUrl = user.following_url.replace('{/other_user}', '');
        const followingResponse = await axios.get(followingUrl);
        const following = followingResponse.data.map(follow => follow.login);
        
        mutualFriends = followers.filter(follower => following.includes(follower));
        console.log(mutualFriends)
      } catch (apiError) {
        console.error('Error fetching follower data from GitHub API:', apiError);
        
      }
    } else {
      console.log(`Unable to fetch follower data for ${userName}.`);
    }

    // Create or update friends in the database
    const friendsEntry = await userRepository.createOrUpdateFriends(userName, mutualFriends);

    return friendsEntry;
  } catch (error) {
    console.error('Error processing friends:', error);
    throw error;
  }
};