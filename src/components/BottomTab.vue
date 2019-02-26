<template>
  <div class="bottom-tab">
    <mu-bottom-nav
      color="#2e7d32"
      :value.sync="tab"
      @change="change"
    >
      <mu-bottom-nav-item
        title="消息"
        value="message"
        icon="chat_bubble"
      ></mu-bottom-nav-item>
      <mu-bottom-nav-item
        title="联系人"
        value="friends"
        icon="group"
      ></mu-bottom-nav-item>
      <mu-bottom-nav-item
        title="发现"
        value="discover"
        icon="explore"
      ></mu-bottom-nav-item>
      <mu-bottom-nav-item
        title="我的"
        value="mine"
        icon="person"
      ></mu-bottom-nav-item>
    </mu-bottom-nav>
  </div>
</template>
<script>
export default {
  name: "BottomTab",
  data() {
    return {
      tab: "message"
    };
  },
  methods: {
    change(val) {
      this.$router.push(val);
    }
  }
};
</script>
<style scoped>
</style>
