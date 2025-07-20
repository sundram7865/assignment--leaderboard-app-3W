import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPointsHistory } from '@/services/api';
import { Card } from '@/components/ui/Card'; // adjust if using shadcn or custom card
import { Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function UserHistoryPage() {
  const { userId } = useParams();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response = await fetchPointsHistory(userId);
        setHistory(response.data);
      } catch (err) {
        setError('Failed to fetch history');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [userId]);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white">User Claim History</h1>

      {loading ? (
        <div className="flex justify-center items-center h-40 text-white">
          <Loader2 className="animate-spin mr-2" />
          Loading history...
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : history.length === 0 ? (
        <p className="text-white">No claim history found for this user.</p>
      ) : (
        <div className="space-y-4">
          {history.map((entry) => (
            <Card
              key={entry._id}
              className="p-4 border border-white/20 bg-white/5 text-white backdrop-blur rounded-xl"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{entry.user?.name || 'Unnamed User'}</p>
                  <p className="text-sm text-gray-300">
                    Claimed {entry.points} point{entry.points !== 1 && 's'}
                  </p>
                </div>
                <p className="text-sm text-gray-400">
                  {formatDistanceToNow(new Date(entry.claimedAt), { addSuffix: true })}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
