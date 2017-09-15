<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <div class="demo" v-for="(item,index) in list">{{index}}</div>
      <div class="box"></div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.list = Array(10).fill(10)
  },
  mounted () {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper, {})
    })
  }
}
</script>

<style lang="stylus">
.wrapper
  position absolute
  top 0
  left 0
  bottom 0
  right 0
  overflow hidden
  background #dfdfdf
  .content
    width 100%
    .demo
      width 50%
      height 200px
      background red
      margin 10px
    .box
      position absolute
      right 0
      top 70px
      width 180px
      height 180px
      background-image linear-gradient(180deg, #000, #fff)
</style>

