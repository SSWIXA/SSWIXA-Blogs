import express from 'express';
import User from '../models/User.js';
import { generateToken } from '../middlewares/auth.js';
import ApiResponse from '../utils/apiResponse.js';

const router = express.Router();

// POST /api/v1/auth/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json(ApiResponse.validationError('用户名和密码不能为空'));
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json(ApiResponse.unauthorized('用户名或密码错误'));
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json(ApiResponse.unauthorized('用户名或密码错误'));
    }

    const token = generateToken(user._id);
    res.json(ApiResponse.success({
      token,
      user: { id: user._id, username: user.username, role: user.role }
    }, '登录成功'));
  } catch (err) {
    console.error('登录失败:', err);
    res.status(500).json(ApiResponse.error('登录失败', 500));
  }
});

export default router;
