import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserDropdown from "../users/UserDropdown";
import { claimPoints } from "@/services/api";
import { Loader2, Zap, CheckCircle } from 'lucide-react';
import { useLeaderboard } from '@/contexts/LeaderboardContext';
import { motion } from 'framer-motion';

/**
 * ClaimPointsCard Component
 *
 * Allows the user to select a user and claim a random number of points (1–10).
 * Includes success feedback and error handling with animation.
 * Also syncs with global leaderboard context to trigger data refresh and log activities.
 */
export default function ClaimPointsCard({ onPointsClaimed }) {
  const [selectedUserId, setSelectedUserId] = useState('');
  const [isClaiming, setIsClaiming] = useState(false);
  const [error, setError] = useState('');
  const [lastPointsWon, setLastPointsWon] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const { triggerRefresh, addActivity } = useLeaderboard();

  const handleClaimPoints = async () => {
    // Ensure a user is selected before claiming
    if (!selectedUserId) {
      setError('Please select a user first');
      return;
    }

    setError('');
    setIsClaiming(true);
    setShowSuccess(false);

    try {
      // Call backend to claim points
      const result = await claimPoints(selectedUserId);
      const points = result.data.points;

      setLastPointsWon(points);
      setShowSuccess(true);

      // Add action to global activity log
      addActivity({
        user: selectedUserId,
        action: `claimed ${points} points`
      });

      // Optional callback for parent component
      if (onPointsClaimed) onPointsClaimed(result);

      // Refresh leaderboard data
      triggerRefresh();

      // Reset success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to claim points');
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <Card className="relative overflow-hidden">
      {/* Subtle animated green background to indicate success */}
      {showSuccess && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          className="absolute inset-0 bg-green-500"
        />
      )}

      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-yellow-500" />
          <span>Claim Your Points</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* User selection dropdown */}
        <UserDropdown 
          selectedUser={selectedUserId}
          onSelect={setSelectedUserId}
        />

        {/* Claim points button */}
        <Button 
          onClick={handleClaimPoints}
          disabled={isClaiming || !selectedUserId}
          className="w-full transition-all"
          size="lg"
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

        {/* Error message if something fails */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-500 text-center p-2 bg-red-50 rounded-md"
          >
            {error}
          </motion.div>
        )}

        {/* Success message when points are claimed */}
        {showSuccess && lastPointsWon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center p-3 bg-green-50 rounded-md"
          >
            <div className="flex items-center justify-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">
                Awarded {lastPointsWon} points!
              </span>
            </div>
          </motion.div>
        )}

        {/* Instructional note */}
        <p className="text-sm text-muted-foreground text-center">
          Points will be awarded between 1–10 randomly
        </p>
      </CardContent>

     
    </Card>
  );
}
