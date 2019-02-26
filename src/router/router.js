import Vue from 'vue'
import Router from 'vue-router'
import Choose from "../views/login&register/Choose.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'choose',
      component: Choose
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/login&register/Register.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login&register/Login.vue')
    },
    {
      path: '/message',
      name: 'message',
      component: () => import('../views/Message.vue')
    },
    {
      path: '/friends',
      name: 'friends',
      component: () => import('../views/Friends.vue'),
    },
    {
      path: '/addFriends',
      name: 'addFriends',
      component: () => import('../views/friendsView/AddFriends.vue')
    },
    {
      path: '/friendsInfo',
      name: 'friendsInfo',
      component: () => import('../views/friendsView/FriendInfo.vue'),
    },
    {
      path: '/discover',
      name: 'discover',
      component: () => import('../views/Discover.vue')
    },
    {
      path: '/mine',
      name: 'mine',
      component: () => import('../views/Mine.vue')
    },
    {
      path: '/circle',
      name: 'circle',
      component: () => import('../views/discoverView/FriendCircle.vue')
    },
    {
      path: '/calling',
      name: 'calling',
      component: () => import('../components/PhoneCall.vue')
    }
  ]
})
