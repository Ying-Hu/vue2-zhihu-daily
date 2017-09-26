<template>
  <div class="news-wrapper">
    <Scroll   ref="scroll"
              :data = "[]"
              :click = "click"
              :scrollbar="scrollbarObj"
              :pullUpLoad="pullUpLoadObj"
              :startY="parseInt(startY)"
              @pullingUp="onPullingUp">
      <div class="news-detail" v-if="news">
        <div class="news-head" v-show="news.image">
          <img class="news-pic" :src="news.image">
          <span class="image-source">图片：{{news.image_source}}</span>
          <p class="news-title">{{news.title}}</p>
        </div>
        <div class="news-body" v-html="news.body"></div>
      </div>
    </Scroll>
    <div class="news-footer">
        <i class="iconfont icon-left" @click="goBack"></i>
        <i class="iconfont icon-down1"></i>
        <i class="iconfont icon-good-copy"><sup class="good-number">{{goodNumber}}</sup></i>
        <i class="iconfont icon-share"></i>
        <i class="iconfont icon-message1" @click="toNewsComments"><sup class="conment-number">{{comments}}</sup></i>
    </div>
  </div>
</template>

<script>
import Axios from 'api'
import Scroll from 'components/scroll/scroll'
import {mapActions} from 'vuex'

const COMPONENT_NAMER = 'newsDetail'

export default {
  name: COMPONENT_NAMER,
  data () {
    return {
      news: null,
      goodNumber: '',
      comments: '',
      scrollbar: true,
      scrollbarFade: true,
      pullUpLoad: true,
      pullUpLoadThreshold: 50,
      pullUpLoadMoreTxt: ' ',
      pullUpLoadNoMoreTxt: '没有更多数据了',
      startY: 0,
      click: true
    }
  },
  components: {
    Scroll
  },
  created () {
    this.getNews()
    this.getNewsInfo()
  },
  methods: {
    ...mapActions([
      'changeBackFlag'
    ]),
    getNews () {
      // console.log('router', this.$route.query.id)
      let newsId = this.$route.query.id
      Axios.getNewsById(newsId)
      .then(res => {
        console.log('res.data', res.data)
        this.news = res.data
        // this.addLinkTag(cssurl)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getNewsInfo () {
      let newsId = this.$route.query.id
      Axios.getNewsInfoById(newsId)
      .then(res => {
        console.log('getNewsInfoById', res.data)
        this.goodNumber = res.data.popularity
        this.comments = res.data.comments
      })
      .catch(err => {
        console.log(err)
      })
    },
    // 想通过 link 标签引入样式，但是对侧边栏有影响，考虑到这是通用样式，于是干脆直接通过直接 import css 解决, 根据需要修改了部分样式
    addLinkTag (cssurl) {
      let head = document.getElementsByTagName('head')[0]
      let link = document.querySelector('link[id="newscss"]')
      if (!link) {
        console.log('创建 link 标签')
        let linkTag = document.createElement('link')
        linkTag.setAttribute('id', 'newscss')
        linkTag.setAttribute('rel', 'stylesheet')
        linkTag.href = cssurl
        head.appendChild(linkTag)
      } else {
        console.log('已经存在')
      }
    },
    goBack () {
      this.$router.go(-1)
      this.changeBackFlag(false)
    },
    toNewsComments () {
      let newsId = this.$route.query.id
      let path = 'newsComments'
      this.$router.push({
        path: path,
        query: {
          id: newsId
        }
      })
    },
    // 加载下一条新闻 待做 20170922 00：56
    onPullingUp () {
      // let _this = this
      // 更新数据
      setTimeout(() => {
        // 获取新数据
        console.log('request new data ...')
        // _this.getListByDate(_this.date)
      }, 500)
    }
  },
  computed: {
    scrollbarObj: function () {
      return this.scrollbar ? {fade: this.scrollbarFade} : false
    },
    pullUpLoadObj: function () {
      return this.pullUpLoad ? {threshold: parseInt(this.pullUpLoadThreshold), txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}} : false
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../common/news.css'
  .news-wrapper
    width 100%
    height 100%
    .news-detail
      display flex
      flex-direction column
      justify-content flex-start
      align-items center
      padding-bottom .2rem
      .news-head
        width 100%
        height 5.5rem
        position relative
        overflow hidden
        .news-pic
          width 100%
          transform translateY(-15%)
        .news-title
          position absolute
          width 100%
          padding 0 .4rem
          bottom .6rem
          text-align left
          font-size 16px
          line-height 20px
          color #fff
        .image-source
          position absolute
          right .2rem
          bottom .2rem
          color #999
    .news-footer
      position fixed
      left 0
      bottom 0
      width 100%
      height 1rem
      border-top 1px solid #dfdfdf
      background #fff
      display flex
      justify-content space-between
      align-items center
      .iconfont
        height 100%
        font-size .6rem
        color #959595
        line-height 1rem
        padding 0 .2rem
        .good-number
          font-size .3rem
          color #22b4f1
        .conment-number
          font-size .3rem
          color #22b4f1
</style>
