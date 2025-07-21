import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { claimPoints } from '@/services/api';

/**
 * ClaimButton Component
 * Allows a user to claim random points by interacting with the backend.
 *
 * Props:
 * - userId: the currently selected user's ID
 * - onPointsClaimed: callback to update parent component with claimed points
 */
export default function ClaimButton({ userId, onPointsClaimed }) {
  const [isClaiming, setIsClaiming] = useState(false); // Loading state
  const [error, setError] = useState('');               // Error state

  /**
   * Handles the click action to claim points.
   * Validates user, triggers API, manages loading/error states.
   */
  const handleClick = async () => {
    if (!userId) {
      setError('Please select a user first');
      return;
    }

    setError('');
    setIsClaiming(true);

    try {
      const result = await claimPoints(userId); // Call backend API
      if (onPointsClaimed) onPointsClaimed(result); // Callback to parent
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to claim points');
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div className="space-y-2">
      <Button
        onClick={handleClick}
        disabled={isClaiming || !userId}
        className="w-full"
      >
        {isClaiming ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Claiming...
          </>
        ) : (
          '🎯 Claim Points'
        )}
      </Button>

      {/* Display error message if any */}
      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
    </div>
  );
}
