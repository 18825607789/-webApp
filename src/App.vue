<template>
  <div id="app">
    <router-view />
    <div class="footer">
      <BottonTab />
    </div>
    <!-- 搜索界面 -->
    <SearchView v-if="searchView" />
    <!-- 聊天界面 -->
    <ChatView v-if="charView" />
    <!-- 发朋友圈 -->
    <SendFriendCircle v-if="sendFriendCircle" />
    <!-- 好友请求 -->
    <keep-alive>
      <FriendsRequest v-if="friendsRequest" />
    </keep-alive>
  </div>
</template>
<script>
import BottonTab from "./components/BottomTab";
import SearchView from "./components/searchView/SearchView";
import ChatView from "./views/chatView/ChatContainer";
import SendFriendCircle from "./views/discoverView/SendFriendCircle";
import FriendsRequest from "./views/friendsView/FriendsRequest";
import { mapState } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapState([
      "searchView",
      "charView",
      "sendFriendCircle",
      "friendsRequest"
    ])
  },
  components: {
    BottonTab,
    SearchView,
    ChatView,
    SendFriendCircle,
    FriendsRequest
  }
};
</script>
<style scoped>
#app {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 10;
}
.friend-cricle {
  z-index: 10;
}
</style>
