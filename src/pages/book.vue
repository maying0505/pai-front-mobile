<template>

<div id="book-action">
       <div class="header">
          <p class="back" @click="back">
            <i class="icon-left"></i>
          </p>
          <p class="title">预约看样</p>
        </div>
</div>

</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {
    back() {
      this.$router.back();
    }
  }
};
</script>



<style lang="stylus">
#book-action
    .header
        position fixed
        left 0
        top 0
        right 0
        bottom 0
        height 0.4rem
        padding 0.15rem 0
        background #fff
        color #333333
        width 100%
        font-size 0.3rem
        z-index 10000
        box-shadow 0 0px 10px 0 rgba(0,0,0,.15)
        text-align center
        .title
            height 0.4rem
            line-height 0.4rem
        .back
            width 0.14rem
            height 0.28rem
            font-size 0.28rem
            line-height 0.28rem
            left 0.45rem
            color #666
            position absolute
            top 0.21rem
</style>

