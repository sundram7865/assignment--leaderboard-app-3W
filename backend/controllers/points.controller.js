import User from '../models/User.js';
import PointsHistory from '../models/PointsHistory.js';
import mongoose from 'mongoose';

export const claimPoints = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid User ID',
        message: 'Please provide a valid user ID',
      });
    }

    const points = Math.floor(Math.random() * 10) + 1;

    const user = await User.findById(userId).session(session);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'Not Found',
        message: 'User not found',
      });
    }

    // Streak logic
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const lastClaimDate = user.lastClaimDate ? new Date(user.lastClaimDate) : null;
    let streak = user.streak || 0;

    if (!lastClaimDate || lastClaimDate.toDateString() !== today.toDateString()) {
      if (lastClaimDate && lastClaimDate.toDateString() === yesterday.toDateString()) {
        // Claimed yesterday — continue streak
        streak += 1;
      } else {
        // Missed a day or first claim — reset streak
        streak = 1;
      }
    }

    // Update user
    user.totalPoints += points;
    user.streak = streak;
    user.lastClaimDate = today;
    await user.save({ session });

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
    await session.abortTransaction();
    res.status(500).json({
      success: false,
      error: 'Server Error',
      message: err.message,
    });
  } finally {
    session.endSession();
  }
};

export const getPointsHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (userId !== 'all' && !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid user ID format',
      });
    }

    const query = userId === 'all' ? {} : { userId };

    const [history, total] = await Promise.all([
      PointsHistory.find(query)
        .sort({ claimedAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate({
          path: 'userId',
          select: 'name',
        }),
      PointsHistory.countDocuments(query),
    ]);

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
