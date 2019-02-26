<template>
  <div class="friends-option">
    <mu-list class="list">
      <mu-list-item
        avatar
        button
        @click="openRequest()"
      >
        <mu-list-item-action>
          <mu-avatar
            color="orange"
            class="avatar-pic"
          >
            <mu-icon value="person_add"></mu-icon>
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-action>
          <mu-list-item-title>朋友推荐信息</mu-list-item-title>
        </mu-list-item-action>
        <mu-list-item-action class="red-point">
          <mu-badge
            :content="requestNum + ''"
            color="red"
            v-show="requestNum > 0"
          ></mu-badge>
        </mu-list-item-action>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item
        avatar
        button
      >
        <mu-list-item-action>
          <mu-avatar
            class="avatar-pic"
            color="#2e7d32"
          >
            <mu-icon value="group"></mu-icon>
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-title>群组</mu-list-item-title>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item
        avatar
        button
      >
        <mu-list-item-action>
          <mu-avatar
            class="avatar-pic"
            color="#1565c0"
          >
            <mu-icon value="local_offer"></mu-icon>
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-title>标签</mu-list-item-title>
      </mu-list-item>
      <mu-divider></mu-divider>
      <mu-list-item
        avatar
        button
      >
        <mu-list-item-action>
          <mu-avatar
            class="avatar-pic"
            color="#1565c0"
          >
            <mu-icon value="person"></mu-icon>
          </mu-avatar>
        </mu-list-item-action>
        <mu-list-item-title>官方账号</mu-list-item-title>
      </mu-list-item>
      <mu-divider></mu-divider>
    </mu-list>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "FriendOption",
  computed: {
    ...mapState(["requestNum"])
  },
  methods: {
    openRequest() {
      this.$store.commit("TPGGLE_FRIENDS_REQUEST", true);
    }
  }
};
</script>
<style scoped>
.list {
  margin-top: 10px;
  background-color: #fff;
}
.avatar-pic {
  border-radius: 0;
}
.red-point {
  position: relative;
  right: -50%;
}
</style>
