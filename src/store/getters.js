const getters = {
  token: state => state.token,
  avatar: state => state.avatar,
  name: state => state.name,
  introduction: state => state.introduction,
  userId: state => state.user.id
}
export default getters