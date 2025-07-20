// src/components/leaderboard/RankBadge.jsx
export default function RankBadge({ rank }) {
  const getBadgeStyle = (rank) => {
    switch(rank) {
      case 1: return 'bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-gold';
      case 2: return 'bg-gradient-to-br from-gray-200 to-gray-300 shadow-silver';
      case 3: return 'bg-gradient-to-br from-amber-500 to-amber-600 shadow-bronze';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <span className={`inline-flex items-center justify-center w-9 h-9 rounded-full ${getBadgeStyle(rank)} 
      font-bold text-white shadow-md`}>
      {rank}
    </span>
  );
}