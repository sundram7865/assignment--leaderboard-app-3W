// src/components/leaderboard/Leaderboard.jsx
import LeaderboardItem from './LeaderboardItem';

const dummyLeaderboard = [
  { name: 'Alice Johnson', score: 245, avatar: '👩‍💻', streak: 5 },
  { name: 'Bob Smith', score: 198, avatar: '👨‍🔧', streak: 3 },
  { name: 'Charlie Brown', score: 187, avatar: '👨‍🎨', streak: 7 },
  { name: 'Diana Prince', score: 176, avatar: '👩‍⚖️', streak: 2 },
  { name: 'Ethan Hunt', score: 165, avatar: '🕵️‍♂️', streak: 4 },
  { name: 'Fiona Green', score: 154, avatar: '👩‍🌾', streak: 1 },
  { name: 'George Wilson', score: 143, avatar: '👨‍🍳', streak: 0 },
  { name: 'Hannah Baker', score: 132, avatar: '👩‍🎤', streak: 2 },
  { name: 'Ian Cooper', score: 121, avatar: '👨‍🚀', streak: 3 },
  { name: 'Jessica Lee', score: 110, avatar: '👩‍⚕️', streak: 1 },
  { name: 'Kevin Martin', score: 99, avatar: '🧑‍🎓', streak: 0 },
  { name: 'Lisa Ray', score: 88, avatar: '👩‍🔬', streak: 1 },
  { name: 'Mike Tyson', score: 77, avatar: '🥊', streak: 0 },
  { name: 'Nina Simone', score: 66, avatar: '🎹', streak: 4 },
  { name: 'Oscar Wilde', score: 55, avatar: '🖋️', streak: 2 }
];

export default function Leaderboard() {
  return (
    <section className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      {/* Header with glass effect */}
      <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-10" />
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center">
                <span className="mr-3">🏆</span> Current Leaderboard
              </h2>
              <p className="text-indigo-100 text-sm mt-1">Updated just now</p>
            </div>
            <button className="px-4 py-2 text-xs font-medium text-white bg-white/20 rounded-lg backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all">
              View History
            </button>
          </div>
        </div>
      </div>
      
      {/* Table with subtle scrollbar */}
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
            {dummyLeaderboard.map((user, index) => (
              <LeaderboardItem key={user.name} user={user} index={index} />
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer with action button */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
        <p className="text-xs text-gray-500">Showing 15 of 15 players</p>
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