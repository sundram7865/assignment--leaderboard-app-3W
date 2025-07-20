import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const activities = [
  { user: 'Alice', action: 'claimed 8 points', time: '2 min ago' },
  { user: 'Bob', action: 'claimed 5 points', time: '5 min ago' },
];

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center bg-muted rounded-full mr-3">
              {activity.user.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-medium">{activity.user}</span> {activity.action}
              </p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}