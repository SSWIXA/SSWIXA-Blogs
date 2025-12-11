import express from 'express';
import {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticlesByPage,
  getArticlesByTitle,
  likeArticle,
  dislikeArticle
} from '../controllers/articleController.js';

const router = express.Router();

// 获取所有文章
router.get('/', getArticles);

// 根据标题查询文章（支持模糊查询）
router.get('/search', getArticlesByTitle);

// 分页获取文章
router.get('/page/:page/limit/:limit', getArticlesByPage);

// 根据ID获取单篇文章
router.get('/:id', getArticleById);

// 创建新文章
router.post('/', createArticle);

// 更新文章
router.put('/:id', updateArticle);

// 删除文章
router.delete('/:id', deleteArticle);

// 为文章点赞
router.post('/:id/like', likeArticle);

// 为文章点踩
router.post('/:id/dislike', dislikeArticle);

export default router;