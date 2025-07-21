import { createContext, useContext, useState, useEffect } from 'react';

const LeaderboardContext = createContext();

export function LeaderboardProvider({ children }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [activities, setActivities] = useState([]);
  const [users, setUsers] = useState({}); // Store users as {id: user}

  // Fetch users from your API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users'); // Adjust your API endpoint
        const data = await response.json();
        

        const usersArray = data.data; // <-- FIX: access the actual user array

        const usersMap = usersArray.reduce((acc, user) => {
          acc[user._id] = user;
          return acc;
        }, {});
        setUsers(usersMap);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
  }, [refreshTrigger]);

  const triggerRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const addActivity = (activity) => {
    const newActivity = {
      ...activity,
      id: Date.now(),
      time: formatTime(new Date()),
      userId: activity.userId || activity.user?.id || activity.user
    };
    setActivities(prev => [newActivity, ...prev].slice(0, 10));
  };

  const formatTime = (date) => {
    const diff = Math.floor((new Date() - date) / 1000);
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    return `${Math.floor(diff / 3600)} hours ago`;
  };

  // Helper to get user by ID
  const getUserById = (userId) => {
    return users[userId] || { name: 'Anonymous' };
  };

  return (
    <LeaderboardContext.Provider value={{
      refreshTrigger,
      triggerRefresh,
      activities,
      addActivity,
      getUserById
    }}>
      {children}
    </LeaderboardContext.Provider>
  );
}

export const useLeaderboard = () => {
  const context = useContext(LeaderboardContext);
  if (!context) {
    throw new Error('useLeaderboard must be used within a LeaderboardProvider');
  }
  return context;
};
