import express from 'express';
import articleRoutes from './articleRoutes.js';

const router = express.Router();

// v1 版本的 API 路由
router.use('/articles', articleRoutes);

// 可在這裡添加其他 v1 路由
// router.use('/users', userRoutes);
// router.use('/comments', commentRoutes);

export default router;
