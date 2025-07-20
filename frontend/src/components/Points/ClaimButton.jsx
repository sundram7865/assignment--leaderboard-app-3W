import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { claimPoints } from '@/services/api';

export default function ClaimButton({ userId, onPointsClaimed }) {
  const [isClaiming, setIsClaiming] = useState(false);
  const [error, setError] = useState('');

  const handleClick = async () => {
    if (!userId) {
      setError('Please select a user first');
      return;
    }

    setError('');
    setIsClaiming(true);

    try {
      const result = await claimPoints(userId);
      if (onPointsClaimed) onPointsClaimed(result);
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
      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
    </div>
  );
}