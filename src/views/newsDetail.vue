<template>
  <div class="news-wrapper">
    <div class="news-detail" v-if="news">
      <div class="news-head">
        <img class="news-pic" :src="news.image">
        <span class="image-source">图片：{{news.image_source}}</span>
        <p class="news-title">{{news.title}}</p>
      </div>
      <div class="news-body" v-html="news.body"></div>
    </div>
  </div>
</template>

<script>
import Axios from 'api'
// import Scroll from 'components/scroll/scroll'

const COMPONENT_NAMER = 'newsDetail'

export default {
  name: COMPONENT_NAMER,
  data () {
    return {
      news: null
    }
  },
  created () {
    this.getNews()
  },
  methods: {
    getNews () {
      // console.log('router', this.$route.query.id)
      let newsId = this.$route.query.id
      Axios.getNewsById(newsId)
      .then(res => {
        console.log('res.data', res.data)
        const cssurl = res.data.css
        this.news = res.data
        console.log('style', cssurl)
        // this.addLinkTag(cssurl)
      })
      .catch(err => {
        console.log(err)
      })
    },
    // 一开始想通过 link 标签引入样式，但是对侧边栏有影响，考虑到这是通用样式，于是干脆直接通过直接 import css 解决
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
          bottom .3rem
          text-align left
          font-size 16px
          line-height 20px
          color #fff
        .image-source
          position absolute
          right .2rem
          bottom .2rem
          color #999
</style>
