import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useLeaderboard } from '@/contexts/LeaderboardContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function RecentActivity() {
  const { activities, getUserById } = useLeaderboard();

  return (
    <Card className="h-full">
      {/* Card Header */}
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="space-y-3">
        <AnimatePresence>
          {activities.map((activity) => {
            const user = getUserById(activity.userId);
            const userInitial = user.name.charAt(0).toUpperCase();

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition"
              >
                {/* Avatar Circle */}
                <div className="w-9 h-9 flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mr-3">
                  <span className="font-medium text-blue-600 text-sm">
                    {userInitial}
                  </span>
                </div>

                {/* Activity Text */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">
                    <span className="font-medium">{user.name}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">
                    {activity.time}
                  </p>
                </div>

                {/* Active Dot Animation */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-2 h-2 bg-green-400 rounded-full ml-2"
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
