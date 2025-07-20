import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createUser } from '@/services/api';
import { Loader2 } from 'lucide-react';

export default function UserForm({ onUserAdded }) {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!name.trim()) {
      setError('Please enter a valid name');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const newUser = await createUser(name.trim());
      setName('');
      if (onUserAdded) onUserAdded(newUser);
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