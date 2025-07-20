// src/pages/UserProfilePage.jsx
import { useParams } from 'react-router-dom';
import UserProfileCard from '../components/users/UserProfileCard';
import UserPointsHistory from '../components/users/UserPointsHistory';

export default function UserProfilePage() {
  const { userId } = useParams();
  
  // In a real app, you'd fetch user data based on userId
  const userData = {
    id: userId,
    name: 'Alice Johnson',
    avatar: '👩‍💻',
    score: 245,
    rank: 1,
    joinDate: '2023-01-15'
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <UserProfileCard user={userData} />
      </div>
      <div className="lg:col-span-3">
        <UserPointsHistory userId={userId} />
      </div>
    </div>
  );
}