import * as types from './mutation-types'

export default {
  // 获取数据
  [types.RECEIVE_DATA](state, data) {
    state.data = data
  },

  // 信息已读未读
  [types.TOGGET_READ](state, stark) {
    let record = state.messageList.find(m => m.username === stark.username)
    if (!record) {
      return
    }
    let index = state.messageList.indexOf(record)
    if (stark.msgViewList[index].unreadNum > 0) {
      stark.msgViewList[index].unreadNum = 0
    } else {
      stark.msgViewList[index].unreadNum = 1
    }
  },

  // 删除信息
  [types.DELETD_MESSAGE](state, id) {
    let record = state.messageList.find(m => m.username === id) // 找到对应好友聊天消息数据
    if (!record) {
      return
    }
    let index = state.messageList.indexOf(record) // 获取对应消息的下标
    state.messageList.splice(index, 1) // 删除对应消息数据
  },

  // 搜索视图开关
  [types.TOGGLE_SEARCH_VIEW](state, val) {
    state.searchView = val
  },

  // 聊天视图开关
  [types.TOGGLE_CHATVIEW](state, val) {
    state.charView = val
  },

  // 添加聊天信息
  [types.ADD_MESSAGE](state, msg) {
    state.curMsgList.list.push(msg)
  },

  // 获取当前聊天用户信息
  [types.RECEIVE_CURRENT_USER](state, user) {
    state.curUser = user // 当前聊天用户
    let record = state.messageList.find(msg => msg.username === user.username)
    if (!record) {
      record = {
        username: user.username,
        list: []
      }
      state.messageList.push(record)
    } else {
      record.list.forEach(m => m.read = true)
    }
    state.curMsgList = record
  },

  // 获取信息信息
  [types.GET_NEW_MESSAGE](state, { emojiMessage, username }) {
    // 根据id返回对应好友的聊天消息数组
    let record = state.messageList.find(m => m.username === username)
    if (!record) {
      // 当前好友没有与用户没有聊天记录,向messageList添加一条对应的聊天记录
      record = {
        username: username,
        list: []
      }
      state.messageList.push(record)
    }
    let read = state.curUser.username === username && state.charView
    let time = new Date().getTime()
    record.list.push({
      emojiMessage,
      time,
      read
    })
  },

  // 设置目前登录的用户id
  [types.SET_CURUSER](state, val) {
    state.data.self = val;
  },

  [types.GET_CURUSER](state, val) {
    state.curUser = val
  },

  // 获取好友
  [types.GET_FRIENDS](state, val) {
    if (!window.localStorage) {
      return false;
    } else {
      let storage = window.localStorage;
      let jsonData = [];
      state.data.friends = [];
      for (let i = 0; i < storage.length - 1; i++) {
        jsonData.push(JSON.parse(storage.getItem(storage.key(i))));
      }
      for (let i in jsonData) {
        for (let j in val) {
          if (jsonData[i].username === val[j].name) {
            state.data.friends.push(Object.assign(jsonData[i], val[j]));
          }
        }
      }
      // state.data.friends = finalData;
      // if(finalData.length){
      //   state.data.friends = []
      //   state.data.friends.concat(finalData)
      // }else {
      //   state.data.friends = finalData;
      // }
      // console.log(state.data.friends)
    }
  },

  // 点赞
  [types.SET_LIKE](state, obj) {
    state.data.cricle[obj.index].liketext.push(obj.name);
    state.data.cricle[obj.index].likeWxId.push(obj._id);
    state.data.cricle[obj.index].offlike = true;
  },

  // 取消点赞
  [types.SET_OFF_LIKE](state, obj) {
    function removeByArrValue(arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
          arr.splice(i, 1);
          break;
        }
      }
    }
    removeByArrValue(state.data.cricle[obj.index].liketext, obj.name);
    removeByArrValue(state.data.cricle[obj.index].likeWxId, obj._id);
    state.data.cricle[obj.index].offlike = false;
  },

  // 发朋友圈页面开关
  [types.TOGGLE_SEND_FRIEND_CIRCLE](state, val) {
    state.sendFriendCircle = val;
  },

  // 发送朋友圈
  [types.SET_MOMENTS](state, obj) {
    state.data.cricle.unshift(obj);
  },

  // 好友请求开关
  [types.TPGGLE_FRIENDS_REQUEST](state, val) {
    state.friendsRequest = val
    state.requestNum = 0
  },

  // 获取好友请求
  [types.GET_FRIENDS_REQUEST](state, val) {
    state.request.push(val)
    state.requestNum = state.request.length
  }
}