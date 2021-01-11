const TokenKey = 'access_token'

const UserKey = 'current_user'

export const getToken = () => localStorage.getItem(TokenKey)

export const setToken = (token) => localStorage.setItem(TokenKey, token)

export const removeToken = () => localStorage.removeItem(TokenKey)

export const getUser = () => JSON.parse(localStorage.getItem(UserKey))

export const setUser = (data) => localStorage.setItem(UserKey, JSON.stringify(data))

export const removeUser = () => localStorage.removeItem(UserKey)
