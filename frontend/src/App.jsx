import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LeaderboardPage from './pages/LeaderboardPage'
import UsersPage from './pages/UsersPage'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import UserHistoryPage from './pages/UserHistoryPage';
import AddUserPage from './pages/AddUserPage';
export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/add-user" element={<AddUserPage />} />
            <Route path="/history" element={<UserHistoryPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}