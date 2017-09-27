<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="news in topStories" :key="news.id" @click="test(news.id)">
      <img class="swiper-img" :src="news.image">
      <p class="swiper-title">{{news.title}}</p>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: 'vswiper',
    props: ['topStories'],
    components: {
      swiper,
      swiperSlide
    },
    data () {
      return {
        swiperOption: {
          notNextTick: true,
          autoplay: 3000,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          mousewheelControl: true,
          observeParents: true,
          lazyLoading: true,
          resistanceRatio: 0,
          loop: true
        }
      }
    },
    methods: {
      toDetail (newsId) {
        console.log('emit', newsId)
        this.$emit('toNewsDetail', newsId)
      },
      test (a) {
        console.log(' click test', a)
      }
    }
  }
</script>

<style lang="stylus">
  // .swiper-container
  //   width 100%
  //   .swiper-slide
  //     width 100%
  //     height 5.6rem
  //     .swiper-img
  //       min-width 100%
  //       max-height 140%
  //     .swiper-title
  //       position absolute
  //       color #fff
  //       padding 0.5rem 0.1rem
  //       font-size 18px
  //       left 3%
  //       bottom 6%
  // .swiper-pagination .swiper-pagination-bullet-active
  //   background #fff
  // .swiper-pagination .swiper-pagination-bullet
  //   width 6px
  //   height 6px
</style>
