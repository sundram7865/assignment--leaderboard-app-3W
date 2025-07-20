import React from 'react'
import Header from './components/layout/Header'
import Leaderboard from './components/Leaderboard'
const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
         <Header />
          <main className="max-w-4xl mx-auto p-4 space-y-6">
        <Leaderboard />
        
      </main>
    </div>
  )
}
export default App;