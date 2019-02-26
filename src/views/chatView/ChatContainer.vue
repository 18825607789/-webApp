<template>
  <div class="chat-container">
    <div
      class="header"
      ref="header"
    >
      <mu-appbar
        style="width: 100%;"
        color="#fff"
      >
        <mu-button
          icon
          slot="left"
          @click="closeChat"
        >
          <mu-icon value="arrow_back"></mu-icon>
        </mu-button>
        <div class="title">{{curUser.nickname}}</div>
        <mu-button
          icon
          slot="right"
          @click="showFriendInfo(curUser)"
        >
          <mu-icon value="person"></mu-icon>
        </mu-button>
      </mu-appbar>
    </div>
    <div
      class="content"
      ref="msgView"
    >
      <ChatList ref="chatList" />
    </div>
    <div
      class="footer"
      ref="footer"
    >
      <mu-button icon>
        <mu-icon
          value="keyboard_voice"
          class="voice-icon"
        ></mu-icon>
      </mu-button>
      <div class="input-wrapper">
        <div
          class="input"
          @keyup.enter="sendMsg($event)"
          @input="handleInput($event)"
          contenteditable="true"
          ref="input"
        ></div>
      </div>
      <div class="right-icon">
        <mu-button
          icon
          class="button"
          @click="toggleFace()"
        >
          <mu-icon value="tag_faces"></mu-icon>
        </mu-button>
        <mu-button
          icon
          class="button"
        >
          <mu-icon value="add_circle_outline"></mu-icon>
        </mu-button>
      </div>
    </div>
    <transition name="move">
      <div
        class="face"
        v-show="faceShow"
      >
        <div
          class="face-box"
          ref="faceBox"
        >
          <img
            :src="`${publicPath}${img}`"
            v-for="(img,index) in faceImgData"
            :key="index"
            @click="clickFace(img,index)"
          >
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import BScroll from "better-scroll";
import ChatList from "./ChatList";
export default {
  name: "ChatContainer",
  data() {
    return {
      value: "",
      faceShow: false,
      faceImgData: {},
      publicPath: process.env.BASE_URL
    };
  },
  computed: {
    ...mapState(["curUser"])
  },
  methods: {
    ...mapActions(["closeChat", "sendMessage", "showFriendInfo"]),
    handleInput(event) {
      this.value = event.target.innerText;
    },
    _initMsgViewScroll() {
      this.$nextTick(() => {
        let msgViewHeight =
          window.screen.height -
          this.$refs.header.clientHeight -
          this.$refs.footer.clientHeight -
          10 +
          "px";
        this.$refs.msgView.style.height = msgViewHeight;
        if (!this.msgScroll) {
          this.msgScroll = new BScroll(this.$refs.msgView, {
            click: true
          });
        } else {
          this.msgScroll.refresh();
        }
      });
    },
    scrollToBottom() {
      this.$nextTick(() => {
        this.msgScroll.refresh();
        let bottomEl = this.$refs.chatList.$refs.bottom;
        this.msgScroll.scrollToElement(bottomEl, 300);
      });
    },
    sendMsg(event) {
      if (!this.value.trim()) {
        return;
      }
      let that = this;
      let message = this.value;
      this.scrollToBottom();
      // 将当前消息发送给服务器,等待好友回复的消息
      let id = this.$imconn.getUniqueId(); // 生成本地消息id
      let msg = new WebIM.message("txt", id); // 创建文本消息
      msg.set({
        msg: this.value, // 消息内容
        to: this.curUser.username, // 接收消息对象（用户id）
        roomType: false,
        success: function() {
          let emojiMessage = WebIM.utils.parseEmoji(message);
          let time = new Date().getTime();
          let msgItem = { emojiMessage, time, self: true, read: true };
          that.sendMessage(msgItem);
          // console.log("发送成功");
        },
        fail: function() {
          // console.log("发送失败");
        }
      });
      msg.body.chatType = "singleChat";
      this.$imconn.send(msg.body);
      this.value = "";
      event.target.innerText = "";
    },
    getFace() {
      for (let key in WebIM.Emoji.map) {
        this.faceImgData[key] = WebIM.Emoji.path + WebIM.Emoji.map[key];
      }
    },
    clickFace(img, key) {
      this.value =
        "<img class='emoji' style='vertical-align: middle' src='" +
        this.publicPath +
        img +
        "' /><span style='position: absolute; left: 0; opacity: 0;'>" +
        key +
        "</span>";
      let span = document.createElement("span");
      span.innerHTML = this.value;
      this.$refs.input.appendChild(span);
    },
    toggleFace() {
      if (this.faceShow === false) {
        this.faceShow = true;
        this.$refs.footer.style.bottom = 175 + "px";
      } else {
        this.faceShow = false;
        this.$refs.footer.style.bottom = 0 + "px";
      }
    }
  },
  created() {
    this._initMsgViewScroll();
    this.getFace();
  },
  updated() {
    this._initMsgViewScroll();
  },
  components: {
    ChatList
  }
};
</script>
<style scoped>
.chat-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  z-index: 10;
}
.title {
  text-align: center;
}
.content {
  overflow: hidden;
}
.footer {
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-top: 1px solid #e2e2e2;
  background-color: #f6f6f6;
}
.voice-icon {
  flex: 1;
}
.input-wrapper {
  flex: 1;
}
.input-wrapper .input {
  position: relative;
  width: 255px;
  height: 30px;
  margin-top: 8px;
  border-bottom: 1px solid #e2e2e2;
  outline: 0;
  line-height: 30px;
  overflow: hidden;
  white-space: nowrap;
}
.right-icon {
  flex: 1;
}
.right-icon .button {
  width: 35px;
  height: 48px;
}
.face {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 175px;
  background-color: #f6f6f6;
}
.face-box {
  height: 175px;
  margin: 0 auto;
}
.face-box img {
  margin: 2px 0 2px 5px;
}
.move-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.move-enter-active,
.move-leave-active {
  transition: 0.5s all;
}

.move-enter-to {
  transform: translateX(0%);
  opacity: 1;
}

.move-leave {
  transform: translateY(-100%);
  opacity: 1;
}
</style>
