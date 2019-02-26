<template>
  <div class="add-friends">
    <div class="header">
      <mu-appbar
        style="width: 100%;"
        color="#fff"
      >
        <mu-button
          icon
          slot="left"
          @click="closeAdd"
        >
          <mu-icon value="arrow_back"></mu-icon>
        </mu-button>
        添加好友
      </mu-appbar>
    </div>
    <div class="container">
      <div class="form">
        <mu-text-field
          label="请输入用户ID"
          label-float
          full-width
          class="input"
          v-model="value"
        ></mu-text-field>
        <mu-button
          color="#4caf50"
          class="button"
          @click="searchFriends(value)"
          v-show="value"
        >搜索</mu-button>
      </div>
      <div
        class="list"
        v-if="result != ''"
      >
        <mu-list class="list">
          <div class="list-item">
            <mu-list-item avatar>
              <mu-list-item-action>
                <mu-avatar class="avatar-pic">
                  <img
                    :src="result.avatar"
                    class="pic"
                  >
                </mu-avatar>
              </mu-list-item-action>
              <mu-list-item-title>{{result.nickname}}</mu-list-item-title>
              <mu-list-item-action>
                <mu-button
                  color="#4caf50"
                  class="button"
                  @click="addFriend(result.username)"
                >添加</mu-button>
              </mu-list-item-action>
            </mu-list-item>
            <mu-divider></mu-divider>
          </div>
        </mu-list>
      </div>
      <div
        class="none"
        v-else
      >没有数据</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AddFriends",
  data() {
    return {
      value: "",
      result: ""
    };
  },
  watch: {
    value(newVal, oldVal) {
      this.result = "";
      this.searchFriends(newVal);
    }
  },
  methods: {
    closeAdd() {
      this.$router.back();
    },
    searchFriends(val) {
      if (!window.localStorage) {
        // console.log("浏览器不支持localstorage");
        return false;
      } else {
        let storage = window.localStorage;
        let jsonData = [];
        for (let i = 0; i < storage.length - 1; i++) {
          jsonData.push(JSON.parse(storage.getItem(storage.key(i))));
        }
        for (let i in jsonData) {
          if (jsonData[i].username === val) {
            this.result = jsonData[i];
          }
        }
      }
    },
    addFriend(username) {
      this.$imconn.subscribe({
        to: username,
        message: "加个好友呗!"
      });
    }
  }
};
</script>
<style scoped>
.add-friends {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  z-index: 11;
}
.container {
  width: 90%;
  margin: 0 auto;
  padding-top: 50px;
}
.container .form {
  width: 100%;
  padding-bottom: 30px;
}
.form .input {
  margin-bottom: 5px;
}
.form .button {
  color: #fff;
}
.container .list {
  width: 100%;
}
.button {
  color: #fff;
  min-width: 65px;
}
.avatar-pic,
.pic {
  border-radius: 0;
}
.none {
  text-align: center;
  font-size: 20px;
}
</style>
