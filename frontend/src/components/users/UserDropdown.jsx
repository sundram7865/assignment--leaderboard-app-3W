import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { fetchUsers } from "@/services/api";

// UserDropdown component handles fetching and displaying users in a dropdown list
export default function UserDropdown({
  selectedUser = "",        // Currently selected user ID (if any)
  onSelect = () => {},      // Callback function to notify parent of selected user
  className = "",           // Optional extra styling class
}) {
  const [users, setUsers] = useState([]);           // Stores fetched user list
  const [isLoading, setIsLoading] = useState(false); // Indicates loading state
  const [error, setError] = useState("");           // Holds any API error messages

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Show loading spinner
      try {
        const response = await fetchUsers();
        setUsers(response.data || []); // Set users from API response
      } catch (err) {
        // Fallback error message in case of failure
        setError(err.response?.data?.message || "Failed to load users");
        console.error("User fetch error:", err);
      } finally {
        setIsLoading(false); // Hide loading spinner
      }
    };

    fetchData();
  }, []);

  // Handles user selection and passes both userId and name to parent
  const handleSelect = (userId) => {
    const selected = users.find((u) => u._id === userId);
    if (selected) {
      onSelect(userId, selected.name); // Pass both user ID and user name
    }
  };

  return (
    <Select
      value={selectedUser}               // Controlled select component
      onValueChange={handleSelect}      // Handle selection change
      disabled={isLoading}              // Disable interaction while loading
    >
      <SelectTrigger className={`w-full ${className}`}>
        {isLoading ? (
          // Show spinner while loading users
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading...</span>
          </div>
        ) : (
          // Placeholder text or selected user name
          <SelectValue placeholder="Select a user" />
        )}
      </SelectTrigger>

      <SelectContent>
        {error ? (
          // Show error message inside dropdown if user fetch failed
          <SelectItem disabled value="error">
            ❌ {error}
          </SelectItem>
        ) : users.length > 0 ? (
          // Render list of users
          users.map((user) => (
            <SelectItem key={user._id} value={user._id}>
              {user.name}
            </SelectItem>
          ))
        ) : (
          // Message when no users are available
          <SelectItem disabled value="no-users">
            No users available
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}
