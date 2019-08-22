import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import UsernameInput from './views/UsernameInput.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/username',
      name: 'username',
      component: UsernameInput
    },
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})
