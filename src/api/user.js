import request from '@/utils/request'

// 短信验证码 -> 参数({phone: 手机号})
export const sendSMS = (data) => request({
  url: '/api/v1/verificationCodes',
  method: 'post',
  data
})

// 用户注册 -> 参数({name: 手机号, password: 密码, verification_code: 短信验证码, verification_key: 验证key})
export const register = (data) => request({
  url: '/api/v1/users',
  method: 'post',
  data
})

// 用户登陆请求Token 
export const login = (data) => request({
  url: '/api/v1/authorizations',
  method: 'post',
  data
})

// 用户登出移除Token
export const logout = () => request({
  url: '/api/v1/authorizations/current',
  method: 'delete'
})

// 获取当前登陆用户信息
export const getInfo = () => request({
  url: '/api/v1/user',
  method: 'get'
})

// 上传用户头像
export const uploadImage = (data) => request({
  url: '/api/v1/images',
  headers: { 'Content-Type' : 'mutipart/formdata' },
  method: 'post',
  data
})