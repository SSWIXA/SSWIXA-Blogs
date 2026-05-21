import Post from '../models/Post.js';
import ApiResponse from '../utils/apiResponse.js';

// ==================== 查詢操作 ====================

// 獲取所有文章列表
export const getArticles = async (req, res) => {
  try {
    const articles = await Post.find().sort({ createdAt: -1 });
    res.json(ApiResponse.success(articles, '獲取文章列表成功'));
  } catch (err) {
    res.status(500).json(ApiResponse.error('獲取文章列表失敗', 500));
  }
};

// 獲取文章統計信息
export const getArticleStats = async (req, res) => {
  try {
    const total = await Post.countDocuments();
    const totalViews = await Post.aggregate([
      { $group: { _id: null, total: { $sum: '$views' } } }
    ]);
    const totalLikes = await Post.aggregate([
      { $group: { _id: null, total: { $sum: '$likes' } } }
    ]);

    res.json(ApiResponse.success({
      totalArticles: total,
      totalViews: totalViews[0]?.total || 0,
      totalLikes: totalLikes[0]?.total || 0
    }, '獲取統計信息成功'));
  } catch (err) {
    res.status(500).json(ApiResponse.error('獲取統計信息失敗', 500));
  }
};

// 根據標題查詢文章（支持模糊查詢）
export const getArticlesByTitle = async (req, res) => {
  try {
    const { title, page = 1, limit = 10 } = req.query;

    if (!title) {
      return res.status(400).json(ApiResponse.validationError('請提供標題參數'));
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // 使用正則表達式進行模糊查詢
    const articles = await Post.find({
      title: { $regex: title, $options: 'i' } // i 表示不區分大小寫
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Post.countDocuments({
      title: { $regex: title, $options: 'i' }
    });

    const pagination = {
      page: pageNum,
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum)
    };

    res.json(ApiResponse.paginate(articles, pagination, '搜索文章成功'));
  } catch (err) {
    res.status(500).json(ApiResponse.error('搜索文章失敗', 500));
  }
};

// 分頁獲取文章列表（標準查詢參數）
export const getArticlesByPage = async (req, res) => {
  try {
    const { page = 1, limit = 10, tag, category, author } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // 構建查詢條件
    const query = {};
    if (tag) query.tags = { $in: [tag] };
    if (category) query.category = category;
    if (author) query.author = author;

    const articles = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Post.countDocuments(query);

    const pagination = {
      page: pageNum,
      limit: limitNum,
      total,
      pages: Math.ceil(total / limitNum)
    };

    res.json(ApiResponse.paginate(articles, pagination, '分頁獲取文章成功'));
  } catch (err) {
    res.status(500).json(ApiResponse.error('分頁獲取文章失敗', 500));
  }
};

// 根據ID獲取單篇文章詳情
export const getArticleById = async (req, res) => {
  try {
    const article = await Post.findById(req.params.id);

    if (!article) {
      return res.status(404).json(ApiResponse.notFound('文章不存在'));
    }

    // 增加瀏覽量
    article.views = article.views + 1;
    await article.save();

    res.json(ApiResponse.success(article, '獲取文章詳情成功'));
  } catch (err) {
    res.status(500).json(ApiResponse.error('獲取文章詳情失敗', 500));
  }
};

// ==================== 創建/更新/刪除操作 ====================

// 創建新文章
export const createArticle = async (req, res) => {
  try {
    const { title, summary, contentBlocks, tags, author, category } = req.body;

    // 驗證必填字段
    if (!title || title.trim() === '') {
      return res.status(400).json(ApiResponse.validationError('標題不能為空'));
    }

    if (!contentBlocks || contentBlocks.length === 0) {
      return res.status(400).json(ApiResponse.validationError('內容不能為空'));
    }

    const newArticle = new Post({
      title: title.trim(),
      summary: summary || '',
      contentBlocks,
      tags: tags || [],
      author: author || 'Anonymous',
      category: category || 'Uncategorized'
    });

    const savedArticle = await newArticle.save();
    res.status(201).json(ApiResponse.created(savedArticle, '創建文章成功'));
  } catch (err) {
    console.error('創建文章錯誤:', err);
    res.status(400).json(ApiResponse.error('創建文章失敗', 400));
  }
};

// 更新文章（支持部分更新）
export const updateArticle = async (req, res) => {
  try {
    const { title, summary, contentBlocks, tags, author, category } = req.body;

    // 構建更新對象（只更新提供的字段）
    const updateData = {};
    if (title !== undefined) updateData.title = title.trim();
    if (summary !== undefined) updateData.summary = summary;
    if (contentBlocks !== undefined) updateData.contentBlocks = contentBlocks;
    if (tags !== undefined) updateData.tags = tags;
    if (author !== undefined) updateData.author = author;
    if (category !== undefined) updateData.category = category;

    const article = await Post.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!article) {
      return res.status(404).json(ApiResponse.notFound('文章不存在'));
    }

    res.json(ApiResponse.updated(article, '更新文章成功'));
  } catch (err) {
    console.error('更新文章錯誤:', err);
    res.status(400).json(ApiResponse.error('更新文章失敗', 400));
  }
};

// 刪除文章
export const deleteArticle = async (req, res) => {
  try {
    const article = await Post.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json(ApiResponse.notFound('文章不存在'));
    }

    res.json(ApiResponse.deleted('刪除文章成功'));
  } catch (err) {
    res.status(500).json(ApiResponse.error('刪除文章失敗', 500));
  }
};

// ==================== 交互操作（點贊/點踩）====================

// 切換點贊狀態（點贊/取消點贊）
export const toggleLike = async (req, res) => {
  try {
    const article = await Post.findById(req.params.id);

    if (!article) {
      return res.status(404).json(ApiResponse.notFound('文章不存在'));
    }

    // 判斷是 PUT（切換）還是 DELETE（取消）
    const method = req.method.toUpperCase();

    if (method === 'DELETE') {
      // 強制取消點贊
      article.likes = Math.max(0, article.likes - 1);
    } else {
      // PUT：切換狀態（簡化版，實際應根據用戶ID判斷）
      article.likes = article.likes + 1;
    }

    await article.save();

    res.json(ApiResponse.success(
      { likes: article.likes, dislikes: article.dislikes },
      method === 'DELETE' ? '取消點贊成功' : '點贊成功'
    ));
  } catch (err) {
    res.status(500).json(ApiResponse.error('點贊操作失敗', 500));
  }
};

// 切換點踩狀態（點踩/取消點踩）
export const toggleDislike = async (req, res) => {
  try {
    const article = await Post.findById(req.params.id);

    if (!article) {
      return res.status(404).json(ApiResponse.notFound('文章不存在'));
    }

    // 判斷是 PUT（切換）還是 DELETE（取消）
    const method = req.method.toUpperCase();

    if (method === 'DELETE') {
      // 強制取消點踩
      article.dislikes = Math.max(0, article.dislikes - 1);
    } else {
      // PUT：切換狀態
      article.dislikes = article.dislikes + 1;
    }

    await article.save();

    res.json(ApiResponse.success(
      { likes: article.likes, dislikes: article.dislikes },
      method === 'DELETE' ? '取消點踩成功' : '點踩成功'
    ));
  } catch (err) {
    res.status(500).json(ApiResponse.error('點踩操作失敗', 500));
  }
};