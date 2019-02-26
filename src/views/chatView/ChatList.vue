<template>
  <div class="chat-lists">
    <div
      class="msg"
      :class="{self:msg.self}"
      v-for="msg in msgList"
      :key="msg.time"
    >
      <div class="avatar">
        <img
          :src="msg.self ? `${self.avatar}` : `${friend.avatar}`"
          width="100%"
          height="100%"
        >
      </div>
      <div
        class="bubble"
        v-html="dealMessage(msg.emojiMessage)"
      ></div>
    </div>
    <div ref="bottom"></div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { handleMessage } from "../../assets/js/tool.js";
export default {
  name: "ChatList",
  computed: {
    ...mapState({
      friend: "curUser",
      self: state => state.data.self,
      msgList: state => state.curMsgList.list
    })
  },
  watch: {
    msgList() {
      this.$parent.scrollToBottom();
    }
  },
  methods: {
    dealMessage(message) {
      return handleMessage(message);
    }
  }
};
</script>
<style scoped>
.chat-lists .msg {
  width: 100%;
  padding: 5px 10px;
  box-sizing: border-box;
  margin-top: 10px;
  font-size: 0;
}
.msg .avatar {
  display: inline-block;
  width: 40px;
  height: 40px;
  overflow: hidden;
  background: #fff;
}
.msg .bubble {
  display: inline-block;
  vertical-align: top;
  margin-left: 5px;
  padding: 10px;
  border-radius: 4px;
  line-height: 20px;
  max-width: 50%;
  word-wrap: break-word;
  font-size: 14px;
  background: #f2f2f2;
}
.msg.self {
  text-align: right;
}
.msg.self .avatar {
  float: right;
  margin-left: 5px;
}
.msg.self .bubble {
  background: rgb(46, 125, 50);
  text-align: left;
  color: #fff;
}
</style>
