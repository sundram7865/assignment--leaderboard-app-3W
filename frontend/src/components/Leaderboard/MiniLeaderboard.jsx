import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import RankBadge from "./RankBadge";
import { useEffect, useState } from "react";
import { fetchTopUsers } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";

export default function MiniLeaderboard({ refreshFlag }) {  // Add refreshFlag prop
  const navigate = useNavigate();
  const [topPlayers, setTopPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTopPlayers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetchTopUsers(5);
        const players = Array.isArray(response?.data) ? response.data : [];
        setTopPlayers(players);
      } catch (error) {
        console.error("Failed to fetch top players:", error);
        setError("Failed to load leaderboard data");
        setTopPlayers([]);
      } finally {
        setLoading(false);
      }
    };

    loadTopPlayers();
  }, [refreshFlag]);  // Add refreshFlag as dependency

  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-0 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between px-6 pb-4 pt-6">
        <CardTitle className="text-2xl font-bold text-gray-800">
          Top Performers
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50"
          onClick={() => navigate("/leaderboard")}
        >
          View All →
        </Button>
      </CardHeader>
      <CardContent className="px-4 pb-6">
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center p-3 bg-white rounded-lg">
                <Skeleton className="h-9 w-9 rounded-full mr-3" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">{error}</div>
        ) : topPlayers.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No players found</div>
        ) : (
          <div className="space-y-3">
            {topPlayers.map((player, index) => (
              <div 
                key={player._id || index}
                className="flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mr-3">
                  <RankBadge rank={index + 1} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {player.name || `Player ${index + 1}`}
                  </p>
                  <p className="text-sm text-gray-500">
                    {player.totalPoints || 0} points
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <div className="h-10 w-10 flex items-center justify-center bg-indigo-100 rounded-full text-xl">
                    {player.name?.charAt(0) || "?"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}