<template>
  <div class="home-wrapper" ref="homewrapper">
    <div class="home-content">
      <Scroll ref="scroll"
              :data = "[]"
              :scrollbar="false"
              :pullUpLoad="pullUpLoadObj"
              :startY="parseInt(startY)"
              @pullingUp="onPullingUp">
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
      </Scroll>
    </div>
  </div>
</template>

<script>
import vswiper from 'components/swiper/swiper'
// import BScroll from 'better-scroll'
import Scroll from 'components/scroll/scroll'
import Axios from 'api/index'
export default {
  name: 'home',
  data () {
    // return {
    //   refreshing: false,
    //   trigger: null,
    //   loading: false,
    //   count: 1,
    //   scroller: null,
    //   list: [],
    //   swiper: '',
    //   pullUpLoad: true,
    //   topStories: []
    // }
    return {
      resdata: null,
      list: [],
      topStories: [],
      scrollbar: true,
      scrollbarFade: true,
      pullUpLoad: true,
      pullUpLoadThreshold: 50,
      pullUpLoadMoreTxt: '加载更多',
      pullUpLoadNoMoreTxt: '没有更多数据了',
      startY: 0
    }
  },
  components: {
    vswiper,
    Scroll
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
          console.log(res.data)
          this.resdata = res.data
          this.list.push(res.data)
          this.topStories = res.data.top_stories
          console.log('list', this.list)
          this.$nextTick(() => {
            // this._initScroll()
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
    // _initScroll () {
    //   this.homeScroll = new BScroll(this.$refs.homewrapper, {
    //     pullUpLoad: true,
    //     click: true
    //   })
    // }
    onPullingUp () {
      // 更新数据
      setTimeout(() => {
        if (Math.random() > 0.5) {
          // 如果有新数据
          console.log('new data')
          this.list.push(this.resdata)
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate()
        }
      }, 1000)
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

<style lang="stylus">
// 滚动原理
  // .home-wrapper
  //   position absolute
  //   width 100%
  //   top 0
  //   left 0
  //   right 0
  //   bottom 0
  //   overflow hidden
  //   .home-content
  //     width 100%
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
