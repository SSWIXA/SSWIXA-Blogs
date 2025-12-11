import Post from '../models/Post.js';

// 获取所有文章
export const getArticles = async (req, res) => {
  try {
    const articles = await Post.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: '获取文章失败' });
  }
};

// 根据标题查询文章（支持模糊查询）
export const getArticlesByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    
    if (!title) {
      return res.status(400).json({ error: '请提供标题参数' });
    }
    
    // 使用正则表达式进行模糊查询
    const articles = await Post.find({
      title: { $regex: title, $options: 'i' } // i 表示不区分大小写
    }).sort({ createdAt: -1 });
    
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: '查询文章失败' });
  }
};

// 分页获取文章
export const getArticlesByPage = async (req, res) => {
  try {
    const page = parseInt(req.params.page) || 1;
    const limit = parseInt(req.params.limit) || 10;
    const skip = (page - 1) * limit;
    
    const articles = await Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total = await Post.countDocuments();
    
    res.json({
      articles,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    res.status(500).json({ error: '分页获取文章失败' });
  }
};

// 根据ID获取单篇文章
export const getArticleById = async (req, res) => {
  try {
    const article = await Post.findById(req.params.id);
    if (article) {
      // 增加浏览量
      article.views = article.views + 1;
      await article.save();
      
      res.json(article);
    } else {
      res.status(404).json({ error: '文章不存在' });
    }
  } catch (err) {
    res.status(500).json({ error: '获取文章详情失败' });
  }
};

// 创建新文章
export const createArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    
    // 验证必填字段
    if (!title || !content) {
      return res.status(400).json({ error: '标题和内容不能为空' });
    }
    
    const newArticle = new Post({
      title,
      content
    });
    
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (err) {
    res.status(400).json({ error: '创建文章失败' });
  }
};

// 更新文章
export const updateArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    
    // 构建更新对象
    const updateData = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    
    const article = await Post.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ error: '文章不存在' });
    }
  } catch (err) {
    res.status(400).json({ error: '更新文章失败' });
  }
};

// 删除文章
export const deleteArticle = async (req, res) => {
  try {
    const article = await Post.findByIdAndDelete(req.params.id);
    
    if (article) {
      res.json({ message: '文章删除成功' });
    } else {
      res.status(404).json({ error: '文章不存在' });
    }
  } catch (err) {
    res.status(500).json({ error: '删除文章失败' });
  }
};

// 为文章点赞
export const likeArticle = async (req, res) => {
  try {
    const article = await Post.findById(req.params.id);
    
    if (article) {
      article.likes = article.likes + 1;
      await article.save();
      res.json({ 
        message: '点赞成功', 
        likes: article.likes,
        dislikes: article.dislikes
      });
    } else {
      res.status(404).json({ error: '文章不存在' });
    }
  } catch (err) {
    res.status(500).json({ error: '点赞失败' });
  }
};

// 为文章点踩
export const dislikeArticle = async (req, res) => {
  try {
    const article = await Post.findById(req.params.id);
    
    if (article) {
      article.dislikes = article.dislikes + 1;
      await article.save();
      res.json({ 
        message: '点踩成功', 
        likes: article.likes,
        dislikes: article.dislikes
      });
    } else {
      res.status(404).json({ error: '文章不存在' });
    }
  } catch (err) {
    res.status(500).json({ error: '点踩失败' });
  }
};