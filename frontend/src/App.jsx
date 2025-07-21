import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Page Components
import HomePage from './pages/HomePage';
import LeaderboardPage from './pages/LeaderboardPage';
import UsersPage from './pages/UsersPage';
import UserHistoryPage from './pages/UserHistoryPage';
import AddUserPage from './pages/AddUserPage';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

export default function App() {
  return (
    <Router>
      {/* App Wrapper */}
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
        
        {/* App Header */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/add-user" element={<AddUserPage />} />
            <Route path="/history" element={<UserHistoryPage />} />
          </Routes>
        </main>

        {/* App Footer */}
        <Footer />
      </div>
    </Router>
  );
}
