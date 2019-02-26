<template>
  <div class="friends">
    <div class="header">
      <mu-appbar
        style="width: 100%;"
        color="#fff"
      >
        通讯录
        <mu-button
          icon
          slot="right"
          @click="toAdd()"
        >
          <mu-icon value="person_add"></mu-icon>
        </mu-button>
      </mu-appbar>
    </div>
    <!-- 搜索框 -->
    <Search class="search" />
    <!-- 搜索框 -->
    <div
      class="friends-container"
      ref="friendContainer"
    >
      <div class="scroll-box">
        <!-- 朋友列表选项 -->
        <FriendOption />
        <!-- 朋友列表选项 -->
        <!-- 朋友列表 -->
        <FriendsList />
        <!-- 朋友列表 -->
      </div>
    </div>
  </div>
</template>
<script>
import Search from "../components/Search";
import FriendOption from "./friendsView/FriendsOption";
import FriendsList from "./friendsView/friendsList";
export default {
  name: "Friends",
  components: {
    Search,
    FriendOption,
    FriendsList
  },
  methods: {
    toAdd() {
      this.$router.push({ path: "/addFriends" });
    },
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
.search {
  margin-top: 60px;
}
</style>
