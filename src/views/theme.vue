<template>
  <div class="theme">
    <Scroll ref="scroll"
            :data = "[]"
            :click = "click"
            :scrollbar="scrollbarObj"
            :startY="parseInt(startY)">
      <!-- 主题 banner -->
      <img class="theme-img" :src="themeImg">
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
      <div class="list-wrap" v-for="list in themelist">
        <div class="news-wrapper" v-for="news in list.stories" @click="toNewsDetail(news)">
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
      themeImg: '',
      editors: [],
      scrollbar: true,
      scrollbarFade: true,
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
        // console.log('themepage.data', res.data)
        this.themelist.push(res.data)
        this.themeImg = res.data.image
        this.editors = res.data.editors
        // console.log('themelist')
        // console.log(this.themelist)
        // console.log('themelist[0]', this.themelist[0])
      })
      .catch((err) => {
        console.log(err)
      })
    },
    toNewsDetail (news) {
      console.log('click news', news)
      let newsId = news.id
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
