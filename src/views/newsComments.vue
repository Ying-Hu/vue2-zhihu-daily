<template>
  <div class="news-comments">
    <header class="comment-header">{{longCommentsList.length + shotCommentsList.length}} 条点评</header>
    <div class="comments-wrapper" ref="commentref">
      <div class="comment-body">
        <div class="long-comment">
          <div class="long-holder" v-if="!longCommentsList.length">深度长评虚位以待</div>
          <div class="long-content" v-else>
            <div class="lc-header">{{longCommentsList.length}}条长评</div>
            <div class="lc-list" v-for="comment in longCommentsList">
              <div class="author-head">
                <img :src="comment.avatar">
              </div>
              <div class="comment">
                <h3 class="author-name"><span>{{comment.author}}</span><i class="iconfont icon-good-copy">{{comment.likes}}</i></h3>
                <p class="comment-content">{{comment.content}}</p>
                <span class="time">{{comment.time | commentDateFormat}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="short-comment">
          <div class="sc-header">{{shotCommentsList.length}}条短评
            <i class="iconfont icon-down" v-show="!scFlag" @click="changeScFlag"></i>
            <i class="iconfont icon-doubleup" v-show="scFlag" @click="changeScFlag"></i>
          </div>
          <div class="sc-list-wrapper" v-if="scFlag">
            <div class="sc-list" v-for="comment in shotCommentsList">
              <div class="author-head">
                <img :src="comment.avatar">
              </div>
              <div class="comment">
                <h3 class="author-name"><span>{{comment.author}}</span><i class="iconfont icon-good-copy">{{comment.likes}}</i></h3>
                <p class="comment-content">{{comment.content}}</p>
                <span class="time">{{comment.time | commentDateFormat}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="comment-footer">
      <i class="iconfont icon-left back-icon" @click="goBack"></i>
      <i class="iconfont icon-write write-comment" @click="goBack">写点评</i>
    </footer>
  </div>
</template>

<script>
import Axios from 'api'
import BScroll from 'better-scroll'

const COMPONENT_NAME = 'comments'

export default {
  name: COMPONENT_NAME,
  data () {
    return {
      scFlag: false,
      shotCommentsList: [],
      longCommentsList: [],
      click: true
    }
  },
  created () {
    this.getLongComments()
    this.getShortComments()
  },
  methods: {
    getLongComments () {
      let newsId = this.$route.query.id
      Axios.getNewsLongCommentsById(newsId)
      .then(res => {
        this.longCommentsList = res.data.comments
        console.log('long', this.longCommentsList)
        this.$nextTick(() => {
          this._initScroll()
        })
      })
      .catch(err => {
        console.log(err)
      })
    },
    getShortComments () {
      let newsId = this.$route.query.id
      Axios.getNewsShortCommentsById(newsId)
      .then(res => {
        this.shotCommentsList = res.data.comments
        console.log('short', this.shotCommentsList)
      })
      .catch(err => {
        console.log(err)
      })
    },
    goBack () {
      this.$router.go(-1)
    },
    changeScFlag () {
      this.scFlag = !this.scFlag
      this.$nextTick(() => {
        this.refresh()
      })
    },
    _initScroll () {
      let options = {
        click: this.click
      }
      this.commentScroll = new BScroll(this.$refs.commentref, options)
    },
    refresh () {
      this.commentScroll && this.commentScroll.refresh()
    }
  }
}
</script>

<style lang="stylus">
  .news-comments
    width 100%
    height 100%
    color #3c3c3c
    overflow hidden
    .comment-header
        position fixed
        z-index 100
        top 0
        width 100%
        height 1.4rem
        background #22b4f1
        display flex
        justify-content center
        align-items center
        color #ffffff
        font-size .5rem
    .comments-wrapper
      position absolute
      top 0
      left 0
      bottom 0
      right 0
      width 100%
      height 100%
      padding 1.4rem 0 1rem
      .comment-body
        width 100%
        display flex
        flex-direction column
        padding-bottom 2.5rem
        .long-comment
          display flex
          flex-direction column
          border-bottom 1px solid #dfdfdf
          .long-holder
            display flex
            justify-content center
            align-items center
            padding 0 .2rem
            width 100%
            height 7rem
            font-size .45rem
          .long-content
            display flex
            flex-direction column
            .lc-header
              display flex
              justify-content space-between
              width 100%
              height 1rem
              padding .4rem .2rem .3rem
              border-bottom 1px solid #dfdfdf
              font-size .4rem
            .lc-list
              display flex
              padding .2rem
              border-bottom 1px solid #dfdfdf
              .author-head
                width 1.1rem
                height 100%
                padding .15rem
                img
                  width 100%
                  border-radius 50%
              .comment
                padding .15rem .2rem 0 0
                display flex
                flex 1
                flex-direction column
                .author-name
                  display flex
                  width 100%
                  justify-content space-between
                  align-items center
                  margin-bottom .15rem
                  font-weight 700
                  font-size 16px
                  .iconfont
                    color #dfdfdf
                .comment-content
                  font-size 14px
                  line-height 18px
                .time
                  margin .2rem 0 .1rem 0
        .short-comment
          width 100%
          display flex
          flex-direction column
          .sc-header
            display flex
            justify-content space-between
            width 100%
            height 1rem
            padding .4rem .2rem .3rem
            border-bottom 1px solid #dfdfdf
            font-size .4rem
          .sc-list-wrapper
            display flex
            flex-direction column
            .sc-list
              display flex
              width 100%
              padding .2rem
              border-bottom 1px solid #dfdfdf
              .author-head
                width 1.1rem
                height 100%
                padding .15rem
                img
                  width 100%
                  border-radius 50%
              .comment
                padding .15rem .2rem 0 0
                display flex
                flex 1
                flex-direction column
                .author-name
                  display flex
                  width 100%
                  justify-content space-between
                  align-items center
                  margin-bottom .1rem
                  font-weight 700
                  font-size 16px
                  .iconfont
                    color #dfdfdf
                .comment-content
                  font-size 14px
                  line-height 18px
                .time
                  margin .2rem 0 .1rem 0
    .comment-footer
      width 100%
      height 1rem
      background #3c3c3c
      position fixed
      z-index 100
      bottom 0
      display flex
      flex-direction row
      justify-content flex-start
      align-items center
      .back-icon
        height 1rem
        line-height 1rem
        color #8c8c8c
        font-size .5rem
        padding 0 .2rem
        border-right 1px solid #333
      .write-comment
        flex 1
        display flex
        justify-content center
        align-items center
        color #fff
</style>
