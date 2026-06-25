import User from '../models/User.js';

const adminCheck = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    
    if (!user || user.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export default adminCheck;
