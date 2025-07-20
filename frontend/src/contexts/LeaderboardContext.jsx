// src/contexts/LeaderboardContext.js
import { createContext, useContext, useState } from 'react';

const LeaderboardContext = createContext();

export function LeaderboardProvider({ children }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <LeaderboardContext.Provider value={{ refreshTrigger, triggerRefresh }}>
      {children}
    </LeaderboardContext.Provider>
  );
}

export  const useLeaderboard = () => {
  const context = useContext(LeaderboardContext);
  if (!context) {
    throw new Error('useLeaderboard must be used within a LeaderboardProvider');
  }
  return context;
};