import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createUser } from '@/services/api';
import { Loader2 } from 'lucide-react';
import { useLeaderboard } from '@/contexts/LeaderboardContext.jsx';

export default function UserForm({ onUserAdded }) {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { triggerRefresh } = useLeaderboard(); // Get refresh function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    if (!name.trim()) {
      setError('Please enter a valid name');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const newUser = await createUser(name.trim());
      setName('');
      setSuccess(true);
      if (onUserAdded) onUserAdded(newUser);
      triggerRefresh(); // Trigger leaderboard refresh
      
      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create user');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter user name"
          disabled={isSubmitting}
          required
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && (
          <p className="text-sm text-green-500">
            User created successfully! The leaderboard will update shortly.
          </p>
        )}
      </div>
      <Button 
        type="submit" 
        disabled={isSubmitting || !name.trim()}
        className="w-full"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating...
          </>
        ) : 'Add User'}
      </Button>
    </form>
  );
}