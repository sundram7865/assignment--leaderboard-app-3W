// src/pages/UsersPage.jsx
import { useEffect, useState } from 'react';
import { Card } from '../components/ui/card';
import UserForm from '../components/users/UserForm';
import UserDropdown from '../components/users/UserDropdown';
import { fetchUsers, createUser } from '../services/api';
import { Button } from '../components/ui/button';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch users from backend
  const loadUsers = async () => {
    try {
      const { data } = await fetchUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to load users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle new user submission
  const handleAddUser = async (newUser) => {
    try {
      const { data } = await createUser(newUser.name);
      setUsers([...users, data]);
    } catch (error) {
      console.error("Failed to create user:", error.response?.data?.message);
    }
  };

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Add New User</h2>
        <UserForm onSubmit={handleAddUser} />
      </Card>
      
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Select User</h2>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={loadUsers}
          >
            Refresh
          </Button>
        </div>
        <UserDropdown 
          users={users} 
          selectedUser={selectedUser} 
          onSelect={setSelectedUser} 
        />
      </Card>
    </div>
  );
}
