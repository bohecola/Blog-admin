const TokenKey = 'access_token'

export const getToken = () => localStorage.getItem(TokenKey)

export const setToken = (token) => localStorage.setItem(TokenKey, token)

export const removeToken = () => localStorage.removeItem(TokenKey)