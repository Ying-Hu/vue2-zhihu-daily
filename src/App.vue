<template>
  <div id="app">
    <!-- 头部 -->
    <header class="header">
      <i v-if="true" class="iconfont icon-caidan"></i>
      <div class="title-content">
        <Loading></Loading>
        <h1 class="theme-title">Today Hot News</h1>
      </div>
      <i class="iconfont icon-add"></i>
    </header>

    <router-view></router-view>
  </div>
</template>

<script>
import Loading from 'components/loading/loading'

const COMPONENT_NAMER = 'app'

export default {
  name: COMPONENT_NAMER,
  components: {
    Loading
  }
}
</script>

<style lang="stylus">
  .header
    position fixed
    top 0
    left 0
    width 100%
    height 1.5rem
    padding 0 0.2rem
    display flex
    justify-content space-between
    align-items center
    z-index 9
    background-image linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.51) 95%)
    .title-content
      display flex
      justify-content center
      align-items center
    .iconfont
      color #fff
      font-size 0.65rem
    .theme-title
      flex 1
      margin-left .1rem
      text-align center
      color #fff
      font-size 0.4rem
</style>

