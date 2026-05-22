import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import v1Routes from './routes/v1/index.js';
import errorHandler from './middlewares/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 創建Express應用
const app = express();

// 中間件配置
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS：內網部署允許所有來源
app.use(cors({ origin: '*' }));

// 靜態文件：上傳的圖片
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// 靜態文件：前端打包產物
const frontDist = path.join(__dirname, '../../MyBolgs/dist');
app.use(express.static(frontDist));
// 靜態文件：Live2D 模型 + 公共資源
app.use(express.static(path.join(__dirname, '../../MyBolgs/public')));
app.use('/model', express.static(path.join(__dirname, '../../MyBolgs/model')));
app.use('/src/assets', express.static(path.join(__dirname, '../../MyBolgs/src/assets')));

// API 路由
app.use('/api/v1', v1Routes);
app.get('/health', (req, res) => {
  res.json({ success: true, message: 'Server is running', timestamp: new Date().toISOString() });
});

// SPA fallback：非 API 請求返回 index.html
app.get(/^\/(?!api\/|uploads\/|health).*/, (req, res) => {
  const filePath = path.join(frontDist, 'index.html');
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('SendFile error:', err);
      res.status(500).send('Server error');
    }
  });
});

// 連接數據庫
connectDB();

// 錯誤處理中間件
app.use(errorHandler);

// 啟動服務
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 API Documentation: http://localhost:${PORT}/api/v1/`);
});

export default app;
