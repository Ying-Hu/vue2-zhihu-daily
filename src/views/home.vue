<template>
  <div class="home-wrapper" ref="homewrapper">
    <div class="home-content">
      <Scroll ref="scroll"
              :data = "[]"
              :click = "click"
              :scrollbar="scrollbarObj"
              :pullUpLoad="pullUpLoadObj"
              :startY="parseInt(startY)"
              @pullingUp="onPullingUp">
      <!-- 轮播 -->
      <vswiper :topStories="topStories" @toDetail="toNewsDetail"></vswiper>
      <!-- 新闻列表 -->
        <div class="list-wrap" v-for="list in list" :key="list.id">
          <div class="news-time">{{list.date | dateFormat}}</div>
          <div class="news-wrapper" v-for="(news, index) in list.stories" :key="index" @click="toNewsDetail(news.id)">
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
import Scroll from 'components/scroll/scroll'
import Axios from 'api'
import {mapActions} from 'vuex'

const COMPONENT_NAMER = 'home'

export default {
  name: COMPONENT_NAMER,
  data () {
    return {
      list: [],
      topStories: [],
      date: '',
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
    vswiper,
    Scroll
  },
  created () {
    this.getList()
  },
  methods: {
    ...mapActions([
      'changeBackFlag'
    ]),
    getList () {
      // 获取热门消息
      Axios.getNews()
      .then(res => {
        // console.log('res.data', res.data)
        this.list.push(res.data)
        this.topStories = res.data.top_stories
        this.date = res.data.date
        // console.log(this.date)
        console.log('list', this.list)
      })
      .catch(err => {
        console.log(err)
      })
    },
    getListByDate (date) {
      // 获取过往消息
      Axios.getNewsByDate(date)
      .then(res => {
        // console.log('getNewsByDate', res.data)
        this.date = res.data.date
        this.list.push(res.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    onPullingUp () {
      let _this = this
      // 更新数据
      setTimeout(() => {
        // 获取新数据
        console.log('request new data ...')
        _this.getListByDate(_this.date)
      }, 500)
    },
    toNewsDetail (newsId) {
      // console.log('newsId', newsId)
      this.changeBackFlag(true)
      this.$router.push({
        path: 'newsDetail',
        query: {
          id: newsId
        }
      })
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
  .home-wrapper
    height 100%
    font-size 0
// swiper style
  .swiper-container
    width 100%
    .swiper-slide
      width 100%
      height 5.6rem
      overflow hidden
      .swiper-img
        width 100%
        transform translateY(-14%)
      .swiper-title
        position absolute
        color #fff
        padding 0 0.3rem
        font-size 18px
        line-height 20px
        left 0
        bottom .6rem
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
          line-height 20px
          color #2f2f2f
          margin-right .2rem
          height 60px
        .news-img
          flex 0 0 60px
          width 60px
          height 60px
          align-self center
</style>
