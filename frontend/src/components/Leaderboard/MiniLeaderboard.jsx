import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

const topPlayers = [
  { name: 'Alice Johnson', score: 245, avatar: '👩‍💻' },
  { name: 'Bob Smith', score: 198, avatar: '👨‍🔧' },
  { name: 'Charlie Brown', score: 187, avatar: '👨‍🎨' },
];

export default function MiniLeaderboard() {
    const navigate = useNavigate();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Top Players</CardTitle>
        <Button
  variant="ghost"
  size="sm"
  onClick={() => navigate("/leaderboard")}
>
  View All
</Button>

      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {topPlayers.map((player, index) => (
              <div key={player.name} className="flex items-center">
                <div className="w-8 h-8 flex items-center justify-center bg-muted rounded-full mr-4">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{player.name}</p>
                  <p className="text-sm text-muted-foreground">{player.score} points</p>
                </div>
                <div className="text-xl">{player.avatar}</div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}