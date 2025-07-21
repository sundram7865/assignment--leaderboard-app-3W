// src/pages/HomePage.jsx
import ClaimPointsCard from '../components/Points/ClaimPointsCard';
import MiniLeaderboard from '../components/Leaderboard/MiniLeaderboard';
import RecentActivity from '../components/activity/RecentActivity';

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-6">
        <ClaimPointsCard />
        <RecentActivity />
      </div>
      <div className="lg:col-span-2">
        <MiniLeaderboard />
      </div>
    </div>
  );
}