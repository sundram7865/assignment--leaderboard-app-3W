import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function UserDropdown({ 
  users = [], 
  selectedUser = "", 
  onSelect = () => {} 
}) {
  return (
    <Select value={selectedUser} onValueChange={onSelect}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a user" />
      </SelectTrigger>
      <SelectContent>
        {users?.length > 0 ? (
          users.map(user => (
            <SelectItem key={user.id} value={user.id}>
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