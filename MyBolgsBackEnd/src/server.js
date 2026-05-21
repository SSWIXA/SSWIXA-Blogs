import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import v1Routes from './routes/v1/index.js';
import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js';

// 創建Express應用
const app = express();

// 中間件配置
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 添加CORS支持
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // 前端地址
  credentials: true
}));

// 忽略 favicon.ico 請求
app.get('/favicon.ico', (req, res) => res.status(204).end());

// 連接數據庫
connectDB();

// API 版本控制路由
// /api/v1/... - v1 版本 API
app.use('/api/v1', v1Routes);

// 健康檢查端點
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// 404處理
app.use(notFound);

// 錯誤處理中間件
app.use(errorHandler);

// 啟動服務
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 API Documentation: http://localhost:${PORT}/api/v1/`);
});

export default app;
