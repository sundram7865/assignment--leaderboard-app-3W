import { useEffect, useState } from 'react';
import { fetchTopUsers } from '@/services/api';
import LeaderboardItem from './LeaderboardItem';
import { Crown, Trophy, Award, Zap } from 'lucide-react';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await fetchTopUsers(15); // Fetch top 15 users
        setLeaderboard(response.data || []);
      } catch (err) {
        setError('Failed to load leaderboard');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  // Separate top 3 and the rest
  const topThree = leaderboard.slice(0, 3);
  const remainingPlayers = leaderboard.slice(3);

  return (
    <section className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      {/* Header with glass effect */}
      <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-10" />
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Trophy className="mr-3 h-6 w-6" /> Current Leaderboard
              </h2>
              <p className="text-indigo-100 text-sm mt-1">Updated just now</p>
            </div>
            <button className="px-4 py-2 text-xs font-medium text-white bg-white/20 rounded-lg backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all">
              View History
            </button>
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      {topThree.length > 0 && (
        <div className="px-6 py-4 bg-gradient-to-b from-indigo-50 to-purple-50">
          <div className="flex justify-center items-end space-x-4 h-48">
            {/* 2nd Place */}
            {topThree[1] && (
              <div className="flex flex-col items-center w-1/4">
                <div className="bg-gradient-to-b from-slate-300 to-slate-200 rounded-t-lg p-4 w-full h-32 flex flex-col items-center justify-end">
                  <Award className="h-8 w-8 text-slate-600 mb-2" />
                  <span className="text-lg font-bold text-slate-700">2</span>
                </div>
                <div className="mt-2 text-center">
                  <p className="font-medium text-gray-900">{topThree[1].name}</p>
                  <p className="text-sm text-purple-600">{topThree[1].totalPoints} pts</p>
                </div>
              </div>
            )}

            {/* 1st Place */}
            {topThree[0] && (
              <div className="flex flex-col items-center w-1/3">
                <div className="bg-gradient-to-b from-yellow-300 to-yellow-200 rounded-t-lg p-4 w-full h-40 flex flex-col items-center justify-end">
                  <Crown className="h-10 w-10 text-yellow-600 mb-2" />
                  <span className="text-xl font-bold text-yellow-800">1</span>
                </div>
                <div className="mt-2 text-center">
                  <p className="font-bold text-gray-900">{topThree[0].name}</p>
                  <p className="text-sm text-purple-600 font-semibold">{topThree[0].totalPoints} pts</p>
                </div>
              </div>
            )}

            {/* 3rd Place */}
            {topThree[2] && (
              <div className="flex flex-col items-center w-1/4">
                <div className="bg-gradient-to-b from-amber-400 to-amber-300 rounded-t-lg p-4 w-full h-24 flex flex-col items-center justify-end">
                  <Award className="h-6 w-6 text-amber-700 mb-2" />
                  <span className="font-bold text-amber-800">3</span>
                </div>
                <div className="mt-2 text-center">
                  <p className="font-medium text-gray-900">{topThree[2].name}</p>
                  <p className="text-sm text-purple-600">{topThree[2].totalPoints} pts</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Table */}
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rank
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Player
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Score
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Streak
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                  </div>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : (
              remainingPlayers.map((user, index) => (
                <LeaderboardItem 
    key={user._id} 
    user={user} 
    rank={index + 4}  // Pass rank explicitly
  />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
        <p className="text-xs text-gray-500">
          Showing {leaderboard.length} of {leaderboard.length} players
        </p>
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all">
          Export Results
          <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </section>
  );
}