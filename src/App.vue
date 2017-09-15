<template>
  <div id="app">
    <!-- 头部 -->
    <header class="header">
      <i v-if="true" class="iconfont icon-caidan"></i>
      <div class="title-content">
        <!-- <Loading></Loading> -->
        <h1 class="theme-title">Today Hot News</h1>
      </div>
      <i class="iconfont icon-add"></i>
    </header>
    <!-- 主题选择 -->
    <aside class="aside">
      <!-- 用户信息 -->
      <div class="user-info">
        <img src="http://ol5i1a679.bkt.clouddn.com/head.JPG" class="user-pic">
        <span class="user-name">FerdYing</span>
      </div>
      <!-- 用户操作 -->
      <div class="user-operate">
        <span class="collect op-item">
          <i class="iconfont icon-add"></i>
          <span>收藏</span>
        </span>
        <span class="msg op-item">
          <i class="iconfont icon-add"></i>
          <span>消息</span>
        </span>
        <span class="setting op-item">
          <i class="iconfont icon-add"></i>
          <span>设置</span>
        </span>
      </div>
      <!-- 首页及主题列表 -->
      <div class="list-main">
        <div class="listwrapper" ref="listwrapper">
          <ul class="theme-content">
            <li>
              <span class="home">
                <i class="iconfont icon-add"></i>
                <span>Home</span>
              </span>
              <i class="iconfont icon-add"></i>
            </li>
            <li class="theme" v-for="theme in themeList" :key="theme.id">{{theme.name}} {{theme.id}} <i class="iconfont icon-add"></i></li>
          </ul>
        </div>
      </div>
      <!-- aside footer -->
      <div class="aside-footer">
        <span class="off-line"><i class="iconfont icon-add"></i>离线</span>
        <span class="night-theme"><i class="iconfont icon-add"></i>夜间</span>
      </div>
    </aside>

    <router-view></router-view>
  </div>
</template>

<script>
import Loading from 'components/loading/loading'
import BScroll from 'better-scroll'
import Axios from 'api/index'

const COMPONENT_NAMER = 'app'

export default {
  name: COMPONENT_NAMER,
  data () {
    return {
      themeList: [],
      click: true
    }
  },
  components: {
    Loading
  },
  methods: {
    getThemeList () {
      Axios.getThemes()
      .then(res => {
        this.themeList = res.data.others
        console.log(this.themeList)
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
    left 0
    z-index 9999
    width 5.5rem
    height 100%
    display flex
    padding .3rem
    flex-direction column
    justify-content flex-start
    background-color #232a30
    color #8b9094
    opacity .97
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
        overflow hidden
        .theme-content
          width 100%
          display flex
          flex-direction column
          justify-content flex-start
          li
            display flex
            justify-content space-between
            align-items center
            height 1.18rem
            font-size 14px
            .iconfont
              font-size 22px
          .home
            display flex
            align-items center
            .iconfont
              font-size 22px
              margin-right .3rem


    .aside-footer
      display flex
      justify-content space-between
      font-size 14px
      span
        display flex
        justify-content center
        align-items center
        height .8rem
        margin-right .3rem
        .iconfont
          margin-right .2rem
          font-size 26px
</style>

