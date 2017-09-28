<template>
  <div id="app">
    <!-- 头部 -->
    <header class="header" v-show="headerFlag">
      <i v-if="backFlag" class="iconfont icon-left" @click="showBar"></i>
      <i v-else class="iconfont icon-caidan" @click="showBar"></i>
      <div class="title-content">
        <!-- <Loading></Loading> -->
        <h1 class="theme-title" :title="title">{{title}}</h1>
      </div>
      <i class="iconfont icon-add" v-show="addIcon"></i>
    </header>
    <!-- 主题选择 -->
    <aside class="aside" :class="{showbar: barFlag}">
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
            <li @click="toHome()">
              <span class="home">
                <i class="iconfont icon-homel"></i>
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
        <span class="off-line"><i class="iconfont icon-downloadline"></i>离线</span>
        <span class="night-theme"><i class="iconfont icon-night"></i>夜间</span>
      </div>
    </aside>

      <!-- 遮罩 -->
      <div class="mask" v-if="barFlag" @click="hideBar(false)"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import Loading from 'components/loading/loading'
import BScroll from 'better-scroll'
import Axios from 'api'
import {mapGetters, mapActions} from 'vuex'

const COMPONENT_NAMER = 'app'

export default {
  name: COMPONENT_NAMER,
  data () {
    return {
      headTitle: 'Today Hot News',
      headerFlag: true,
      themeList: [],
      click: true
    }
  },
  components: {
    Loading
  },
  computed: {
    ...mapGetters([
      'backFlag',
      'addIcon',
      'barFlag'
    ]),
    title () {
      let themeId = this.$route.query.id ? this.$route.query.id : ''
      // console.log('themeId', themeId)
      switch (themeId) {
        case 13:
          return '日常心理学'
        case 12:
          return '用户推荐日报'
        case 3:
          return '电影日报'
        case 11:
          return '不许无聊'
        case 4:
          return '设计日报'
        case 5:
          return '大公司日报'
        case 6:
          return '财经日报'
        case 10:
          return '互联网安全'
        case 2:
          return '开始游戏'
        case 7:
          return '音乐日报'
        case 9:
          return '动漫日报'
        case 8:
          return '体育日报'
        default:
          return 'Today Hot News'
      }
    }
  },
  methods: {
    ...mapActions([
      'changeBackFlag',
      'changeAddIcon',
      'changeBarFlag'
    ]),
    showBar () {
      this.changeBarFlag(true)
    },
    hideBar () {
      this.changeBarFlag(false)
    },
    toHome () {
      this.hideBar(false)
      this.changeAddIcon(false)
      this.$router.push({
        path: '/'
      })
    },
    toThemePage (themeId) {
      this.hideBar(false)
      this.changeBackFlag(true)
      this.changeAddIcon(true)
      // console.log(themeId)
      let path = 'theme'
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
    },
    goBack () {
      this.changeBackFlag(false)
    },
    changeHeader () {
      // console.log('watch route')
      let routerName = this.$route.name
      if (routerName === 'theme' || routerName === 'home') {
        this.headerFlag = true
      } else {
        this.headerFlag = false
      }
    }
  },
  created () {
    this.getThemeList()
  },
  watch: {
    '$route': 'changeHeader'
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
    height 1.4rem
    padding 0 0.2rem
    display flex
    align-items center
    z-index 9
    background-image linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.51) 95%)
    .title-content
      display flex
      flex 1
      justify-content center
      align-items center
      .theme-title
        flex 1
        margin-left .1rem
        text-align center
        color #fff
        font-size 0.4rem
    .iconfont
      color #fff
      font-size 0.65rem
  
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
              font-size 22px
              margin-right .2rem


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
