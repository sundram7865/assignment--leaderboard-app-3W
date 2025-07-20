import User from '../models/User.js';
import PointsHistory from '../models/PointsHistory.js';
import mongoose from 'mongoose';

// Claim random points (1-10) with transaction support
export const claimPoints = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { userId } = req.body;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid User ID',
        message: 'Please provide a valid user ID'
      });
    }

    // Generate random points (1-10)
    const points = Math.floor(Math.random() * 10) + 1;

    // Update user's total points
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { totalPoints: points } },
      { new: true, session }
    ).select('-__v');

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'User not found'
      });
    }

    // Create points history record
    const historyRecord = await PointsHistory.create([{
      userId,
      points,
      claimedAt: new Date()
    }], { session });

    await session.commitTransaction();
    
    res.status(200).json({
      success: true,
      data: {
        user,
        points,
        historyId: historyRecord[0]._id
      }
    });
  } catch (err) {
    await session.abortTransaction();
    
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
  } finally {
    session.endSession();
  }
};

// Get paginated points history for a user
export const getPointsHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid User ID',
        message: 'Please provide a valid user ID'
      });
    }

    const [history, total] = await Promise.all([
      PointsHistory.find({ userId })
        .sort({ claimedAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('userId', 'name avatar')
        .select('-__v'),
      PointsHistory.countDocuments({ userId })
    ]);

    res.status(200).json({
      success: true,
      data: history,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: err.message
    });
  }
};