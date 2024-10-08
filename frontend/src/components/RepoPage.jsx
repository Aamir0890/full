import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useGitHubContext } from '../../context/GithubContext';

const RepoPage = () => {
  const { username, repo: repoName } = useParams();
  const history = useHistory();
  const { repos } = useGitHubContext();
   
  const repo = repos[username]?.find(r => r.name === repoName);

  if (!repo) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={() => history.goBack()} style={{ marginBottom: '20px', padding: '10px', fontSize: '16px' }}>
        Back
      </button>
      <div style={{ border: '1px solid #e1e4e8', borderRadius: '6px', padding: '20px' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>{repo.name}</h2>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <img 
            src={repo.owner.avatar_url} 
            alt={`${repo.owner.login}'s avatar`} 
            style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }} 
          />
          <p style={{ color: '#586069' }}>by {repo.owner.login}</p>
        </div>
        <p style={{ marginBottom: '20px' }}>{repo.description}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Stats</h3>
            <p>⭐ Stars: {repo.stargazers_count}</p>
            <p>👀 Watchers: {repo.watchers_count}</p>
            <p>🍴 Forks: {repo.forks_count}</p>
          </div>
          <div>
            <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>Details</h3>
            <p>Language: {repo.language}</p>
            <p>Created: {new Date(repo.created_at).toLocaleDateString()}</p>
            <p>Last updated: {new Date(repo.updated_at).toLocaleDateString()}</p>
          </div>
        </div>
        <a 
          href={repo.html_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ 
            padding: '10px 20px', 
            fontSize: '16px', 
            backgroundColor: '#0366d6', 
            color: 'white', 
            textDecoration: 'none', 
            display: 'inline-block', 
            marginRight: '10px' 
          }}
        >
          View on GitHub
        </a>
        <button
          onClick={() => window.open(repo.html_url, '_blank')}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#28a745', // Light green button
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'none'
          }}
        >
          Go to GitHub Repo
        </button>
      </div>
    </div>
  );
};

export default RepoPage;
