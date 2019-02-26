<template>
  <div class="search-container">
    <div class="header">
      <div class="search">
        <mu-icon
          class="icon search-icon"
          value="search"
          size="18"
          color="#696A6A"
        ></mu-icon>
        <input
          placeholder="搜索"
          v-model="searchStr"
        >
        <mu-icon
          class="icon cancel-icon"
          value="cancel"
          size="20"
          color="#a6a6a6"
          @click="clearList"
        ></mu-icon>
      </div>
      <div
        class="cancel"
        @click="closeSearchView()"
      >取消</div>
    </div>
    <div
      class="container-box"
      v-if="searchStr"
    >
      <mu-list>
        <div
          class="list"
          v-for="item in searchFriends"
          :key="item.username"
          @click="showInfoAndCloseSearch(item)"
        >
          <mu-list-item
            class="item"
            avatar
            button
          >
            <mu-list-item-action>
              <mu-avatar
                :size="50"
                class="avatar-pic"
              >
                <img :src=item.avatar>
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-content>
              <mu-list-item-title>{{item.nickname}}</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-divider></mu-divider>
        </div>
      </mu-list>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "SearchView",
  data() {
    return {
      searchStr: ""
    };
  },
  computed: {
    searchFriends() {
      if (!this.searchStr.trim()) {
        return [];
      }
      return this.$store.state.data.friends.filter(f => {
        let reg = new RegExp(this.searchStr, "img");
        return reg.test(f.nickname);
      });
    }
  },
  methods: {
    ...mapActions(["showFriendInfo"]),
    closeSearchView() {
      this.$store.commit("TOGGLE_SEARCH_VIEW", false);
    },
    clearList() {
      this.searchStr = "";
    },
    showInfoAndCloseSearch(friend) {
      this.showFriendInfo(friend);
      this.closeSearchView();
    }
  }
};
</script>
<style scoped>
.search-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 15;
  background: #fff;
}
.search-container .header {
  box-sizing: border-box;
  display: flex;
  height: 44px;
  padding: 10px;
  border-bottom: 1px solid #e2e2e2;
}

.search-container .search {
  flex: 1;
  position: relative;
  margin-right: 5px;
}

.search-container .search input {
  box-sizing: border-box;
  padding: 0 25px;
  width: 100%;
  height: 100%;
  border: 0;
  outline: 0;
  background: rgba(7, 17, 27, 0.1);
  border-radius: 8px;
}

.search-container .icon {
  position: absolute;
  display: inline-block;
  height: 24px;
  line-height: 24px;
}

.icon.search-icon {
  top: 0px;
  left: 5px;
}

.icon.cancel-icon {
  right: 2px;
}

.header .cancel {
  height: 24px;
  line-height: 24px;
  color: #a6a6a6;
}
.avatar-pic {
  margin-right: 10px;
}
.avatar-pic img {
  border-radius: 0;
}
</style>
