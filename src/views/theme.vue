<template>
  <div class="theme">
    <Scroll ref="scroll"
            :data = "[]"
            :click = "click"
            :scrollbar="false"
            :pullUpLoad="pullUpLoadObj"
            :startY="parseInt(startY)"
            @pullingUp="onPullingUp">
      <!-- 主题 banner -->
      <img class="theme-img" :src="themelist[0].image">
      <!-- 主编列表 -->
      <div class="editoers">
        <span class="title">主编</span>
        <ul class="editor-list">
          <li class="editor-portrait" v-for="editor in themelist[0].editors" :key="editor.id">
            <img :src="editor.avatar" class="portrait">
          </li>
        </ul>
      </div>
      <!-- 主题列表 -->
      <div class="list-wrap" v-for="list in themelist">
        <div class="news-wrapper" v-for="news in list.stories" @click="clickItem($event, news)">
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

const COMPONENT_NAMER = 'theme'

export default {
  name: COMPONENT_NAMER,
  data () {
    return {
      themelist: [],
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
    getData () {
      let id = this.$route.query.id
      Axios.getThemesById(id)
      .then((res) => {
        console.log('res.data', res.data)
        this.themelist.push(res.data)
        console.log('themelist')
        console.log(this.themelist)
        console.log('themelist.stories', this.themelist[0].stories)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    onPullingUp () {
      // let _this = this
      // 更新数据
      setTimeout(() => {
        // 获取新数据
        console.log('request new data ...')
        // _this.getListByDate(_this.date)
      }, 500)
    },
    clickItem (event, item) {
      console.log('click item', event, item)
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

<style lang="stylus" scoped>
  .theme
    width 100%
    height 100%
    .editoers
      display flex
      justify-content flex-start
      align-items center
      height 1rem
      width 100%
      padding 0 .2rem
      border-bottom 1px solid #ddd
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
