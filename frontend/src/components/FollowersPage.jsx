import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useGitHubContext } from '../../context/GithubContext';
import axios from 'axios';

const FollowersPage = () => {
  const { username } = useParams();
  const history = useHistory();
  const { users, addUser } = useGitHubContext();
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchFollowers = async () => {
      if (!users[username]?.followers_data) {
        setLoading(true);
        try {
          
          const response = await axios.post(`http://localhost:8000/friends/${username}`);
          const data = await response.json();
          
         
          setFollowers(data);
          addUser(username, { ...users[username], followers_data: data });
        } catch (error) {
          console.error('Error fetching followers:', error);
        }
        setLoading(false);
      } else {
       
        setFollowers(users[username].followers_data);
      }
    };
  
    fetchFollowers();
  }, [username, users, addUser]);
  

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={() => history.goBack()} style={{ marginBottom: '20px', padding: '10px', fontSize: '16px' }}>
        Back
      </button>
      <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Followers of {username}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {followers.map((follower) => (
          <div key={follower.id} style={{ border: '1px solid #e1e4e8', borderRadius: '6px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={follower.avatar_url} alt={follower.login} style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} />
              <Link to={`/user/${follower.login}`} style={{ textDecoration: 'none', color: '#0366d6' }}>
                <span style={{ fontWeight: 'bold' }}>{follower.login}</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowersPage;