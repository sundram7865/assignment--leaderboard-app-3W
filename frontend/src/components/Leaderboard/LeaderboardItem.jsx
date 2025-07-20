// src/components/leaderboard/LeaderboardItem.jsx
import RankBadge from './RankBadge';

export default function LeaderboardItem({ user, index }) {
  const statusBadge = () => {
    if (index < 3) return { text: 'Top Performer', style: 'bg-green-100 text-green-800' };
    if (index < 10) return { text: 'Rising Star', style: 'bg-blue-100 text-blue-800' };
    return { text: 'New Challenger', style: 'bg-purple-100 text-purple-800' };
  };

  return (
    <tr className="hover:bg-white/80 transition-all duration-200 even:bg-gray-50/50">
      <td className="px-6 py-4 whitespace-nowrap">
        <RankBadge rank={index + 1} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-white rounded-full shadow-sm text-xl border border-gray-200">
            {user.avatar}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
            <div className="text-xs text-gray-500">Level {Math.floor(user.score/50) + 1}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-bold text-gray-900 font-mono">{user.score}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          {user.streak > 0 ? (
            <div className="flex items-center bg-red-50 px-2 py-1 rounded-full">
              <span className="text-xs font-medium text-red-500 mr-1">🔥</span>
              <span className="text-xs font-medium text-gray-700">{user.streak}d</span>
            </div>
          ) : (
            <span className="text-xs text-gray-400">-</span>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2.5 py-1 inline-flex text-xs leading-4 font-medium rounded-full ${statusBadge().style}`}>
          {statusBadge().text}
        </span>
      </td>
    </tr>
  );
}