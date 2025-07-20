import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTopUsers } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
import { useLeaderboard } from "@/contexts/LeaderboardContext.jsx";
import { FaCoins } from "react-icons/fa";
import clsx from "clsx";

const medalColors = ["bg-yellow-400", "bg-gray-300", "bg-orange-400"];

export default function MiniLeaderboard() {
  const navigate = useNavigate();
  const [topPlayers, setTopPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { refreshTrigger } = useLeaderboard();

  useEffect(() => {
    const loadTopPlayers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchTopUsers(10);
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
  }, [refreshTrigger]);

  return (
    <Card className="bg-gradient-to-br from-pink-50 to-orange-50 border-0 shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between px-6 pb-4 pt-6">
        <CardTitle className="text-3xl font-extrabold text-gray-800 tracking-tight">
          🏆 Today's Top
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-pink-600 hover:text-pink-800 hover:bg-pink-100"
          onClick={() => navigate("/leaderboard")}
        >
          View All →
        </Button>
      </CardHeader>

      <CardContent className="px-4 pb-6">
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-white rounded-xl shadow-sm">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-6 w-10 rounded-md" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">{error}</div>
        ) : topPlayers.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No players found</div>
        ) : (
          <div className="space-y-3">
            {topPlayers.map((player, index) => {
              const isTop3 = index < 3;
              return (
                <div
                  key={player._id || index}
                  className={clsx(
                    "flex items-center gap-4 p-3 rounded-xl transition-all duration-200 shadow hover:shadow-md",
                    isTop3 ? "bg-white border-2 border-yellow-100" : "bg-white"
                  )}
                >
                  <div className="relative">
                    <img
                      src={`https://api.dicebear.com/8.x/adventurer/svg?seed=${player.name}`}
                      alt={player.name}
                      className={clsx("h-12 w-12 rounded-full border-2", isTop3 ? medalColors[index] : "border-gray-300")}
                    />
                    {isTop3 && (
                      <span
                        className={clsx(
                          "absolute -top-2 -right-2 text-xs font-bold px-1.5 py-0.5 rounded-full text-white",
                          index === 0
                            ? "bg-yellow-500"
                            : index === 1
                            ? "bg-gray-400"
                            : "bg-orange-500"
                        )}
                      >
                        {index + 1}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{player.name}</p>
                    <p className="text-sm text-gray-500">{player.totalPoints} pts</p>
                  </div>

                  <div className="flex items-center gap-1 text-yellow-500 font-bold text-lg">
                    <FaCoins />
                    {player.totalPoints}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
