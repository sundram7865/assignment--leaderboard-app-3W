// src/pages/LeaderboardPage.jsx
import Leaderboard from '../components/Leaderboard/Leaderboard';
import LeaderFilter from '../components/Leaderboard/LeaderFilter';

export default function LeaderboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Full Leaderboard</h1>
        <LeaderFilter />
      </div>
      <Leaderboard />
    </div>
  );
}