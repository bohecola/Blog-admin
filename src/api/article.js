import request from '@/utils/request'

// '增' 博文 
export const createArticle = (data) => request({
  url: '/api/v1/articles',
  method: 'post',
  data
})

// '改' 博文 
export const updateArticle = (data) => request({
  url: '/api/v1/articles',
  method: 'patch',
  data
})

// '删' 博文 
export const delArticle = (param) => request({
  url: '/api/v1/articles',
  method: 'delete',
  params: param
})

// '查' 文章列表
export const getArticleList = (query) => request({
  url: '/api/v1/articles/resources',
  method: 'get',
  params: query
})

// '查' 文章详情
export const getArticleDetail = (query) => request({
  url: '/api/v1/articles',
  method: 'get',
  params: query
})
