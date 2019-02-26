<template>
  <div class="send-box">
    <div class="header">
      <mu-appbar
        style="width: 100%;"
        color="#fff"
        z-depth=0
      >
        <mu-button
          slot="left"
          class="button"
          @click="closeSend"
        >
          取消
        </mu-button>
        <div class="title">发表文字</div>
        <mu-button
          slot="right"
          class="button right"
          color="#66bb6a"
          @click="sendMsg"
        >
          发表
        </mu-button>
      </mu-appbar>
    </div>
    <div class="text-container">
      <textarea
        class="txt"
        placeholder="这一刻的想法"
        v-model="sendCircleMsg"
      ></textarea>
    </div>
    <div class="choose-list">
      <mu-divider></mu-divider>
      <mu-list>
        <mu-list-item
          avatar
          button
        >
          <mu-list-item-action>
            <mu-icon value="location_on"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>所在位置</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon value="chevron_right"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item
          avatar
          button
        >
          <mu-list-item-action>
            <mu-icon value="person"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>可浏览的联络人</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon value="chevron_right"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item
          avatar
          button
        >
          <mu-list-item-action>
            <mu-icon value="present_to_all"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>提醒谁看</mu-list-item-title>
          <mu-list-item-action>
            <mu-icon value="chevron_right"></mu-icon>
          </mu-list-item-action>
        </mu-list-item>
      </mu-list>
      <mu-divider></mu-divider>
    </div>
  </div>
</template>
<script>
export default {
  name: "SendFriendCircle",
  data() {
    return {
      sendCircleMsg: ""
    };
  },
  methods: {
    sendMsg() {
      if (this.sendCircleMsg === "") {
        return;
      }
      let user = this.$store.state.data.self;
      let msgData = {
        headerUrl: user.avatar,
        nickname: user.nickname,
        remark: user.name,
        paragraph: this.sendCircleMsg,
        timestamp: "刚刚",
        thumbnails: [
          //   {
          //     imgSrc: ""
          //   }
        ],
        liketext: [],
        likeWxId: [],
        offlike: false,
        from: "",
        tag: "",
        desc: {}
      };
      this.$store.commit("SET_MOMENTS", msgData);
      this.closeSend();
    },
    closeSend() {
      this.$store.commit("TOGGLE_SEND_FRIEND_CIRCLE", false);
    }
  }
};
</script>
<style scoped>
.send-box {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  z-index: 11;
}
.header .title {
  text-align: center;
}
.header .button {
  min-width: 65px;
  box-shadow: none;
}
.header .button.right {
  color: #fff;
}
.text-container {
  width: 100%;
}
.text-container .txt {
  width: 100%;
  height: 300px;
  padding: 0 20px;
  margin: 20px 0;
  border: 0;
  outline: 0;
  resize: none;
  overflow-y: visible;
  font-size: 16px;
}
</style>
