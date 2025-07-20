import User from '../models/User.js';
import PointsHistory from '../models/PointsHistory.js';

// Claim random points (1-10)
export const claimPoints = async (req, res) => {
  const { userId } = req.body;
  const points = Math.floor(Math.random() * 10) + 1;

  try {
    // Update user's total points
    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { totalPoints: points } },
      { new: true }
    );

    // Create points history record
    await PointsHistory.create({
      userId,
      points
    });

    res.json({ user, points });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get points history for a user
export const getPointsHistory = async (req, res) => {
  try {
    const history = await PointsHistory.find({ userId: req.params.userId })
      .sort({ claimedAt: -1 })
      .populate('userId', 'name');
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};