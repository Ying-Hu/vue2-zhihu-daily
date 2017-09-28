import Vue from 'vue'
import Router from 'vue-router'
import Home from 'views/home'
import Theme from 'views/theme'
import newsDetail from 'views/newsDetail'
import newsComments from 'views/newsComments'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'home',
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
      path: '/newsComments',
      name: 'newsComments',
      component: newsComments
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
