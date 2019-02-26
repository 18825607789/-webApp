import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueTouch from 'vue-touch'
import App from './App.vue'
import router from './router/router'
import store from './store'
import Muse from './muse-ui.config'

// require('../node_modules/easemob-websdk/dist/websdk.shim.js')

Vue.use(Muse)
Vue.use(VueAxios, axios)
Vue.use(VueTouch, { name: 'v-touch' })

Vue.config.productionTip = false

require('./assets/lib/webim/webim.config.js')
require('./assets/lib/webrtc/EMedia_x1v1.js')
let WebIM = require('easemob-websdk')

const conn = new WebIM.connection({
  isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
  https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
  url: WebIM.config.xmppURL,
  heartBeatWait: WebIM.config.heartBeatWait,
  autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
  autoReconnectInterval: WebIM.config.autoReconnectInterval,
  apiUrl: WebIM.config.apiURL,
  isAutoLogin: true
})

WebIM.Emoji = {
  path: 'images/faces/',
  map: {
    '[):]': 'ee_1.png',
    '[:D]': 'ee_2.png',
    '[;)]': 'ee_3.png',
    '[:-o]': 'ee_4.png',
    '[:p]': 'ee_5.png',
    '[(H)]': 'ee_6.png',
    '[:@]': 'ee_7.png',
    '[:s]': 'ee_8.png',
    '[:$]': 'ee_9.png',
    '[:(]': 'ee_10.png',
    '[:\'(]': 'ee_11.png',
    '[:|]': 'ee_12.png',
    '[(a)]': 'ee_13.png',
    '[8o|]': 'ee_14.png',
    '[|]': 'ee_15.png',
    '[+o(]': 'ee_16.png',
    '[<o)]': 'ee_17.png',
    '[|-)]': 'ee_18.png',
    '[*-)]': 'ee_19.png',
    '[:-#]': 'ee_20.png',
    '[:-*]': 'ee_21.png',
    '[^o)]': 'ee_22.png',
    '[8-)]': 'ee_23.png',
    '[(|)]': 'ee_24.png',
    '[(u)]': 'ee_25.png',
    '[(S)]': 'ee_26.png',
    '[(*)]': 'ee_27.png',
    '[(#)]': 'ee_28.png',
    '[(R)]': 'ee_29.png',
    '[({)]': 'ee_30.png',
    '[(})]': 'ee_31.png',
    '[(k)]': 'ee_32.png',
    '[(F)]': 'ee_33.png',
    '[(W)]': 'ee_34.png',
    '[(D)]': 'ee_35.png'
  }
};

conn.listen({
  onOpened: function (message) {
    conn.getRoster({
      success: function (roster) {
        let rosData = [];
        for (var i = 0, l = roster.length; i < l; i++) {
          if (roster[i].subscription === "both") {
            rosData.push(roster[i]);
            store.dispatch('getFriendsData', rosData);
          } else {
            return;
          }
        }
      },
    })
  }, //连接成功回调
  onTextMessage: function (message) {
    store.dispatch('getNewMessage', { msg: message.data, username: message.from })
  }, //收到文本消息
  onEmojiMessage: function (message) {
    for (var i = 0; i < message.data.length; i++) {
      var img = message.data[i];
      var string
      if (img.type == 'txt') {
        string = string + img.data
      } else {
        string = string + '<img class="emoji" style="vertical-align: middle" ' + 'src="' + img.data + '">'
      }
    }
    string = string.replace('undefined', '');
    store.dispatch('getNewMessage', { msg: string, username: message.from })
  }, // 收到表情信息
  onPresence: function (message) {
    if (!window.localStorage) {
      // console.log("浏览器不支持localstorage");
      return false;
    } else {
      if (message.type === 'subscribe' && message.status != '[resp:true]') {
        let storage = window.localStorage;
        let jsonData = [];
        let requestData = [];
        for (let i = 0; i < storage.length - 1; i++) {
          jsonData.push(JSON.parse(storage.getItem(storage.key(i))));
        }
        for (let i in jsonData) {
          if (jsonData[i].username === message.from) {
            requestData.push(Object.assign(jsonData[i], message))
          }
        }
        store.dispatch('getFriendsRequest', requestData)
      }
    }
  },  //处理好友请求  
  onRoster: function () {
    conn.getRoster({
      success: function (roster) {
        let rosData = [];
        for (var i = 0, l = roster.length; i < l; i++) {
          if (roster[i].subscription === "both") {
            rosData.push(roster[i]);
            store.dispatch('getFriendsData', rosData);
          } else {
            return;
          }
        }
      }
    });
  },  //处理好友申请
  onError: function (message) {
    console.log(message)
  } //失败回调
});

const rtcCall = new WebIM.WebRTC.Call({
  connection: conn,
  mediaStreamConstaints: {
    audio: true,
    video: true
  },

  listener: {
    onAcceptCall: function (from, options) {
      // console.log('onAcceptCall::', 'from: ', from, 'options: ', options);
    },
    onGotRemoteStream: function (stream, streamType) {
      // console.log('onGotRemoteStream::', 'stream: ', stream, 'streamType: ', streamType);
    },
    onGotLocalStream: function (stream, streamType) {
      // console.log('onGotLocalStream::', 'stream:', stream, 'streamType: ', streamType);
    },
    onRinging: function (caller) {
      let reg = /(?<=_).*(?=@)/;
      let callerId = (reg.exec(caller))[0];
      let curUser = [];
      let friends = store.state.data.friends;
      for (let i in friends) {
        if (friends[i].username === callerId) {
          curUser = friends[i]
        }
      }
      router.push({ path: "/calling", query: { user: curUser, curBtn: true } });
    },
    onTermCall: function (reason) {
      console.log('onTermCall::');
      console.log('reason:', reason);
    },
    onIceConnectionStateChange: function (iceState) {
      if (iceState === 'closed') {
        router.push({ path: "/friends" })
      }
    },
    onError: function (e) {
      console.log(e);
    }
  }
});

Vue.prototype.$imconn = conn
Vue.prototype.$rtcCall = rtcCall

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 网络请求获取全部数据
store.dispatch('getAllData', axios)