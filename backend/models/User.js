import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true
  },
  totalPoints: { 
    type: Number, 
    default: 0 
  },
  streak: {
    type: Number,
    default: 0
  },
  lastClaimedAt: {
  type: Date,
  default: null}
  ,
  avatar: {
    type: String,
    default: '' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model('User', userSchema);
