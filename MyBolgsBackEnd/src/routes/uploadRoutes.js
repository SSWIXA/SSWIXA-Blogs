import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import ApiResponse from '../utils/apiResponse.js';
import { authMiddleware } from '../middlewares/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置存储
const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../public/uploads'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

// 只允许图片
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('仅支持 jpg/png/gif/webp 格式图片'), false);
  }
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

const router = express.Router();

// POST /api/v1/upload - 上传单张图片（需要登录）
router.post('/', authMiddleware, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json(ApiResponse.error('请选择要上传的图片'));
  }
  const url = '/uploads/' + req.file.filename;
  res.json(ApiResponse.success({ url }, '上传成功'));
});

export default router;
