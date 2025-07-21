// controllers/pointsController.js

import User from '../models/User.js';
import PointsHistory from '../models/PointsHistory.js';
import mongoose from 'mongoose';

/**
 * @desc Claim daily points for a user
 * @route POST /api/points/claim
 * @access Public (or Protected based on your middleware)
 */
export const claimPoints = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId } = req.body;

    // Validate user ID format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid User ID',
        message: 'Please provide a valid user ID',
      });
    }

    // Random point generation between 1 and 10
    const points = Math.floor(Math.random() * 10) + 1;

    // Fetch the user with session for transaction safety
    const user = await User.findById(userId).session(session);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'User not found',
      });
    }

    // ------------------- STREAK LOGIC ------------------- //
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const lastClaimDate = user.lastClaimDate ? new Date(user.lastClaimDate) : null;
    let streak = user.streak || 0;

    // Determine if user claimed yesterday or missed a day
    if (!lastClaimDate || lastClaimDate.toDateString() !== today.toDateString()) {
      if (lastClaimDate && lastClaimDate.toDateString() === yesterday.toDateString()) {
        streak += 1; // Continue streak
      } else {
        streak = 1; // Start new streak
      }
    }

    // Update user data
    user.totalPoints += points;
    user.streak = streak;
    user.lastClaimDate = today;
    await user.save({ session });

    // Record points history
    const historyRecord = await PointsHistory.create(
      [
        {
          userId,
          points,
          claimedAt: today,
        },
      ],
      { session }
    );

    await session.commitTransaction();

    // Response with updated user and claimed points
    res.status(200).json({
      success: true,
      data: {
        user: {
          _id: user._id,
          name: user.name,
          totalPoints: user.totalPoints,
          streak: user.streak,
        },
        points,
        historyId: historyRecord[0]._id,
      },
    });
  } catch (err) {
    // Rollback transaction on error
    await session.abortTransaction();
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: err.message,
    });
  } finally {
    session.endSession(); // Always end session
  }
};

/**
 * @desc Fetch points claim history for a user (or all users)
 * @route GET /api/points/history/:userId?page=&limit=
 * @access Public (or Protected based on your middleware)
 */
export const getPointsHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Validate user ID unless fetching for all
    if (userId !== 'all' && !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format',
      });
    }

    // Build query dynamically based on userId
    const query = userId === 'all' ? {} : { userId };

    // Fetch history with pagination
    const [history, total] = await Promise.all([
      PointsHistory.find(query)
        .sort({ claimedAt: -1 }) // Latest first
        .skip(skip)
        .limit(limit)
        .populate({
          path: 'userId',
          select: 'name', // Only return name from user
        }),
      PointsHistory.countDocuments(query),
    ]);

    // Send paginated response
    res.status(200).json({
      success: true,
      data: {
        history,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('Error fetching points history:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch points history',
      error: error.message,
    });
  }
};
