import axiosInstance from '@/axios/axios';

// ==================== 文章查詢接口 ====================

// 獲取所有文章列表
export const getAllArticles = async () => {
  try {
    const response = await axiosInstance.get('/articles');
    return response;
  } catch (error) {
    console.error('獲取文章列表失敗:', error);
    throw error;
  }
};

// 獲取文章統計信息
export const getArticleStats = async () => {
  try {
    const response = await axiosInstance.get('/articles/stats');
    return response;
  } catch (error) {
    console.error('獲取統計信息失敗:', error);
    throw error;
  }
};

// 根據標題搜索文章
export const searchArticlesByTitle = async (title: string, page = 1, limit = 10) => {
  try {
    const response = await axiosInstance.get('/articles/search', {
      params: { title, page, limit }
    });
    return response;
  } catch (error) {
    console.error('搜索文章失敗:', error);
    throw error;
  }
};

// 分頁獲取文章（標準 RESTful 風格）
export const getArticlesByPage = async (params: {
  page?: number;
  limit?: number;
  tag?: string;
  category?: string;
  author?: string;
}) => {
  try {
    const { page = 1, limit = 10, tag, category, author } = params;
    const response = await axiosInstance.get('/articles/paginated', {
      params: { page, limit, tag, category, author }
    });
    return response;
  } catch (error) {
    console.error('分頁獲取文章失敗:', error);
    throw error;
  }
};

// 根據 ID 獲取文章詳情
export const getArticleById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/articles/${id}`);
    return response;
  } catch (error) {
    console.error('獲取文章詳情失敗:', error);
    throw error;
  }
};

// ==================== 文章創建/更新/刪除接口 ====================

// 創建新文章
export const createArticle = async (articleData: {
  title: string;
  summary?: string;
  contentBlocks: any[];
  tags?: string[];
  author?: string;
  category?: string;
}) => {
  try {
    const response = await axiosInstance.post('/articles', articleData);
    return response;
  } catch (error) {
    console.error('創建文章失敗:', error);
    throw error;
  }
};

// 更新文章（部分更新）
export const updateArticle = async (id: string, updateData: {
  title?: string;
  summary?: string;
  contentBlocks?: any[];
  tags?: string[];
  author?: string;
  category?: string;
}) => {
  try {
    const response = await axiosInstance.patch(`/articles/${id}`, updateData);
    return response;
  } catch (error) {
    console.error('更新文章失敗:', error);
    throw error;
  }
};

// 刪除文章
export const deleteArticle = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/articles/${id}`);
    return response;
  } catch (error) {
    console.error('刪除文章失敗:', error);
    throw error;
  }
};

// ==================== 交互接口（點贊/點踩）====================

// 切換點贊狀態
export const toggleLike = async (id: string) => {
  try {
    const response = await axiosInstance.put(`/articles/${id}/like`);
    return response;
  } catch (error) {
    console.error('點贊失敗:', error);
    throw error;
  }
};

// 取消點贊
export const unlikeArticle = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/articles/${id}/like`);
    return response;
  } catch (error) {
    console.error('取消點贊失敗:', error);
    throw error;
  }
};

// 切換點踩狀態
export const toggleDislike = async (id: string) => {
  try {
    const response = await axiosInstance.put(`/articles/${id}/dislike`);
    return response;
  } catch (error) {
    console.error('點踩失敗:', error);
    throw error;
  }
};

// 取消點踩
export const undislikeArticle = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/articles/${id}/dislike`);
    return response;
  } catch (error) {
    console.error('取消點踩失敗:', error);
    throw error;
  }
};
