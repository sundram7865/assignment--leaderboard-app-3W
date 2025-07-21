import { createContext, useContext, useState, useEffect } from 'react';

// Create the context to share leaderboard data across components
const LeaderboardContext = createContext();

/**
 * LeaderboardProvider - wraps the app and manages leaderboard-related state
 */
export function LeaderboardProvider({ children }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);         // Used to trigger re-fetch of users
  const [activities, setActivities] = useState([]);                 // Stores recent activity logs
  const [users, setUsers] = useState({});                           // Stores users in a map format {id: user}

  /**
   * Fetches all users from the backend API and stores them in a map
   */
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');                 // API endpoint to fetch all users
        const data = await response.json();

        const usersArray = data.data;                               // Access the user array from response

        // Convert array of users into a map for faster access by ID
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
  }, [refreshTrigger]); // Re-fetch users whenever refreshTrigger changes

  /**
   * Updates the trigger to refetch data
   */
  const triggerRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  /**
   * Adds a new activity to the activity log (max 10 entries)
   */
  const addActivity = (activity) => {
    const newActivity = {
      ...activity,
      id: Date.now(),                                               // Generate unique ID for activity
      time: formatTime(new Date()),                                 // Human-readable time string
      userId: activity.userId || activity.user?.id || activity.user // Normalize user ID
    };

    // Add to top and trim to max 10 items
    setActivities((prev) => [newActivity, ...prev].slice(0, 10));
  };

  /**
   * Returns a human-friendly time difference (e.g., "just now", "5 min ago")
   */
  const formatTime = (date) => {
    const diff = Math.floor((new Date() - date) / 1000); // Difference in seconds

    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    return `${Math.floor(diff / 3600)} hours ago`;
  };

  /**
   * Retrieves a user object by their ID
   */
  const getUserById = (userId) => {
    return users[userId] || { name: 'Anonymous' }; // Fallback for unknown users
  };

  return (
    <LeaderboardContext.Provider
      value={{
        refreshTrigger,
        triggerRefresh,
        activities,
        addActivity,
        getUserById
      }}
    >
      {children}
    </LeaderboardContext.Provider>
  );
}

/**
 * Custom hook to use leaderboard context in any component
 */
export const useLeaderboard = () => {
  const context = useContext(LeaderboardContext);
  if (!context) {
    throw new Error('useLeaderboard must be used within a LeaderboardProvider');
  }
  return context;
};
