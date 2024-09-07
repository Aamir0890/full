import React, { createContext, useContext, useState, useCallback } from 'react';

const GitHubContext = createContext();

export const useGitHubContext = () => useContext(GitHubContext);

export const GitHubProvider = ({ children }) => {
  const [users, setUsers] = useState({});
  const [repos, setRepos] = useState({});

  const addUser = useCallback((username, userData) => {
    setUsers(prevUsers => ({ ...prevUsers, [username]: userData }));
  }, []);


  const addRepos = useCallback((username, reposData) => {
    setRepos(prevRepos => ({ ...prevRepos, [username]: reposData }));
  }, []);
   
  const value = {
    users,
    repos,
    addUser,
    addRepos
  };

  return (
    <GitHubContext.Provider value={value}>
      {children}
    </GitHubContext.Provider>
  );
};