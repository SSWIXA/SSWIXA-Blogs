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
} from '../../controllers/articleController.js';

const router = express.Router();

// ==================== 基礎 CRUD 操作 (RESTful) ====================

// 獲取所有文章列表
// GET /api/v1/articles
router.get('/', getArticles);

// 獲取文章統計信息
// GET /api/v1/articles/stats
router.get('/stats', getArticleStats);

// 根據標題搜索文章（支持模糊查詢）
// GET /api/v1/articles/search?title=關鍵詞
router.get('/search', getArticlesByTitle);

// 分頁獲取文章列表（標準查詢參數）
// GET /api/v1/articles/paginated?page=1&limit=10
router.get('/paginated', getArticlesByPage);

// 根據ID獲取單篇文章詳情
// GET /api/v1/articles/:id
router.get('/:id', getArticleById);

// 創建新文章
// POST /api/v1/articles
router.post('/', createArticle);

// 更新文章（部分更新）
// PATCH /api/v1/articles/:id
router.patch('/:id', updateArticle);

// 完全更新文章
// PUT /api/v1/articles/:id
router.put('/:id', updateArticle);

// 刪除文章
// DELETE /api/v1/articles/:id
router.delete('/:id', deleteArticle);

// ==================== 交互操作 (RESTful 風格) ====================

// 切換點贊狀態（點贊/取消點贊）
// PUT /api/v1/articles/:id/like
router.put('/:id/like', toggleLike);

// 取消點贊（專用）
// DELETE /api/v1/articles/:id/like
router.delete('/:id/like', toggleLike);

// 切換點踩狀態（點踩/取消點踩）
// PUT /api/v1/articles/:id/dislike
router.put('/:id/dislike', toggleDislike);

// 取消點踩（專用）
// DELETE /api/v1/articles/:id/dislike
router.delete('/:id/dislike', toggleDislike);

export default router;
