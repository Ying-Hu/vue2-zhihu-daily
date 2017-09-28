<template>
  <div class="theme">
    <Scroll ref="scroll"
            :data = '[]'
            :click = "click"
            :scrollbar="scrollbarObj"
            :pullUpLoad="pullUpLoadObj"
            :startY="parseInt(startY)"
            @pullingUp="onPullingUp">
      <!-- 主题 banner -->
      <div class="banner">
        <img class="theme-img" :src="themeImg">
      </div>
      <!-- 主编列表 -->
      <div class="editoers">
        <span class="title">主编</span>
        <ul class="editor-list">
          <li class="editor-portrait" v-for="editor in editors" :key="editor.id">
            <img :src="editor.avatar" class="portrait">
          </li>
        </ul>
      </div>
      <!-- 主题列表 -->
      <div class="list-wrap" v-for="list in themelist" :key="list.id">
        <div class="news-wrapper" v-for="news in list.stories" @click="toNewsDetail(news)" :key="news.id">
          <div class="news-list">
            <p class="news-title">{{ news.title }}</p>
            <img class="news-img" v-show="news.images" :src="news.images"></img>
          </div>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Axios from 'api'
import Scroll from 'components/scroll/scroll'
import {mapActions} from 'vuex'

const COMPONENT_NAMER = 'theme'

export default {
  name: COMPONENT_NAMER,
  data () {
    return {
      themelist: [],
      themeImg: '',
      editors: [],
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
    this.getData()
  },
  methods: {
    ...mapActions([
      'changeBackFlag'
    ]),
    getData () {
      let id = this.$route.query.id
      Axios.getThemesById(id)
      .then((res) => {
        // console.log('themepage.data', res.data)
        this.themelist.push(res.data)
        this.themeImg = res.data.image
        this.editors = res.data.editors
        console.log('themelist')
        console.log(this.themelist)
        // console.log('themelist[0]', this.themelist[0])
      })
      .catch((err) => {
        console.log(err)
      })
    },
    toNewsDetail (news) {
      this.changeBackFlag(true)
      // console.log('click news', news)
      let newsId = news.id
      this.$router.push({
        path: 'newsDetail',
        query: {
          id: newsId
        }
      })
    },
    onPullingUp () {
      // let _this = this
      let themeId = this.$route.query.id
      let newsId = this.themelist.slice(-1)[0].stories.slice(-1)[0].id
      // console.log('themeId -- newsId', themeId, newsId)
      // 更新数据
      // setTimeout(() => {
      //   // 获取新数据
      //   console.log('request new data ...')
      //   Axios.getThemeNewsBeforeById(themeId, newsId)
      //   .then(res => {
      //     // console.log('getThemeNewsBeforeById', res.data.stories)
      //     _this.themelist.push(res.data)
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
      // }, 500)
      Axios.getThemeNewsBeforeById(themeId, newsId)
      .then(res => {
        // console.log('getThemeNewsBeforeById', res.data.stories)
        this.themelist.push(res.data)
      })
      .catch(err => {
        console.log(err)
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
  },
  watch: {
    '$route' () {
      this.themelist = []
      this.getData()
    }
  }
}
</script>

<style lang="stylus">
  .theme
    width 100%
    height 100%
    font-size 0
    .banner
      width 100%
      height 224px
      overflow hidden
      .theme-img
        height 100%
        transform translateX(-22%)
    .editoers
      display flex
      justify-content flex-start
      align-items center
      height 1rem
      width 100%
      padding 0 .2rem
      border-bottom 1px solid #ddd
      .title
          font-size 14px
          // margin-right -20px
      .editor-list
        display flex
        justify-content flex-start
        margin-left .2rem
        .editor-portrait
          width .7rem
          height .7rem
          margin-right .3rem
          .portrait
            width 100%
            height 100%
            border-radius 50%
    // list style
    .list-wrap
      display flex
      flex-direction column
      justify-content flex-start
      align-items center
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
            height 50px
          .news-img
            flex 0 0 60px
            width 60px
            height 50px
            align-self center
</style>
