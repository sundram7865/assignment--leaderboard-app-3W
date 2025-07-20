import UserForm from '@/components/users/UserForm';
import { Link } from 'react-router-dom';

export default function AddUserPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4 py-8">
      <div className="w-full max-w-md bg-white/5 p-6 rounded-xl shadow-md border border-white/10">
        <h1 className="text-2xl font-semibold mb-6 text-center">Add New User</h1>
        
        <UserForm />

        <div className="mt-6 text-center">
          <Link 
            to="/leaderboard" 
            className="inline-block px-4 py-2 text-sm font-medium text-white bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200"
          >
            ← Back to Leaderboard
          </Link>
        </div>
      </div>
    </div>
  );
}
