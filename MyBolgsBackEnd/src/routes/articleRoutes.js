import express from 'express';
import {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticlesByPage,
  getArticlesByTitle,
  toggleLike,
  toggleDislike,
  getArticleStats
} from '../controllers/articleController.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = express.Router();

// ==================== 公開接口（無需登錄）====================

router.get('/', getArticles);
router.get('/stats', getArticleStats);
router.get('/search', getArticlesByTitle);
router.get('/paginated', getArticlesByPage);
router.get('/:id', getArticleById);

// ==================== 交互操作（無需登錄）====================

router.put('/:id/like', toggleLike);
router.delete('/:id/like', toggleLike);
router.put('/:id/dislike', toggleDislike);
router.delete('/:id/dislike', toggleDislike);

// ==================== 寫操作（需要登录）====================

router.post('/', authMiddleware, createArticle);
router.patch('/:id', authMiddleware, updateArticle);
router.put('/:id', authMiddleware, updateArticle);
router.delete('/:id', authMiddleware, deleteArticle);

export default router;