<template>
  <div class="discover">
    <div
      class="header"
      ref="header"
    >
      <mu-appbar
        style="width: 100%;"
        color="#fff"
      >
        发现
      </mu-appbar>
    </div>
    <div
      class="container"
      ref="container"
    >
      <div class="scroll-box">
        <div class="list-box">
          <mu-list>
            <router-link to="/circle">
              <mu-list-item
                avatar
                button
              >
                <mu-list-item-action>
                  <mu-icon
                    value="camera"
                    color="#7c4dff"
                  ></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title>朋友圈</mu-list-item-title>
                <mu-list-item-action>
                  <mu-icon value="chevron_right"></mu-icon>
                </mu-list-item-action>
              </mu-list-item>
            </router-link>
          </mu-list>
        </div>
        <div class="list-box">
          <mu-list>
            <mu-list-item
              avatar
              button
            >
              <mu-list-item-action>
                <mu-icon
                  value="crop"
                  color="#1565c0"
                ></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>扫描</mu-list-item-title>
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
                  value="screen_rotation"
                  color="#1565c0"
                ></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>摇一摇</mu-list-item-title>
              <mu-list-item-action>
                <mu-icon value="chevron_right"></mu-icon>
              </mu-list-item-action>
            </mu-list-item>
          </mu-list>
        </div>
        <div class="list-box">
          <mu-list>
            <mu-list-item
              avatar
              button
            >
              <mu-list-item-action>
                <mu-icon
                  value="brightness_low"
                  color="#ffa726"
                ></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>看一看</mu-list-item-title>
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
                  value="search"
                  color="red"
                ></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>搜一搜</mu-list-item-title>
              <mu-list-item-action>
                <mu-icon value="chevron_right"></mu-icon>
              </mu-list-item-action>
            </mu-list-item>
          </mu-list>
        </div>
        <div class="list-box">
          <mu-list>
            <mu-list-item
              avatar
              button
            >
              <mu-list-item-action>
                <mu-icon
                  value="people"
                  color="#1565c0"
                ></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>附近的人</mu-list-item-title>
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
                  value="opacity"
                  color="#3f51b5"
                ></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>漂流瓶</mu-list-item-title>
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
                  value="location_on"
                  color="red"
                ></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>附近的餐厅</mu-list-item-title>
              <mu-list-item-action>
                <mu-icon value="chevron_right"></mu-icon>
              </mu-list-item-action>
            </mu-list-item>
          </mu-list>
        </div>
        <div class="list-box">
          <mu-list>
            <mu-list-item
              avatar
              button
            >
              <mu-list-item-action>
                <mu-icon
                  value="gamepad"
                  color="#d500f9"
                ></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>游戏</mu-list-item-title>
              <mu-list-item-action>
                <mu-icon value="chevron_right"></mu-icon>
              </mu-list-item-action>
            </mu-list-item>
          </mu-list>
        </div>
        <div class="list-box">
          <mu-list>
            <mu-list-item
              avatar
              button
            >
              <mu-list-item-action>
                <mu-icon
                  value="videogame_asset"
                  color="#e1bee7"
                ></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>小程序</mu-list-item-title>
              <mu-list-item-action>
                <mu-icon value="chevron_right"></mu-icon>
              </mu-list-item-action>
            </mu-list-item>
          </mu-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "Discover",
  methods: {
    _initScroll() {
      this.$nextTick(() => {
        let containerHeight =
          window.screen.height - this.$refs.header.clientHeight + "px";
        this.$refs.container.style.height = containerHeight;
        if (!this.msgScroll) {
          this.msgScroll = new BScroll(this.$refs.container, {
            scrollY: true,
            click: true
          });
        } else {
          this.msgScroll.refresh();
        }
      });
    },
  },
  created() {
    this._initScroll();
  }
};
</script>
<style scoped>
.discover {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #f6f6f6;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  z-index: 10;
}
.container {
  margin-top: 60px;
}
.scroll-box {
  padding-bottom: 50px;
}
.list-box {
  background-color: #fff;
  margin-bottom: 10px;
}
</style>
