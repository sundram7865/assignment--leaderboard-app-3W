// src/pages/UsersPage.jsx

import { useEffect, useState } from 'react';
import { Card } from '../components/ui/card';
import UserForm from '../components/users/UserForm';
import UserDropdown from '../components/users/UserDropdown';
import { fetchUsers, createUser } from '../services/api';
import { Button } from '../components/ui/button';

/**
 * UsersPage
 * 
 * This page allows the admin/user to:
 * 1. Add a new user to the system
 * 2. Select a user from the existing user list
 * 
 * Features:
 * - Displays a form to add users
 * - Shows a dropdown to choose a user
 * - Fetches user data from the backend API
 */
export default function UsersPage() {
  const [users, setUsers] = useState([]); // All available users
  const [selectedUser, setSelectedUser] = useState(''); // Currently selected user
  const [loading, setLoading] = useState(true); // Controls loading state

  // Fetch all users from the API
  const loadUsers = async () => {
    try {
      const { data } = await fetchUsers(); // API call to get users
      setUsers(data);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle submission of a new user via the form
  const handleAddUser = async (newUser) => {
    try {
      const { data } = await createUser(newUser.name); // API call to create user
      setUsers([...users, data]); // Append the new user to the existing list
    } catch (error) {
      console.error('Failed to create user:', error.response?.data?.message);
    }
  };

  // Run once when the component is mounted to load user data
  useEffect(() => {
    loadUsers();
  }, []);

  // Show loading indicator while fetching user list
  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Section to add a new user */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Add New User</h2>
        <UserForm onSubmit={handleAddUser} />
      </Card>
      
      {/* Section to select an existing user */}
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
