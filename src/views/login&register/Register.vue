<template>
  <div class="register">
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
        注册
      </mu-appbar>
    </div>
    <div class="container">
      <div class="avatar">
        <div class="line"></div>
        <div class="line vertical"></div>
        <img
          :src="validateForm.img"
          v-if="!(validateForm.img === '')"
        >
        <input
          type="file"
          class="file"
          @change="showAvatar($event)"
        >
      </div>
      <div class="form-items">
        <mu-form
          :model="validateForm"
          ref="form"
        >
          <mu-form-item
            class="item"
            prop="nickname"
            :rules="rules.nicknameRules"
          >
            <mu-text-field
              type="text"
              placeholder="昵称"
              class="input"
              prop="nickname"
              v-model="validateForm.nickname"
            ></mu-text-field>
          </mu-form-item>
          <mu-form-item
            class="item"
            prop="username"
            :rules="rules.usernameRules"
          >
            <mu-text-field
              type="number"
              placeholder="用户名"
              class="input"
              prop="username"
              v-model="validateForm.username"
            ></mu-text-field>
          </mu-form-item>
          <mu-form-item
            class="item"
            prop="password"
            :rules="rules.passwordRules"
          >
            <mu-text-field
              type="password"
              placeholder="密码"
              class="input"
              prop="password"
              v-model="validateForm.password"
            ></mu-text-field>
          </mu-form-item>
          <mu-form-item
            class="item"
            prop="repassword"
            :rules="rules.repasswordRules"
          >
            <mu-text-field
              type="password"
              placeholder="确认密码"
              class="input"
              prop="repassword"
              v-model="validateForm.repassword"
            ></mu-text-field>
          </mu-form-item>
          <mu-form-item class="item">
            <mu-button
              class="button"
              color="#4caf50"
              @click="submit"
            >注册</mu-button>
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
import { getLetter } from "../../assets/js/tool.js";
export default {
  name: "Register",
  data() {
    return {
      rules: {
        nicknameRules: [{ validate: val => !!val, message: "必须填写昵称" }],
        usernameRules: [
          { validate: val => !!val, message: "必须填写用户名" },
          {
            validate: val => !!/^1[34578]\d{9}$/.test(val),
            message: "请输入正确的手机号"
          }
        ],
        passwordRules: [{ validate: val => !!val, message: "必须填写密码" }],
        repasswordRules: [
          { validate: val => !!val, message: "必须确认密码" },
          {
            validate: val => !!(val === this.validateForm.password),
            message: "两次密码不一致"
          }
        ]
      },
      validateForm: {
        img: "",
        nickname: "",
        username: "",
        password: "",
        repassword: ""
      }
    };
  },
  methods: {
    showAvatar(event) {
      let that = this;
      let img = event.target.files[0];
      if (!img) {
        return;
      } else {
        if (!event || !window.FileReader) {
          return;
        }
        let reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onloadend = function() {
          that.validateForm.img = this.result;
        };
      }
    },
    submit() {
      this.$refs.form.validate().then(res => {
        if (res) {
          // console.log('d')
          if (this.validateForm.img === "") {
            this.$refs.alert.isShowModal = true;
            this.$refs.alert.opts = {
              content: "请上传头像"
            };
            setTimeout(() => {
              this.$refs.alert.isShowModal = false;
            }, 800);
          }
          let letter = getLetter(this.validateForm.nickname);
          let obj = {
            avatar: this.validateForm.img,
            nickname: this.validateForm.nickname,
            username: this.validateForm.username,
            Letter: letter,
            phone: "",
            email: "",
            address: ""
          };
          obj = JSON.stringify(obj);
          let that = this;
          let options = {
            username: this.validateForm.username,
            password: this.validateForm.password,
            nickname: this.validateForm.nickname,
            appKey: WebIM.config.appkey,
            success: function() {
              // console.log('A')
              if (!window.localStorage) {
                // console.log("浏览器不支持localstorage");
                return false;
              } else {
                var storage = window.localStorage;
                storage.setItem(that.validateForm.username, obj);
              }
              that.$refs.alert.isShowModal = true;
              that.$refs.alert.opts = {
                content: "注册成功，请登录"
              };
              setTimeout(() => {
                that.$refs.alert.isShowModal = false;
                that.$router.push({ name: "login" });
              }, 800);
            },
            error: function() {
              // console.log('B')
              that.$refs.alert.isShowModal = true;
              that.$refs.alert.opts = {
                content: "注册失败，用户已存在"
              };
              setTimeout(() => {
                that.$refs.alert.isShowModal = false;
              }, 800);
            },
            apiUrl: WebIM.config.apiURL
          };
          this.$imconn.registerUser(options);
        }
      });
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
.register {
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
  padding: 20px;
  font-size: 18px;
}
.container .avatar {
  position: relative;
  width: 90px;
  height: 90px;
  margin: 20px auto;
  background-color: #e2e2e2;
}
.avatar .line {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%);
  width: 50%;
  border: 3px solid #ccc;
}
.avatar .line.vertical {
  transform: rotate(90deg) translateY(22px);
}
.avatar .file {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.avatar img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
