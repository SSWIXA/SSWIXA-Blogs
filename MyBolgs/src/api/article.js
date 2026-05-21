import request from '@/axios'

// 获取所有文章
export const getArticles = () => {
  return request({
    url: '/api/posts',
    method: 'get'
  })
}

// 根据ID获取文章详情
export const getArticleById = (id) => {
  return request({
    url: `/api/posts/${id}`,
    method: 'get'
  })
}

// 创建新文章
export const createArticle = (data) => {
  return request({
    url: '/api/posts',
    method: 'post',
    data
  })
}

// 更新文章
export const updateArticle = (id, data) => {
  return request({
    url: `/api/posts/${id}`,
    method: 'put',
    data
  })
}

// 删除文章
export const deleteArticle = (id) => {
  return request({
    url: `/api/posts/${id}`,
    method: 'delete'
  })
}

// 搜索文章
export const searchArticles = (keyword) => {
  return request({
    url: '/api/posts/search',
    method: 'get',
    params: { title: keyword }
  })
}

// 分页获取文章
export const getArticlesByPage = (page, limit) => {
  return request({
    url: `/api/posts/page/${page}/limit/${limit}`,
    method: 'get'
  })
}