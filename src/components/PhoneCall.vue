<template>
  <div class="phone-call">
    <div class="container">
      <div class="avatar-box">
        <mu-avatar
          :size="100"
          class="avatar"
        >
          <img :src='user.avatar'>
        </mu-avatar>
      </div>
      <div class="time-box">

      </div>
      <div
        class="button"
        v-if="curBtn === false"
      >
        <mu-button
          large
          fab
          color="red"
          @click="endCall()"
        >
          <mu-icon value="phone"></mu-icon>
        </mu-button>
      </div>
      <div
        class="button two-btn"
        v-else
      >
        <mu-button
          large
          fab
          color="green"
          @click="acceptCall()"
          class="green-btn"
        >
          <mu-icon value="phone"></mu-icon>
        </mu-button>
        <mu-button
          large
          fab
          color="red"
          @click="endCall()"
          class="red-btn"
        >
          <mu-icon value="phone"></mu-icon>
        </mu-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "PhoneCall",
  data() {
    return {
      user: "",
      curBtn: false,
      second: 0
    };
  },
  methods: {
    endCall() {
      this.$rtcCall.endCall();
      this.$router.push({ path: "/friends" });
    },
    acceptCall() {
      this.curBtn = false;
      this.$rtcCall.acceptCall();
    },
    // countTime() {
    //   this.second = this.second + 1;
    //   // this.second = this.second + 1 > 9 ? this.second : "0" + this.second;
    //   console.log(this.second);
    // }
  },
  created() {
    // setInterval(this.countTime, 1000);
    this.user = this.$route.query.user;
    this.curBtn = this.$route.query.curBtn || false;
  }
};
</script>
<style scoped>
.phone-call {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #9e9e9e;
  z-index: 11;
}
.avatar-box {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
}
.avatar-box .avatar,
.avatar img {
  border-radius: 0;
}
.button {
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
}
.two-btn {
  width: 70%;
}
.green-btn,
.red-btn {
  position: absolute;
  bottom: 0px;
}
.green-btn {
  left: 0px;
}
.red-btn {
  right: 0px;
}
</style>
