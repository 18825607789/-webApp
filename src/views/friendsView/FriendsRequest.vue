<template>
  <div class="friends-request">
    <div class="header">
      <mu-appbar
        style="width: 100%;"
        color="#fff"
      >
        <mu-button
          icon
          slot="left"
          @click="closeRequest"
        >
          <mu-icon value="arrow_back"></mu-icon>
        </mu-button>
        <div class="title">
          好友请求
        </div>
      </mu-appbar>
    </div>
    <div class="list">
      <mu-list class="list">
        <div
          v-for="(user,index) in request"
          :key="index"
        >
          <mu-list-item
            avatar
            button
            :ripple="false"
          >
            <mu-list-item-action>
              <mu-avatar
                :size="50"
                class="avatar-pic"
              >
                <img :src=user[0].avatar>
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>{{user[0].nickname}}</mu-list-item-title>
              <mu-list-item-sub-title>{{user[0].status}}</mu-list-item-sub-title>
            </mu-list-item-content>
            <mu-list-item-action>
              <mu-list-item-content ref="container">
                <mu-button
                  class="button"
                  color="#4caf50"
                  @click="acceptRequest(index,user[0])"
                >接受</mu-button>
                <mu-button
                  class="button"
                  color="red"
                  @click="refuseRequest(index,user[0])"
                >拒绝</mu-button>
              </mu-list-item-content>
            </mu-list-item-action>
          </mu-list-item>
          <mu-divider></mu-divider>
        </div>
      </mu-list>
    </div>
    <!-- <div class="none">没有数据</div> -->
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "FriendsRequest",
  computed: {
    ...mapState(["request"])
  },
  methods: {
    closeRequest() {
      this.$store.commit("TPGGLE_FRIENDS_REQUEST", false);
    },
    acceptRequest(i, data) {
      this.$refs.container[i].innerHTML = '<div class="deal">已处理</div>';
      this.$imconn.subscribed({
        to: data.username,
        message: "[resp:true]"
      });
      this.$imconn.subscribe({
        to: data.from,
        message: "[resp:true]"
      });
    },
    refuseRequest(i, data) {
      this.$refs.container[i].innerHTML = '<div class="deal">已处理</div>';
      this.$imconn.unsubscribed({
        to: data.username,
        message: "rejectAddFriend"
      });
    },
  }
};
</script>
<style scoped>
.friends-request {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  z-index: 11;
}
.avatar-pic {
  margin-right: 10px;
}
.avatar-pic img {
  border-radius: 0;
}
.button {
  min-width: 70px;
  margin-left: 10px;
  color: #fff;
}
</style>
