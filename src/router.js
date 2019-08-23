import Vue from 'vue'
import Router from 'vue-router'
import ListRoom from './views/ListRoom.vue'
import Room from './views/Room.vue'
import UsernameInput from './views/UsernameInput.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'username',
      component: UsernameInput
    },
    {
      path: '/listroom',
      name: 'listroom',
      component: ListRoom
    },
    {
      path: '/room',
      name: 'room',
      component: Room
    }
  ]
})
