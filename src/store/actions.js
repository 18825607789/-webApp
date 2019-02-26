import * as types from './mutation-types'

export default {
  async getAllData({ commit }, axios) {
    let cricle = await axios.get('/api/cricle')
    cricle = cricle.data.data
    commit(types.RECEIVE_DATA, { cricle })
  },
  getFriendsData({ commit }, data) {
    commit(types.GET_FRIENDS, data)
  },
  showChat({ commit }, item) {
    // 获取当前聊天用户的信息
    commit(types.RECEIVE_CURRENT_USER, item)
    // 打开聊天页面
    commit(types.TOGGLE_CHATVIEW, true)
  },
  closeChat({ commit }) {
    // 关闭聊天页面
    commit(types.TOGGLE_CHATVIEW, false)
  },
  sendMessage({ commit }, msg) {
    commit(types.ADD_MESSAGE, msg)
  },
  getNewMessage({ commit }, { username, msg }) {
    commit(types.GET_NEW_MESSAGE, { emojiMessage: msg, username })
  },
  showFriendInfo({ commit }, item) {
    commit(types.RECEIVE_CURRENT_USER, item)
  },
  getFriendsRequest({ commit }, request) {
    commit(types.GET_FRIENDS_REQUEST, request)
  }
}