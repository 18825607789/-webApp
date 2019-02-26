<template>
  <div class="friend-info">
    <div class="header">
      <mu-appbar
        style="width: 100%;"
        color="#fff"
      >
        <mu-button
          icon
          slot="left"
          @click="closeFriendInfo"
        >
          <mu-icon value="arrow_back"></mu-icon>
        </mu-button>
        <mu-button
          icon
          slot="right"
          @click="openBotttomSheet"
        >
          <mu-icon value="reorder"></mu-icon>
        </mu-button>
      </mu-appbar>
    </div>
    <div class="info-wrapper">
      <div class="top">
        <div class="avatar-box">
          <mu-avatar
            :size="60"
            class="avatar"
          >
            <img :src=curUser.avatar>
          </mu-avatar>
        </div>
        <div class="info">
          <div class="title">{{curUser.nickname}}</div>
          <div class="box phone">tel：{{curUser.phone}}</div>
          <div class="box email">email：{{curUser.email}}</div>
          <div class="box address">address：{{curUser.address}}</div>
        </div>
      </div>
      <div class="content">
        <mu-list>
          <mu-list-item
            avatar
            button
          >
            <mu-list-item-title>设定标签和备注</mu-list-item-title>
            <mu-list-item-action>
              <mu-icon value="chevron_right"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
          <mu-list-item
            avatar
            button
          >
            <mu-list-item-title>个人相册</mu-list-item-title>
            <mu-list-item-action>
              <mu-icon value="chevron_right"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
          <mu-list-item
            avatar
            button
          >
            <mu-list-item-title>更多资讯</mu-list-item-title>
            <mu-list-item-action>
              <mu-icon value="chevron_right"></mu-icon>
            </mu-list-item-action>
          </mu-list-item>
        </mu-list>
      </div>
      <div class="btn-box">
        <mu-button
          class="btn"
          @click="openChat(curUser)"
        >
          传信息
        </mu-button>
        <mu-button
          class="btn"
          @click="callPhone()"
        >
          语音/视频通话
        </mu-button>
      </div>
    </div>
    <div class="button-sheet">
      <mu-bottom-sheet :open.sync="open">
        <mu-list @item-click="closeBottomSheet">
          <mu-list-item button>
            <mu-list-item-title class="title">设置标签和备注</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-title class="title">分享好友</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-title class="title">加入黑名单</mu-list-item-title>
          </mu-list-item>
          <mu-list-item
            button
            @click="delFriend()"
          >
            <mu-list-item-title
              class="title"
              style="color: red"
            >删除好友</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-bottom-sheet>
    </div>
    <Alert ref="alert" />
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Alert from "../../components/Modal";
export default {
  name: "FriendInfo",
  data() {
    return {
      open: false
    };
  },
  computed: {
    ...mapState(["curUser"])
  },
  methods: {
    ...mapActions(["showChat"]),
    openChat(friend) {
      this.showChat(friend);
      this.closeFriendInfo();
    },
    closeBottomSheet() {
      this.open = false;
    },
    openBotttomSheet() {
      this.open = true;
    },
    closeFriendInfo() {
      this.$router.go(-1);
    },
    delFriend() {
      let that = this;
      this.$refs.alert.isShowModal = true;
      this.$refs.alert.opts = {
        content: "是否删除好友" + this.curUser.nickname,
        buttons: {
          确定: () => {
            that.$imconn.removeRoster({
              to: that.curUser.username,
              success: function() {
                let modal = that;
                modal.$imconn.unsubscribed({
                  to: modal.curUser.username
                });
                modal.$refs.alert.opts = {
                  content: "删除成功"
                };
                modal.getFriends();
                setTimeout(function() {
                  modal.$refs.alert.isShowModal = false;
                  modal.closeFriendInfo();
                }, 300);
              },
              error: function() {
                // console.log("失败");
              }
            });
          },
          取消: () => {
            that.$refs.alert.isShowModal = false;
          }
        }
      };
    },
    getUser() {
      let friendData = this.$route.query.friendData;
      this.$store.commit("GET_CURUSER", friendData);
    },
    getFriends() {
      let that = this;
      this.$imconn.getRoster({
        success: function(roster) {
          that.$store.commit("GET_FRIENDS", roster);
        }
      });
    },
    callPhone() {
      this.$rtcCall.caller = this.$store.state.data.self.username;
      this.$rtcCall.makeVoiceCall(this.curUser.username);
      this.$router.push({ path: "/calling", query: { user: this.curUser } });
    }
  },
  created() {
    this.getUser();
  },
  components: {
    Alert
  }
};
</script>
<style scoped>
.friend-info {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #f6f6f6;
  z-index: 11;
}
.info-wrapper .top {
  display: flex;
  width: 100%;
  border-bottom: 1px solid #e2e2e2;
  background-color: #fff;
}
.info-wrapper .avatar-box {
  flex: 0 0 28%;
  padding: 25px 0px 25px 20px;
}
.avatar-box .avatar,
.avatar img {
  border-radius: 0;
}
.info {
  flex: 1;
  padding: 25px 0;
  line-height: 25px;
  font-size: 15px;
  color: rgb(110, 110, 110);
}
.info .title {
  width: 70%;
  margin-bottom: 5px;
  font-size: 20px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #000;
}
.content {
  background-color: #fff;
}
.list {
  margin-bottom: 5px;
}
.btn-box {
  width: 100%;
  margin-top: 10px;
}
.btn-box .btn {
  width: 100%;
  height: 60px;
  font-size: 20px;
}
</style>
