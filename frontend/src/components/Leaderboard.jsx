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
    <section className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-xl overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-600">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <span className="mr-2">🏆</span> Current Leaderboard
        </h2>
        <p className="text-indigo-100 text-sm mt-1">Updated just now</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Streak</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {dummyLeaderboard.map((user, index) => (
              <tr key={user.name} className="hover:bg-white/50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${
                    index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-white' : 
                    index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-700' : 
                    index === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-700 text-white' : 
                    'bg-gray-100 text-gray-600'
                  } font-bold`}>
                    {index + 1}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-white rounded-full shadow-sm text-xl">
                      {user.avatar}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">Level {Math.floor(user.score/50) + 1}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-gray-900">{user.score}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {user.streak > 0 ? (
                      <>
                        <span className="text-sm font-medium text-red-500 mr-1">🔥</span>
                        <span className="text-sm font-medium text-gray-900">{user.streak} days</span>
                      </>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    index < 3 ? 'bg-green-100 text-green-800' : 
                    index < 10 ? 'bg-blue-100 text-blue-800' : 
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {index < 3 ? 'Top Performer' : index < 10 ? 'Rising Star' : 'New Challenger'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-3 bg-gray-50 text-right">
        <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all">
          View Full Leaderboard
          <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </section>
  );
}