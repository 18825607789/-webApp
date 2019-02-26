import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data: {
      self: {},
      friends: [], // 朋友数据
      cricle: [], // 朋友圈数据
    },
    currentUser: '', // 目前登录的用户数据
    curUser: {}, // 当前聊天对象
    curMsgList: {}, // 当前对象的聊天记录
    searchView: false, // 搜索界面
    charView: false, // 聊天界面
    sendFriendCircle: false, //发朋友圈
    friendsRequest: false, // 添加朋友
    messageList: [],
    request: [], // 好友请求
    requestNum: '' // 请求数量
  },
  getters,
  mutations,
  actions
})
