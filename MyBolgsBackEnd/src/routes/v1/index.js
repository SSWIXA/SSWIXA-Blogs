import express from 'express';
import articleRoutes from './articleRoutes.js';
import uploadRoutes from '../uploadRoutes.js';

const router = express.Router();

// v1 版本的 API 路由
router.use('/articles', articleRoutes);
router.use('/upload', uploadRoutes);

export default router;
