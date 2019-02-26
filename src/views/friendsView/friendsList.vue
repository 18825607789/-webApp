<template>
  <div class="friends-list">
    <div ref="scrollBox">
      <div class="scroll-container">
        <mu-list class="list">
          <div
            class="list-item"
            v-for="(item,key) in newFriendsList"
            :key="key"
          >
            <div
              class="Letter"
              ref="letter"
            >{{key}}</div>
            <div
              v-for="(f,index) in item"
              :key="index"
              @click="showFriendInfo(f)"
            >
              <mu-list-item
                avatar
                button
              >
                <mu-list-item-action>
                  <mu-avatar class="avatar-pic">
                    <img
                      :src="f.avatar"
                      class="pic"
                    >
                  </mu-avatar>
                </mu-list-item-action>
                <mu-list-item-title>{{f.nickname}}</mu-list-item-title>
              </mu-list-item>
              <mu-divider></mu-divider>
            </div>
          </div>
        </mu-list>
      </div>
    </div>
    <!-- 字母侧边栏 -->
    <ul class="letter-list">
      <li
        v-for="(item,index) in newFriendsList"
        :key="index"
        :data-index="index"
        @touchstart="onShortcutStart($event)"
        ref="listGroup"
        :class="{con: curIndex === index}"
      >
        {{index}}
      </li>
    </ul>
    <!-- 字母侧边栏 -->
  </div>
</template>
<script>
import BScroll from "better-scroll";
export default {
  name: "FriendsList",
  data() {
    return {
      initList: [],
      newFriendsList: {},
      curIndex: "", // 当前下标
      friends: this.$store.state.data.friends
    };
  },
  watch: {
    friends(newVal, oldVal) {``
      console.log(newVal + "---" + oldVal);
      this.newList();
      this._initScroll();
    }
  },
  methods: {
    showFriendInfo(friend) {
      this.$router.push({
        path: "friendsInfo",
        query: { friendData: friend }
      });
    },
    // 从好友数据中抽取字母字段Letter
    _initList() {
      let allFriends = this.$store.state.data.friends;
      if (!allFriends) {
        return;
      }
      allFriends.map((item, key) => {
        if (this.initList.indexOf(item.Letter.toUpperCase()) === -1) {
          this.initList.push(allFriends[key].Letter.toUpperCase());
        }
        this.initList.sort();
      });
    },
    // 按字母重新排序姓名
    newList() {
      this._initList();
      let allFriends = this.$store.state.data.friends;
      if (!allFriends) {
        return;
      }
      let friendsNum = allFriends.length;
      for (let i = 0; i < this.initList.length; i++) {
        let letter = this.initList[i];
        this.newFriendsList[letter] = [];
        for (let j = 0; j < friendsNum; j++) {
          if (allFriends[j].Letter.toUpperCase() === letter) {
            this.newFriendsList[letter].push(allFriends[j]);
          }
        }
      }
    },
    _initScroll() {
      let containerWidth = window.screen.height - 335 + "px";
      this.$refs.scrollBox.style.height = containerWidth;
      if (!this.friendsScroll) {
        this.friendsScroll = new BScroll(this.$refs.scrollBox, {
          scrollY: true,
          click: true,
          probeType: 3,
          bounce: {
            top: false
          }
        });
      } else {
        this.friendsScroll.refresh();
      }
    },
    onShortcutStart(event) {
      let index = event.target.getAttribute("data-index");
      let letter = this.$refs.letter;
      for (let i = 0; i < letter.length; i++) {
        if (letter[i].innerHTML === index) {
          this.friendsScroll.scrollToElement(letter[i], 1000);
        }
      }
      this.curIndex = index;
    }
  },
  created() {
    this.$nextTick(() => {
      this._initScroll();
    });
    this.newList();
  },
  updated() {
    this._initScroll();
    console.log(this.$store.state.data.friends)
  }
};
</script>
<style scoped>
.friends-list {
  padding-bottom: 50px;
}
.scroll-container {
  padding-bottom: 60px;
}
.letter-list {
  position: fixed;
  top: 50%;
  right: 0px;
  transform: translateY(-50%);
  width: 4%;
  text-align: center;
}
.letter-list li {
  height: 25px;
  line-height: 25px;
}
.letter-list li.con {
  background: rgba(0, 0, 0, 0.2);
}
.list {
  background-color: #fff;
}
.Letter {
  width: 100%;
  padding: 2px 0 2px 5%;
  background-color: #f2f2f2;
  font-size: 16px;
}
.avatar-pic,
.pic {
  border-radius: 0;
}
</style>
