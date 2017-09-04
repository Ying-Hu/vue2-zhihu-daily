<template>
  <div class="loading-container">
    <img src="./loading.gif">
  </div>
</template>
<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'loading'

  export default {
    name: COMPONENT_NAME
  }
</script>
<style lang="stylus">
  .loading-container
    img
      width: .4rem
      height: .4rem
      display: block
</style>
