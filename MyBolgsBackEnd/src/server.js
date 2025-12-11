import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import articleRoutes from './routes/articleRoutes.js';
import notFound from './middlewares/notFound.js';
import errorHandler from './middlewares/errorHandler.js';

// 创建Express应用
const app = express();

// 中间件配置
app.use(express.json());

// 添加CORS支持
app.use(cors());

// 连接数据库
connectDB();

// 路由注册
app.use('/api/articles', articleRoutes);

// 404处理
app.use(notFound);

// 错误处理中间件
app.use(errorHandler);

// 启动服务
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});