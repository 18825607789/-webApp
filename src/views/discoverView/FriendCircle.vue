<template>
  <div class="friend-circle">
    <div class="header">
      <mu-appbar
        style="width: 100%;"
        color="transparent"
        z-depth=0
      >
        <mu-button
          icon
          slot="left"
          @click="closeFirendCircle"
        >
          <mu-icon
            value="arrow_back"
            color="#fff"
          ></mu-icon>
        </mu-button>
        <div class="title">朋友圈</div>
        <mu-button
          icon
          slot="right"
          @click="openSend"
        >
          <mu-icon
            value="photo_camera"
            color="#fff"
          ></mu-icon>
        </mu-button>
      </mu-appbar>
    </div>
    <div
      class="container"
      ref="container"
    >
      <div class="scroll-box">
        <div class="top">
          <div class="info clearfix">
            <div class="name">{{this.$store.state.data.self.nickname}}</div>
            <div class="avatar">
              <img :src="this.$store.state.data.self.avatar">
            </div>
          </div>
        </div>
        <div class="moments-item">
          <div
            class="list-item"
            v-for="(item,index) in circleData"
            :key="index"
          >
            <div class="avatar">
              <img :src="item.headerUrl">
            </div>
            <div class="content">
              <div class="name">{{item.nickname}}</div>
              <div class="text">
                {{item.paragraph}}
              </div>
              <div class="img-box">
                <div
                  class="img"
                  v-for="(img,index) in item.thumbnails"
                  :key="index"
                >
                  <img :src="img.imgSrc">
                </div>
              </div>
              <div class="good-and-comment clearfix">
                <div class="time-stamp">{{item.timestamp}}</div>
                <div
                  class="show-btn"
                  @click="toggleShowList(index)"
                >...</div>
                <transition name="move">
                  <div
                    class="show-list"
                    v-if="currentIndex === index"
                  >
                    <mu-button
                      flat
                      slot="left"
                      class="button"
                      v-if="!item.offlike"
                      @click="like(index)"
                    >
                      <mu-icon
                        value="favorite_border"
                        color="#fff"
                      ></mu-icon>
                      <div class="title">赞</div>
                    </mu-button>
                    <mu-button
                      flat
                      slot="left"
                      class="button"
                      v-else
                      @click="offLike(index)"
                    >
                      <mu-icon
                        value="favorite_border"
                        color="#fff"
                      ></mu-icon>
                      <div class="title">取消</div>
                    </mu-button>
                    <mu-button
                      flat
                      slot="right"
                      class="button"
                      @click="comment(index)"
                    >
                      <mu-icon
                        value="chat_bubble_outline"
                        color="#fff"
                      ></mu-icon>
                      <div class="title">评论</div>
                    </mu-button>
                  </div>
                </transition>
              </div>
              <div
                class="good-name"
                v-if="item.liketext.length != 0"
                ref="goodNameBox"
              >
                <span
                  v-for="(name,index) in item.liketext"
                  :key="index"
                >
                  <label>
                    <mu-icon
                      value="favorite_border"
                      size="20"
                      class="icon"
                    ></mu-icon>{{name}}
                  </label>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "FriendCircle",
  data() {
    return {
      currentIndex: "",
      circleData: []
    };
  },
  methods: {
    _initScroll() {
      this.$nextTick(() => {
        if (!this.circleScroll) {
          this.circleScroll = new BScroll(this.$refs.container, {
            scrollY: true,
            click: true
          });
        } else {
          this.circleScroll.refresh();
        }
      });
    },
    closeFirendCircle() {
      this.$router.go(-1);
    },
    toggleShowList(i) {
      if (this.currentIndex === i) {
        this.currentIndex = "";
      } else {
        this.currentIndex = i;
      }
    },
    like(i) {
      let obj = {
        index: i,
        name: this.$store.state.data.self.nickname,
        username: this.$store.state.data.self.username
      };
      this.$store.commit("SET_LIKE", obj);
      this.currentIndex = "";
    },
    offLike(i) {
      let obj = {
        index: i,
        name: this.$store.state.data.self.nickname,
        username: this.$store.state.data.self.username
      };
      this.$store.commit("SET_OFF_LIKE", obj);
      this.currentIndex = "";
    },
    openSend() {
      this.$store.commit("TOGGLE_SEND_FRIEND_CIRCLE", true);
    }
  },
  created() {
    this._initScroll();
    this.circleData = this.$store.state.data.cricle;
  },
  updated() {
    this._initScroll();
  }
};
</script>
<style scoped>
.friend-circle {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  z-index: 11;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}
.header .title {
  text-align: center;
  color: #fff;
}
.container {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
}
.container .top {
  position: relative;
  width: 100%;
  padding: 120px 0;
  background: url("../../assets/img/circle_bg.jpg") no-repeat center center;
}
.top .info {
  display: flex;
  position: absolute;
  right: 0;
  bottom: -10%;
  vertical-align: bottom;
}
.info .name {
  flex: 1;
  line-height: 80px;
  font-size: 22px;
  color: #fff;
}
.info .avatar {
  flex: 0 0 auto;
  width: 75px;
  height: 75px;
  margin: 0px 15px;
  padding: 5px;
  border-radius: 5px;
  background-color: #fff;
}
.avatar img {
  width: 100%;
  height: 100%;
}
.moments-item {
  width: 95%;
  margin: 0 auto;
  padding-bottom: 60px;
}
.moments-item .list-item {
  display: flex;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #e2e2e2;
}
.list-item .avatar {
  flex: 0 0 auto;
  width: 60px;
  height: 60px;
  overflow: hidden;
  border-radius: 5px;
}
.list-item .content {
  flex: 1;
  margin-left: 10px;
}
.content .name {
  max-width: 150px;
  font-size: 16px;
  font-weight: bold;
  color: #304ffe;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.content .text {
  line-height: 25px;
  word-break: break-all;
}

.img-box .img {
  display: inline-block;
  width: 70px;
  height: 70px;
  margin: 10px 20px 0 0;
}
.img-box .img img {
  width: 100%;
  height: 100%;
}
.good-and-comment {
  position: relative;
  width: 100%;
  height: 20px;
  margin-top: 6px;
  line-height: 20px;
}
.good-and-comment .time-stamp {
  float: left;
  color: #757575;
}
.good-and-comment .show-btn {
  float: right;
  width: 30px;
  height: 20px;
  line-height: 10px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  background-color: #e0e0e0;
}
.good-and-comment .show-list {
  position: absolute;
  top: -5px;
  right: 35px;
  width: 180px;
  height: 30px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.7);
}
.show-list .button {
  height: 32px;
  color: #fff;
}
.button .title {
  margin-left: 5px;
}
.good-name {
  width: 100%;
  margin-top: 10px;
  padding: 2px 4px;
  line-height: 20px;
  font-size: 3px;
  background-color: #d8d3d3;
}
.good-name span {
  margin-right: 5px;
  color: #03157a;
}
.good-name .icon {
  vertical-align: middle;
}
.move-enter,
.move-leave-to {
  transform: translateX(30%);
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
  transform: translateX(-30%);
  opacity: 1;
}
</style>
