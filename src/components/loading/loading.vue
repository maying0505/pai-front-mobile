<template>
  <div class="loading-container">
    <img src="./loading.gif">
  </div>
</template>
<script>
  export default {
    name: 'loading'
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .loading-container
    img
      width: 20px
      height: 20px
      display: block
      margin 20px auto 
</style>