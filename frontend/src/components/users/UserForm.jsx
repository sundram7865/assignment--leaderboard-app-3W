import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createUser } from '@/services/api';
import { Loader2 } from 'lucide-react';
import { useLeaderboard } from '@/contexts/LeaderboardContext.jsx';

// This component handles user creation and leaderboard refresh
export default function UserForm({ onUserAdded }) {
  const [name, setName] = useState("");                 // Controlled input for user's name
  const [isSubmitting, setIsSubmitting] = useState(false); // Tracks form submission state
  const [error, setError] = useState("");               // Error message display
  const [success, setSuccess] = useState(false);        // Success feedback toggle

  const { triggerRefresh } = useLeaderboard();          // Context method to refresh leaderboard

  // Handles form submission logic
  const handleSubmit = async (e) => {
    e.preventDefault();              // Prevent default page reload
    setError("");                    // Clear previous error
    setSuccess(false);              // Reset previous success

    if (!name.trim()) {
      setError("Please enter a valid name");
      return;
    }

    setIsSubmitting(true); // Disable form during async operation

    try {
      const newUser = await createUser(name.trim()); // Send name to API
      setName("");              // Clear input
      setSuccess(true);         // Show success message
      if (onUserAdded) onUserAdded(newUser); // Optional callback
      triggerRefresh();         // Refresh leaderboard UI

      // Auto-hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      // Display API or fallback error
      setError(err.response?.data?.message || "Failed to create user");
    } finally {
      setIsSubmitting(false); // Re-enable form
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)} // Update name state
          placeholder="Enter user name"
          disabled={isSubmitting} // Disable input while submitting
          required
        />
        {/* Error message */}
        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* Success feedback */}
        {success && (
          <p className="text-sm text-green-500">
            User created successfully! The leaderboard will update shortly.
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button 
        type="submit" 
        disabled={isSubmitting || !name.trim()} // Disable if empty or submitting
        className="w-full"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating...
          </>
        ) : (
          "Add User"
        )}
      </Button>
    </form>
  );
}
