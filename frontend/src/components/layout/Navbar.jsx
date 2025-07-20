// src/components/layout/Navbar.jsx
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex space-x-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `py-4 px-1 border-b-2 font-medium text-sm ${
                isActive 
                  ? 'border-indigo-500 text-indigo-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/leaderboard" 
            className={({ isActive }) => 
              `py-4 px-1 border-b-2 font-medium text-sm ${
                isActive 
                  ? 'border-indigo-500 text-indigo-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`
            }
          >
            Leaderboard
          </NavLink>
          <NavLink 
            to="/history" 
            className={({ isActive }) => 
              `py-4 px-1 border-b-2 font-medium text-sm ${
                isActive 
                  ? 'border-indigo-500 text-indigo-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`
            }
          >
            History
          </NavLink>
        </div>
      </div>
    </nav>
  );
}