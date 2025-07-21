import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { getPointsHistory } from "@/services/api";
import { format } from 'date-fns';

/**
 * Displays a user's points claim history in a clean card table UI.
 * Fetches data on component mount or when `userId` changes.
 */
export default function PointsHistory({ userId }) {
  const [history, setHistory] = useState([]); // Stores fetched claim history
  const [loading, setLoading] = useState(true); // Controls loading skeleton visibility
  const [error, setError] = useState(''); // Stores any fetch error

  useEffect(() => {
    const fetchHistory = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const { data } = await getPointsHistory(userId);
        setHistory(data); // Update state with claim history
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [userId]);

  // Display prompt when no user is selected
  if (!userId) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Points History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Select a user to view their points history</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Points History</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Error State */}
        {error ? (
          <p className="text-red-500">{error}</p>

        // Loading State (skeletons for visual feedback)
        ) : loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>

        // No history found
        ) : history.length === 0 ? (
          <p className="text-muted-foreground">No points history found</p>

        // Render points history table
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
                    {format(new Date(item.claimedAt), 'MMM dd, yyyy HH:mm')}
                  </TableCell>
                  <TableCell className="text-right font-medium text-green-500">
                    +{item.points}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
