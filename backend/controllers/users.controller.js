import User from '../models/User.js';

// Get all users sorted by points (descending)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .sort({ totalPoints: -1, createdAt: -1 })
      .select('-__v'); // Exclude version key
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: err.message
    });
  }
};

// Get top N users (default: 5)
export const getTopUsers = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const users = await User.find()
      .sort({ totalPoints: -1 })
      .limit(limit)
      .select('name totalPoints avatar streak'); // ← fixed

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: err.message
    });
  }
};

// Create new user with validation
export const createUser = async (req, res) => {
  const { name } = req.body;

  // Validation
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      message: 'Name must be at least 2 characters long'
    });
  }

  try {
    // Check for existing user
    const existingUser = await User.findOne({ name: name.trim() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: 'Duplicate Entry',
        message: 'User with this name already exists'
      });
    }
const avatarUrl = `https://api.dicebear.com/6.x/pixel-art/svg?seed=${encodeURIComponent(name.trim())}`;
    const newUser = await User.create({ 
      name: name.trim(),
      totalPoints: 0 ,
      avatar: avatarUrl// Initialize with 0 points
    });

    res.status(201).json({
      success: true,
      data: newUser
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: err.message
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: err.message
    });
  }
};