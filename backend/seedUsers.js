// seedUsers.js (ESM version)
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js'; // make sure the model is exported using ES modules

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/leaderboard';

const users = [
  { name: 'Alice' },
  { name: 'Bob' },
  { name: 'Charlie' },
  { name: 'David' },
  { name: 'Eva' },
  { name: 'Frank' },
  { name: 'Grace' },
  { name: 'Helen' },
  { name: 'Ivan' },
  { name: 'Julia' }
];

async function seedUsers() {
  try {
    await mongoose.connect(MONGO_URI);
    await User.deleteMany(); // optional: clear existing
    const result = await User.insertMany(users);
    console.log('Seeded users:', result);
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seedUsers();
