<template>
  <transition name="slide">
    <div id="auction-article">
      <div class="header-bar" v-if="isWeapp==0">
        <p class="back" @click="back">
          <i class="icon-left"></i>
        </p>
        <p class="title" v-text="title"></p>
      </div>
      <div class="main">
        <div class="content" v-html="content">

        </div>
      </div>

    </div>
  </transition>

</template>

<script>
import { getAssetArticle } from "@/common/utils/api";
export default {
  methods: {},
  data() {
    return {
      content: "",
      type: ""
    };
  },
  created() {
    let type = this.$route.params.type;
    let assetId = this.$route.params.assetId;
    let isWeapp = this.$route.params.isWeapp ? this.$route.params.isWeapp : 0;
    this.isWeapp = isWeapp;
    if (type && assetId) {
      this.loadData(type, assetId);
    }
  },
  methods: {
    back() {
      this.$router.back();
    },
    loadData(type, assetId) {
      let params = { type: type, assetId: assetId };
      getAssetArticle(params).then(res => {
        if (res.code == 0) {
          this.content = res.data;
        } else {
          alert("获取信息错误");
        }
      });
    }
  },
  computed: {
    title() {
      let type = this.$route.params.type;
      let content = "";
      switch (type) {
        case "1":
          content = "竞买公告";
          break;
        case "2":
          content = "竞买须知";
          break;
        case "3":
          content = "重要提示";
          break;
        case "4":
          content = "其他说明";
          break;
      }
      return content;
    }
  }
};
</script>



<style lang="stylus">
#auction-article
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
  .content
    padding 0.9rem 0.2rem 0.2rem 0.2rem
    background #fff
    font-size 0.24rem
    line-height 1.5
  .slide-enter-active, .slide-leave-active
    transition all 0.3s
  .slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>

