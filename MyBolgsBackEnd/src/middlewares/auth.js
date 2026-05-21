import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'sswixa-blog-secret-key-2026';

// 生成 Token
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' });
};

// 验证 Token 中间件
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ code: 401, success: false, message: '未登录，请先登录' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ code: 401, success: false, message: '登录已过期，请重新登录' });
  }
};
