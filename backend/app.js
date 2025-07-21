import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import usersRouter from './routes/users.routes.js'; // Import your routes
import pointsRouter from './routes/points.routes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: FRONTEND_URL, // Your frontend URL
  credentials: true
}));
app.use(express.json());

// Route mounting
app.use('/api/users', usersRouter); // Mount users routes
app.use('/api/points', pointsRouter); // Mount points routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

export default app;