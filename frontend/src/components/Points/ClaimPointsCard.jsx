import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserDropdown from "../users/UserDropdown";
import { claimPoints } from "@/services/api";
import { Loader2, Zap } from 'lucide-react';

export default function ClaimPointsCard({ onPointsClaimed, triggerRefresh }) {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [isClaiming, setIsClaiming] = useState(false);
  const [error, setError] = useState('');
  const [lastPointsWon, setLastPointsWon] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClaimPoints = async () => {
    if (!selectedUserId) {
      setError('Please select a user first');
      return;
    }

    setError('');
    setIsClaiming(true);
    setShowSuccess(false);

    try {
      const result = await claimPoints(selectedUserId);
      setLastPointsWon(result.data.points);
      setShowSuccess(true);
      
      if (onPointsClaimed) onPointsClaimed(result);
      if (triggerRefresh) triggerRefresh(); // Trigger leaderboard refresh
      
      // Reset success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to claim points');
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Claim Your Points</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <UserDropdown 
          selectedUser={selectedUserId}
          onSelect={setSelectedUserId}
        />
        
        <Button 
          onClick={handleClaimPoints}
          disabled={isClaiming || !selectedUserId}
          className="w-full"
        >
          {isClaiming ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Claiming...
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span>Claim Random Points</span>
            </div>
          )}
        </Button>
        
        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}
        
        {showSuccess && lastPointsWon && (
          <div className="text-center animate-pulse">
            <p className="text-sm font-medium text-green-600">
              Success! Awarded {lastPointsWon} points!
            </p>
          </div>
        )}
        
        <p className="text-sm text-muted-foreground text-center">
          Points will be awarded between 1-10 randomly
        </p>
      </CardContent>
    </Card>
  );
}