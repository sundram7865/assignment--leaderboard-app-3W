import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { LeaderboardProvider } from '@/contexts/LeaderboardContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LeaderboardProvider>
      <App />
    </LeaderboardProvider>
  </React.StrictMode>
);