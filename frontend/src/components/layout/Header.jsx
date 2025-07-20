// src/components/layout/Header.jsx
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                <span className="text-2xl">🏆</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-400">
                  3W Leaderboard
                </span>
              </h1>
            </Link>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="hidden md:block">
              <p className="text-sm font-medium text-white/80">Real-time rankings</p>
              <p className="text-xs text-white/60">Updated every minute</p>
            </div>
            <div className="relative">
              <div className="absolute -inset-1.5 bg-white/30 rounded-lg blur opacity-75 animate-pulse"></div>
               <Link 
    to="/add-user"
    className="relative px-4 py-2 text-sm font-medium text-white bg-green-500/80 hover:bg-green-500 rounded-lg backdrop-blur-sm border border-white/20 transition-all duration-200"
  >
    + Add User
  </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated dots decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-8 flex justify-center space-x-2">
        {[...Array(5)].map((_, i) => (
          <span 
            key={i}
            className="block w-2 h-2 rounded-full bg-white/40 animate-bounce"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </header>
  )
}