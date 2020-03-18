<template>

  <transition name="slide">
    <div id="auction-publish">
      <div class="header-bar" v-if="isWeapp=0">
        <p class="back" @click="back">
          <i class="icon-left"></i>
        </p>
        <p class="title">标的物详情</p>
      </div>
      <div class="main">
        <div class="content" v-html="content">

        </div>
      </div>
    </div>
  </transition>

</template>

<script>
import { assetPublish } from "@/common/utils/api";
export default {
  created() {
    let isWeapp = this.$route.query.isWeapp ? this.$route.query.isWeapp : 0;
    this.isWeapp=isWeapp
    this.loadData();
  },
  data() {
    return {
      content: "",
      isWeapp:0
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    loadData(params) {
      let assetId = this.$route.params.assetId;
      if (assetId) {
        let params = { assetId: assetId };
        assetPublish(params).then(res => {
          if (res.code == 0) {
            this.content = res.data.html;
          } else {
            alert(res.message);
          }
        });
      }
    }
  },
  computed: {}
};
</script>


<style lang="stylus">
#auction-publish
  .header-bar
    position absolute
    left 0
    top 0
    right 0
    height 0.4rem
    padding 0.15rem 0
    background #fff
    color #333333
    font-size 0.3rem
    z-index 2
    box-shadow 0 0 5px #cdcdcd
    .title
      height 0.4rem
      line-height 0.4rem
      text-align center
      font-size 0.3rem
    .back
      width 0.14rem
      height 0.28rem
      font-size 0.28rem
      line-height 0.28rem
      left 0.45rem
      color #666
      position absolute
      top 0.21rem
.main
  position absolute
  top 0.7rem
  left 0
  bottom 0
  right 0
  .content
    padding 0.2rem
    background #fff
    font-size 0.24rem
    table
      width 100%
      font-size 0.24rem
      text-align center
      tr:nth-child(1)
        border-top 1px solid #ccc
      td
        display table-cell
        vertical-align middle
        padding 0.15rem 0
        border-bottom 1px solid #ccc
        border-right 1px solid #ccc
        line-height 1.5
      td:nth-child(1)
        width 1.75rem
        border-left 1px solid #ccc
      td:nth-child(2)
        width 2.12rem
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>
