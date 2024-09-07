import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const [username, setUsername] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username) {
      history.push(`/user/${username}`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>GitHub Explorer</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', width: '100%', maxWidth: '400px' }}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ flex: 1, marginRight: '10px', padding: '10px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', backgroundColor: '#0366d6', color: 'white', border: 'none', cursor: 'pointer' }}>
          Search
        </button>
      </form>
    </div>
  );
};

export default Home;