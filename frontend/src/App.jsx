import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GitHubProvider } from '../context/GithubContext';
import Home from './components/Home';
import UserPage from './components/UserPage';
import RepoPage from './components/RepoPage';
import FollowersPage from './components/FollowersPage';

const App = () => {
  return (
    <GitHubProvider>
      <Router>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/user/:username" component={UserPage} />
            <Route path="/repo/:username/:repo" component={RepoPage} />
            <Route path="/followers/:username" component={FollowersPage} />
          </Switch>
        </div>
      </Router>
    </GitHubProvider>
  );
};

export default App;