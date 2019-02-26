<template>
  <div class="login">
    <div class="header">
      <mu-appbar
        style="width: 100%;"
        color="#fff"
      >
        <mu-button
          icon
          slot="left"
          @click="backChoose"
        >
          <mu-icon value="arrow_back"></mu-icon>
        </mu-button>
        登录
      </mu-appbar>
    </div>
    <div class="container">
      <div class="logo"></div>
      <div class="form-items">
        <mu-form
          :model="validateForm"
          ref="form"
        >
          <mu-form-item
            class="item"
            :rules="rules.usernameRules"
            prop="username"
          >
            <mu-text-field
              type="number"
              placeholder="用户名"
              class="input"
              v-model="validateForm.username"
              prop="username"
            ></mu-text-field>
          </mu-form-item>
          <mu-form-item
            class="item"
            :rules="rules.passwordRules"
            prop="password"
          >
            <mu-text-field
              type="password"
              placeholder="密码"
              class="input"
              v-model="validateForm.password"
              prop="password"
            ></mu-text-field>
          </mu-form-item>
          <mu-form-item class="item">
            <mu-button
              class="button"
              color="#4caf50"
              @click="submit"
            >立即登录</mu-button>
          </mu-form-item>
        </mu-form>
      </div>
    </div>
    <alert ref="alert" />
  </div>
</template>
<script>
import WebIM from "easemob-websdk";
import alert from "../../components/Modal";
import { mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      rules: {
        usernameRules: [
          { validate: val => !!val, message: "必须填写用户名" },
          {
            validate: val => !!/^1[34578]\d{9}$/.test(val),
            message: "请输入正确的手机号"
          }
        ],
        passwordRules: [{ validate: val => !!val, message: "必须填写密码" }]
      },
      validateForm: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate().then(res => {
        if (res) {
          let that = this;
          let options = {
            apiUrl: WebIM.config.apiURL,
            user: this.validateForm.username,
            pwd: this.validateForm.password,
            appKey: WebIM.config.appkey,
            success: function() {
              that.$refs.alert.isShowModal = true;
              that.$refs.alert.opts = {
                content: "登录成功"
              };
              setTimeout(() => {
                // 获取现在登录的用户
                that.getUserData();
                // 获取朋友
                that.$refs.alert.isShowModal = false;
                that.$router.push({ name: "message" });
              }, 800);
            },
            error: function() {
              that.$refs.alert.isShowModal = true;
              that.$refs.alert.opts = {
                content: "登录失败，用户名或密码错误"
              };
              setTimeout(() => {
                that.$refs.alert.isShowModal = false;
              }, 800);
            }
          };
          this.$imconn.open(options);
        }
      });
    },
    getUserData() {
      if (!window.localStorage) {
        // console.log("浏览器不支持localstorage");
        return false;
      } else {
        let storage = window.localStorage;
        let userData = JSON.parse(storage.getItem(this.validateForm.username));
        this.$store.commit("SET_CURUSER", userData);
      }
    },
    backChoose() {
      this.$router.push({ name: "choose" });
    }
  },
  components: {
    alert
  }
};
</script>
<style scoped>
.login {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  z-index: 11;
}
.container {
  width: 100%;
}
.container .logo {
  width: 46%;
  height: 100px;
  margin: 50px auto;
  background: url("../../assets/img/logo.png");
  background-size: contain;
}
.form-items {
  width: 90%;
  margin: 0 auto;
}
.form-items .input {
  width: 100%;
}
.form-items .button {
  width: 95%;
  height: 50px;
  font-size: 20px;
  color: #fff;
}
</style>
