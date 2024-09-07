import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useGitHubContext } from '../../context/GithubContext';
import axios from 'axios';

const UserPage = () => {
  const { username } = useParams();
  const history = useHistory();
  const { users, repos, addUser, addRepos } = useGitHubContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserAndRepos = async () => {
      if (!users[username] || !repos[username]) {
        setLoading(true);
        try {
          if (!users[username]) {
            const userResponse = await axios.post(`http://localhost:8000/api/users/${username}`);
            console.log(userResponse.data);
            const userData = userResponse.data;
            addUser(username, userData);
          
            // Fetch repos using the repos_url from userData (not users[username])
            if (!repos[username] && userData.repos_url) {
              const reposResponse = await axios.get(userData.repos_url); // Use userData.repos_url here
              const reposData = reposResponse.data; // You don't need .json() with axios, it automatically parses JSON
              addRepos(username, reposData);
            }
          } else if (!repos[username]) {
            // This branch handles the case where the user exists but repos are not yet fetched
            const reposResponse = await axios.get(users[username].repos_url); // If users[username] exists, use repos_url from it
            const reposData = reposResponse.data;
            addRepos(username, reposData);
          }
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
        setLoading(false);
      }
    };

    fetchUserAndRepos();
  }, [username, users, repos, addUser, addRepos]);

  if (loading || !users[username] || !repos[username]) return <div>Loading...</div>;

  const user = users[username];
  const userRepos = repos[username];

  return (
    <div>
      <button onClick={() => history.push('/')} style={{ marginBottom: '20px', padding: '10px', fontSize: '16px' }}>
        Back to Search
      </button>
      <div style={{ display: 'flex', marginBottom: '20px', padding: '20px', border: '1px solid #e1e4e8', borderRadius: '6px' }}>
        <img src={user.avatar_url} alt={user.name} style={{ width: '100px', height: '100px', borderRadius: '50%', marginRight: '20px' }} />
        <div>
          <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>{user.name}</h2>
          <p style={{ color: '#586069', marginBottom: '10px' }}>@{user.login}</p>
          <p style={{ marginBottom: '10px' }}>{user.bio}</p>
          <div style={{ marginBottom: '10px' }}>
            <span style={{ marginRight: '20px' }}>Followers: {user.followers}</span>
            <span>Following: {user.following}</span>
          </div>
          <Link to={`/followers/${username}`} style={{ textDecoration: 'none', color: '#0366d6' }}>
            View Followers
          </Link>
        </div>
      </div>
      <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Repositories</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {userRepos.map((repo) => (
          <div key={repo.id} style={{ border: '1px solid #e1e4e8', borderRadius: '6px', padding: '20px' }}>
            <Link to={`/repo/${username}/${repo.name}`} style={{ textDecoration: 'none', color: '#0366d6' }}>
              <h4 style={{ fontSize: '18px', marginBottom: '10px' }}>{repo.name}</h4>
            </Link>
            <p style={{ fontSize: '14px', color: '#586069', marginBottom: '10px' }}>{repo.description}</p>
            <div style={{ fontSize: '14px' }}>
              <span style={{ marginRight: '20px' }}>⭐ {repo.stargazers_count}</span>
              <span>🍴 {repo.forks_count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;