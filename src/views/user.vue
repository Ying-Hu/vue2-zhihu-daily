<template>
  <div class="userinfo">
    <img src="http://ol5i1a679.bkt.clouddn.com/head.JPG" class="user-pic">
    <span class="name">FerdYing</span>
    <a class="site" href="https://github.com/FerdYing">GitHub</a>
    <p class="please">欢迎Star</p>
  </div>
</template>

<script>
const COMPONENT_NAMER = 'userInfo'

export default {
  name: COMPONENT_NAMER
}
</script>

<style lang="stylus" scoped>
  .userinfo
    padding: 2rem
    width 100%
    height 100%
    display flex
    justify-content center
    flex-direction column
    align-items center
    background #9c9c9c
    color #fff
    text-align center
    .user-pic
      width 4rem
      height 4rem
      border-radius 50%
      margin-bottom .3rem
    .name, .please
      border-bottom .01rem solid #ffffff
      width 4rem
      padding-bottom .2rem
    .site
      text-decoration none
      width 4rem
      margin .3rem 0
      border-bottom .01rem solid #ffffff
      padding-bottom .2rem
</style>

