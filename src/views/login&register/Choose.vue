<template>
  <div class="choose">
    <div class="btn-box">
      <router-link
        to="/login"
        class="login"
      >登录</router-link>
      <router-link
        to="/register"
        class="register"
      >注册</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "Choose"
};
</script>
<style scoped>
.choose {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background: url("../../assets/img/choose_bg.jpg");
  background-size: contain;
  z-index: 11;
}
.choose .btn-box {
  position: absolute;
  left: 50%;
  bottom: 15%;
  transform: translateX(-50%);
  width: 80%;
}
.btn-box a {
  display: inline-block;
  width: 35%;
  height: 50px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px #000;
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  color: #fff;
}
.btn-box a.login {
  float: left;
  background-color: #bdbdbd;
}
.btn-box a.register {
  float: right;
  background-color: #b0bec5;
}
</style>
