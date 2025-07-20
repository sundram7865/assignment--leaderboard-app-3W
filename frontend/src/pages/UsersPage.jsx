// src/pages/UsersPage.jsx
import UserForm from '../components/users/UserForm'
import UserDropdown from '../components/users/UserDropdown'
import {Card} from '../components/ui/Card'

export default function UsersPage() {
  const [users, setUsers] = React.useState([
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' }
  ])
  const [selectedUser, setSelectedUser] = React.useState('')

  const handleAddUser = (newUser) => {
    setUsers([...users, { id: Date.now().toString(), name: newUser.name }])
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      <Card>
        <h2 className="text-xl font-bold mb-4">Add New User</h2>
        <UserForm onSubmit={handleAddUser} />
      </Card>
      <Card>
        <h2 className="text-xl font-bold mb-4">Select User</h2>
        <UserDropdown 
          users={users} 
          selectedUser={selectedUser} 
          onSelect={setSelectedUser} 
        />
      </Card>
    </div>
  )
}