import axiosInstance from '@/axios/axios';

// 获取所有文章
export const getAllArticles = async () => {
  try {
    const response = await axiosInstance.get('/articles');
    return response.data;
  } catch (error) {
    console.error('获取文章列表失败:', error);
    throw error;
  }
};

// 根据标题搜索文章
export const searchArticlesByTitle = async (title: string) => {
  try {
    const response = await axiosInstance.get(`/articles/search?title=${title}`);
    return response.data;
  } catch (error) {
    console.error('搜索文章失败:', error);
    throw error;
  }
};

// 根据ID获取文章
export const getArticleById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/articles/${id}`);
    return response.data;
  } catch (error) {
    console.error('获取文章详情失败:', error);
    throw error;
  }
};

// 分页获取文章
export const getArticlesByPage = async (page: number, limit: number) => {
  try {
    const response = await axiosInstance.get(`/articles/page/${page}/limit/${limit}`);
    return response.data;
  } catch (error) {
    console.error('分页获取文章失败:', error);
    throw error;
  }
};