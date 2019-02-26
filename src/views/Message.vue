<template>
  <div class="message">
    <div
      class="header"
      ref="header"
    >
      <mu-appbar
        style="width: 100%;"
        color="#fff"
      >
        聊天
        <mu-menu slot="right">
          <mu-button flat>
            <mu-icon value="control_point"></mu-icon>
          </mu-button>
          <mu-list slot="content">
            <mu-list-item
              button
              @click="showSearchView()"
            >
              <mu-list-item-action>
                <mu-icon value="chat_bubble"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>新聊天</mu-list-item-title>
            </mu-list-item>
            <mu-list-item
              button
              @click="toAdd()"
            >
              <mu-list-item-action>
                <mu-icon value="person_add"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>新增朋友</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button>
              <mu-list-item-action>
                <mu-icon value="crop"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>扫描</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button>
              <mu-list-item-action>
                <mu-icon value="account_balance_wallet"></mu-icon>
              </mu-list-item-action>
              <mu-list-item-title>收付款</mu-list-item-title>
            </mu-list-item>
          </mu-list>
        </mu-menu>
      </mu-appbar>
    </div>
    <!-- 搜索框 -->
    <div
      ref="search"
      class="search"
    >
      <Search />
    </div>
    <!-- 搜索框 -->
    <div
      class="message-container"
      ref="msgCon"
    >
      <div class="scroll-box">
        <div
          class="no-msg"
          v-if="msgViewList.length === 0"
        >没有数据</div>
        <mu-list
          textline="two-line"
          v-else
        >
          <div
            class="list"
            v-for="f in msgViewList"
            :key="f.username"
          >
            <v-touch
              @swipeleft="onSwipeleft(f.username)"
              @swiperight="cancelRemove"
            >
              <mu-list-item
                class="item"
                :class="{remove:f.username===currentId}"
                avatar
                button
                @click="openChat(f)"
              >
                <mu-list-item-action>
                  <mu-avatar
                    :size="50"
                    class="avatar-pic"
                  >
                    <img :src=f.avatar>
                  </mu-avatar>
                  <mu-badge
                    :content="f.unreadNum + ''"
                    color="red"
                    v-show="f.unreadNum"
                    class="red-point"
                  ></mu-badge>
                </mu-list-item-action>
                <mu-list-item-content>
                  <mu-list-item-title>{{f.nickname}}</mu-list-item-title>
                  <mu-list-item-sub-title v-html="dealMessage(f.lastMessaage.emojiMessage)"></mu-list-item-sub-title>
                </mu-list-item-content>
                <mu-list-item-action class="desc">
                  <mu-list-item-title>
                    <span
                      class="time"
                      v-if="f.lastMessaage.time"
                    >{{f.lastMessaage.time | getTime}}</span>
                  </mu-list-item-title>
                  <mu-list-item-sub-title>
                    <div class="box"></div>
                  </mu-list-item-sub-title>
                </mu-list-item-action>
              </mu-list-item>
            </v-touch>
            <div
              class="btn idRead-btn"
              @click="toggleRead(f.username)"
            >{{f.unreadNum ? '标记已读' : "标记未读"}}</div>
            <div
              class="btn delete-btn"
              @click="deleteMsg(f.username)"
            >删除</div>
            <mu-divider></mu-divider>
          </div>
        </mu-list>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import BScroll from "better-scroll";
import { timeDesc, handleMessage } from "../assets/js/tool";
import Search from "../components/Search";
export default {
  name: "Message",
  data() {
    return {
      currentId: null
    };
  },
  computed: {
    ...mapGetters(["msgViewList"])
  },
  methods: {
    ...mapActions(["showChat"]),
    onSwipeleft(id) {
      this.currentId = id;
    },
    cancelRemove() {
      this.currentId = null;
    },
    toggleRead(username) {
      this.$store.commit("TOGGET_READ", {
        username: username,
        msgViewList: this.msgViewList
      });
      this.cancelRemove();
    },
    deleteMsg(id) {
      this.$store.commit("DELETD_MESSAGE", id);
    },
    openChat(friend) {
      this.showChat(friend);
      this.cancelRemove();
    },
    showSearchView() {
      this.$store.commit("TOGGLE_SEARCH_VIEW", true);
    },
    _initMsgScroll() {
      let msgConHeight =
        window.screen.height -
        this.$refs.header.clientHeight -
        this.$refs.search.clientHeight +
        "px";
      this.$refs.msgCon.style.height = msgConHeight;
      if (!this.msgScroll) {
        this.msgScroll = new BScroll(this.$refs.msgCon, {
          scrollY: true,
          click: true
        });
      } else {
        this.msgScroll.refresh();
      }
    },
    dealMessage(message) {
      return handleMessage(message);
    },
    toAdd() {
      this.$router.push({ path: "/addFriends" });
    }
  },
  created() {
    this.$nextTick(() => {
      this._initMsgScroll();
    });
  },
  updated() {
    this._initMsgScroll();
  },
  filters: {
    getTime(val) {
      return timeDesc(val);
    }
  },
  components: {
    Search
  }
};
</script>
<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}
.mu-item-action {
  min-width: 34px;
}
.search {
  margin-top: 60px;
  z-index: 20;
}
.avatar-pic {
  margin-right: 10px;
}
.avatar-pic img {
  border-radius: 0;
}
.list {
  position: relative;
}
.item {
  background: #fff;
  position: relative;
  transition: all 0.3s linear;
  z-index: 10;
}
.item.remove {
  transform: translateX(-130px);
}
.red-point {
  top: -55px;
  left: -5px;
}
.box {
  height: 20px;
}
.btn {
  position: absolute;
  top: 0.5px;
  width: 50px;
  height: 98%;
  line-height: 72px;
  text-align: center;
  color: #fff;
  z-index: 2;
}
.btn.delete-btn {
  right: 0;
  background: red;
}
.btn.idRead-btn {
  width: 80px;
  right: 50px;
  background: #ccc;
}
.scroll-box {
  padding-bottom: 50px;
}
.no-msg {
  text-align: center;
  margin-top: 100px;
  font-size: 20px;
}
</style>
