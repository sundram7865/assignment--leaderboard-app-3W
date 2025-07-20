export default function UserDropdown({ users, selectedUser, onSelect }) {
  return (
    <select
      value={selectedUser}
      onChange={(e) => onSelect(e.target.value)}
      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
    >
      <option value="">Select a user</option>
      {users.map(user => (
        <option key={user.id} value={user.id}>{user.name}</option>
      ))}
    </select>
  )
}