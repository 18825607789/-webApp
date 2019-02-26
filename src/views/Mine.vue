<template>
  <div class="mine">
    <div class="mine-container">
      <div class="header">
        <mu-appbar
          style="width: 100%;"
          color="#fff"
        >
          我的
          <mu-button
            icon
            slot="right"
          >
            <mu-icon value="photo_camera"></mu-icon>
          </mu-button>
        </mu-appbar>
      </div>
      <div class="content">
        <div class="top">
          <mu-avatar class="avater">
            <img :src=this.$store.state.data.self.avatar>
          </mu-avatar>
          <div class="info">
            <div class="name">{{this.$store.state.data.self.nickname}}</div>
            <div class="phone">WeChat：&nbsp;{{this.$store.state.data.self.username}}</div>
          </div>
          <div class="icon-box">
            <mu-button
              icon
              slot="right"
            >
              <mu-icon value="chevron_right"></mu-icon>
            </mu-button>
          </div>
        </div>
        <div class="center">
          <mu-list>
            <mu-list-item
              avatar
              button
            >
              <mu-list-item-action>
                <mu-icon
                  value="payment"
                  color="#81c784"
                ></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>Pay</mu-list-item-title>
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
                <mu-icon
                  value="collections"
                  color="#78909c"
                ></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>收藏</mu-list-item-title>
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
                <mu-icon
                  value="insert_photo"
                  color="#81d4fa"
                ></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>我的相簿</mu-list-item-title>
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
                <mu-icon
                  value="local_activity"
                  color="#4e342e"
                ></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>会员卡&优惠券</mu-list-item-title>
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
                <mu-icon
                  value="insert_emoticon"
                  color="#ff9800"
                ></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>贴图集市</mu-list-item-title>
              <mu-list-item-action>
                <mu-icon value="chevron_right"></mu-icon>
              </mu-list-item-action>
            </mu-list-item>
          </mu-list>
        </div>
        <div class="btn-box">
          <mu-button
            class="btn"
            color="red"
            @click="logout"
          >登出</mu-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Mine",
  methods: {
    logout() {
      this.$imconn.close();
      this.$router.push({ name: "choose" });
    }
  }
};
</script>
<style scoped>
.mine-container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #f6f6f6;
  z-index: 10;
}
.top {
  display: flex;
  width: 100%;
  background-color: #fff;
  padding: 10px 0;
}
.avater {
  flex: 0 0 18%;
  height: 70px !important;
  margin: 20px 0 20px 25px;
}
.avater,
.avater img {
  border-radius: 0;
}
.info {
  flex: 0 0 50%;
  margin: 20px 0 20px 15px;
  line-height: 35px;
}
.info .name {
  width: 200px;
  font-size: 20px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.info .phone {
  width: 200px;
  font-size: 16px;
  color: rgb(110, 110, 110);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.icon-box {
  flex: 0 0 10%;
  margin-left: 10px;
  line-height: 110px;
}
.center {
  background-color: #fff;
}
.btn {
  width: 100%;
  height: 60px;
  margin-top: 10px;
  font-size: 20px;
  color: #fff;
}
</style>
