import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { fetchUsers } from "@/services/api";

export default function UserDropdown({ 
  selectedUser = "", 
  onSelect = () => {}, 
  className = "" 
}) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError("");
      
      try {
        const response = await fetchUsers();
        setUsers(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load users");
        console.error("API Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Modified to pass both ID and name when a user is selected
  const handleSelect = (userId) => {
    const selected = users.find(user => user._id === userId);
    if (selected) {
      onSelect(userId, selected.name); // Pass both ID and name
    }
  };

  return (
    <Select 
      value={selectedUser} 
      onValueChange={handleSelect} // Use our custom handler
      disabled={isLoading}
    >
      <SelectTrigger className={`w-full ${className}`}>
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading users...</span>
          </div>
        ) : (
          <SelectValue placeholder="Select a user">
            {users.find(user => user._id === selectedUser)?.name || "Select a user"}
          </SelectValue>
        )}
      </SelectTrigger>
      
      <SelectContent>
        {error ? (
          <SelectItem disabled value="error">
            ❌ {error}
          </SelectItem>
        ) : users.length > 0 ? (
          users.map(user => (
            <SelectItem key={user._id} value={user._id}>
              {user.name}
            </SelectItem>
          ))
        ) : (
          <SelectItem disabled value="no-users">
            No users available
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}