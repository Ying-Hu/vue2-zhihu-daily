<template>
  <div class="home-wrapper" ref="homewrapper">
    <div class="home-content">
      <!-- 轮播 -->
      <vswiper :topStories="topStories"></vswiper>
      <!-- 新闻列表 -->
      <div class="list-wrap" v-for="list in list">
        <div class="news-time">{{list.date | dateFormat}}</div>
        <div class="news-wrapper" v-for="(news, index) in list.stories" :key="index">
          <div class="news-list">
            <p class="news-title">{{ news.title }}</p>
            <img class="news-img" :src="news.images[0]"></img>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vswiper from 'components/swiper/swiper'
import BScroll from 'better-scroll'
import Axios from 'api/index'
export default {
  name: 'home',
  data () {
    return {
      refreshing: false,
      trigger: null,
      loading: false,
      count: 1,
      scroller: null,
      list: [],
      swiper: '',
      topStories: []
    }
  },
  components: {
    vswiper
  },
  created () {
    this.getList(1)
  },
  mounted () {
  },
  methods: {
    getList (type) {
      if (type) {
        // 获取热门消息
        Axios.getNews()
        .then(res => {
          this.list.push(res.data)
          this.topStories = res.data.top_stories
          console.log('list', this.list)
          this.$nextTick(() => {
            this._initScroll()
          })
        })
        .catch(err => {
          console.log(err)
        })
      } else {
        Axios.getNewsByDate(this.count)
        .then(res => {
          console.log('getNewsByDate', res.data)
          this.list.push(res.data)
        })
      }
    },
    _initScroll () {
      this.homeScroll = new BScroll(this.$refs.homewrapper, {
        click: true
      })
    }
  }
}
</script>

<style lang="stylus">
// 滚动原理
  .home-wrapper
    position absolute
    width 100%
    top 0
    left 0
    right 0
    bottom 0
    overflow hidden
    .home-content
      width 100%
  // swiper style
  .swiper-container
    width 100%
    .swiper-slide
      width 100%
      height 5.6rem
      .swiper-img
        min-width 375px
        max-height 140%
      .swiper-title
        position absolute
        color #fff
        padding 0.5rem 0.1rem
        font-size 18px
        left 3%
        bottom 6%
  .swiper-pagination .swiper-pagination-bullet-active
    background #fff
  .swiper-pagination .swiper-pagination-bullet
    width 6px
    height 6px
  
  // list style
  .list-wrap
    display flex
    flex-direction column
    justify-content flex-start
    align-items center
    .news-time
      width 100%
      height .8rem
      line-height .8rem
      text-align center
      color #ffffff
      font-size 14px
      background #028fd6
    .news-wrapper
      width 100%
      padding 0 .3rem
      .news-list
        flex none
        display flex
        width 100%
        height 1.9rem
        justify-content space-between
        align-items center
        border-bottom 1px solid #ddd
        .news-title
          font-size 14px
          color #2f2f2f
          margin-right .2rem
          height 50px
        .news-img
          flex 0 0 60px
          width 60px
          height 50px
          align-self center
</style>
