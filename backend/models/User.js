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
    default: '' // Optional: You can also set a default avatar URL here
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export default mongoose.model('User', userSchema);
