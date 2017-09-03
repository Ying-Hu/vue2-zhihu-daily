import Vue from 'vue'
import Router from 'vue-router'
import Home from 'views/home'
import Test from 'views/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
})
