import Vue from 'vue'
import Router from 'vue-router'
import Home from 'views/home'
import Test from 'views/test'
import Theme from 'views/theme'
import newsDetail from 'views/newsDetail'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/theme',
      name: 'theme',
      component: Theme
    },
    {
      path: '/newsDetail',
      name: 'newsDetail',
      component: newsDetail
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
