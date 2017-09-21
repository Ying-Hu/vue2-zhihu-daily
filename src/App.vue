<template>
  <div id="app">
    <!-- 头部 -->
    <header class="header">
      <i v-if="true" class="iconfont icon-caidan" @click="toggleBar(true)"></i>
      <i class="iconfont icon-left"></i>
      <div class="title-content">
        <!-- <Loading></Loading> -->
        <h1 class="theme-title">Today Hot News</h1>
      </div>
      <i class="iconfont icon-add"></i>
    </header>
    <!-- 主题选择 -->
    <aside class="aside" :class="{showbar: showbar}">
      <!-- 用户信息 -->
      <div class="user-info">
        <img src="http://ol5i1a679.bkt.clouddn.com/head.JPG" class="user-pic">
        <span class="user-name">FerdYing</span>
      </div>
      <!-- 用户操作 -->
      <div class="user-operate">
        <span class="collect op-item">
          <i class="iconfont icon-collect"></i>
          <span>收藏</span>
        </span>
        <span class="msg op-item">
          <i class="iconfont icon-message"></i>
          <span>消息</span>
        </span>
        <span class="setting op-item">
          <i class="iconfont icon-mzicon-setting"></i>
          <span>设置</span>
        </span>
      </div>
      <!-- 首页及主题列表 -->
      <div class="list-main">
        <div class="listwrapper" ref="listwrapper">
          <ul class="theme-content">
            <li @click="toThemePage(1)">
              <span class="home">
                <i class="iconfont icon-home"></i>
                <span>Home</span>
              </span>
              <i class="iconfont icon-right"></i>
            </li>
            <li class="theme" v-for="theme in themeList" :key="theme.id" @click="toThemePage(theme.id)">{{theme.name}}<i class="iconfont icon-add1"></i></li>
          </ul>
        </div>
      </div>
      <!-- aside footer -->
      <div class="aside-footer">
        <span class="off-line"><i class="iconfont icon-download"></i>离线</span>
        <span class="night-theme"><i class="iconfont icon-night"></i>夜间</span>
      </div>
    </aside>

      <!-- 遮罩 -->
      <div class="mask" v-show="showmask" @click="toggleBar(false)"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import Loading from 'components/loading/loading'
import BScroll from 'better-scroll'
import Axios from 'api'

const COMPONENT_NAMER = 'app'

export default {
  name: COMPONENT_NAMER,
  data () {
    return {
      themeList: [],
      click: true,
      showmask: false,
      showbar: false
    }
  },
  components: {
    Loading
  },
  methods: {
    toggleBar (flag) {
      if (flag) {
        this.showbar = true
        this.showmask = true
      } else {
        this.showbar = false
        this.showmask = false
      }
    },
    toThemePage (themeId) {
      this.toggleBar(false)
      console.log(themeId)
      let path = themeId === 1 ? 'home' : 'theme'
      this.$router.push({
        path: path,
        query: {
          id: themeId || ''
        }
      })
    },
    getThemeList () {
      Axios.getThemes()
      .then(res => {
        this.themeList = res.data.others
        // console.log('主题列表', this.themeList)
        this.$nextTick(() => {
          this._initScroll()
        })
      })
      .catch(err => {
        console.log(err)
      })
    },
    _initScroll () {
      let options = {
        click: this.click
      }
      this.listScroll = new BScroll(this.$refs.listwrapper, options)
    }
  },
  mounted () {
    this.getThemeList()
  }
}
</script>

<style lang="stylus">
  #app
    width 100%
    height 100%
  .header
    position fixed
    top 0
    left 0
    width 100%
    height 1.5rem
    padding 0 0.2rem
    display flex
    justify-content space-between
    align-items center
    z-index 9
    background-image linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.51) 95%)
    .title-content
      display flex
      justify-content center
      align-items center
    .iconfont
      color #fff
      font-size 0.65rem
    .theme-title
      flex 1
      margin-left .1rem
      text-align center
      color #fff
      font-size 0.4rem
  
  .aside
    position absolute
    top 0
    left -5.56rem
    z-index 9999
    width 5.5rem
    height 100%
    display flex
    padding .35rem
    flex-direction column
    justify-content flex-start
    background-color #232a30
    color #8b9094
    opacity .9
    transition: all .3s ease
    .user-info
      width 100%
      display flex
      align-items center
      .user-pic
        width 40px
        height 40px
        border-radius 50%
        margin-right .3rem
      .user-name
        font-size 16px
    .user-operate
      width 100%
      padding-right .5rem
      margin-top .3rem
      margin-bottom .2rem
      font-size 14px
      display flex
      justify-content space-between
      .op-item
        display flex
        flex-direction column
        justify-content center
        align-items center
      .iconfont
        padding-bottom .15rem
        font-size 20px
    .list-main
      flex 1
      position relative
      .listwrapper
        position absolute
        top 0
        left 0
        bottom 0
        right 0
        padding-right .4rem
        overflow hidden
        .theme-content
          width 100%
          padding 0
          display flex
          flex-direction column
          justify-content flex-start
          li
            display flex
            justify-content space-between
            align-items center
            height 1.16rem
            font-size 16px
            .iconfont
              font-size 22px
          .home
            display flex
            align-items center
            .iconfont
              font-size 28px
              margin-right .3rem


    .aside-footer
      display flex
      justify-content space-between
      font-size 14px
      span
        display flex
        justify-content center
        align-items center
        height 1rem
        margin-right .3rem
        .iconfont
          margin-right .2rem
          font-size 26px
  .showbar
    transform: translateX(5.56rem)

  .mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 9998
    background-color #232a30
    opacity .7
</style>

