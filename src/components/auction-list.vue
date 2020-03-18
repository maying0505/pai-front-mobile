<template>
  <div id="auction-list" :params="params">
    <div class="nodata" v-if="!loading&&auctionList.length==0">暂无数据</div>
    <loading v-if="loading"></loading>
    <auction-item :auctionItem="auctionItem" :key="index" v-for="(auctionItem,index) in auctionList"></auction-item>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { assetList } from "@/common/utils/api";
import AuctionItem from "@/components/auction-item";
import Loading from "@/components/loading/loading";

const PARAMS = {
  sort: "-1",
  type: "-1",
  province: "",
  city: "",
  area: "",
  status: "-1",
  time: "-1"
};

export default {
  props: {
    params: {
      type: Object,
      required: false,
      default() {
        return PARAMS;
      }
    }
  },
  components: { Loading, AuctionItem },
  data() {
    return {
      loading: false,
      auctionList: []
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      // this.data = this.data.concat(this.auctionList).concat(this.auctionList);
      // this.$nextTick(() => {
      //   if (!this.scroll) {
      //     this.scroll = new BScroll(this.$refs.wrapper, {});
      //     console.log(this.scroll.wrapperHeight);
      //     console.log(this.scroll.scrollerHeight);
      //     console.log(this.scroll);
      //     this.scroll.on("touchend", pos => {
      //       // 下拉动作
      //       alert(11111);
      //       alert("---------" + pos.y);
      //       if (pos.y > 50) {
      //         console.log("11111");
      //         this.loadData();
      //       }
      //     });
      //   } else {
      //     this.scroll.refresh();
      //   }
      // });
      this.loading = true;
      assetList(this.params).then(res => {
        this.loading = false;
        if (res.code == 0) {
          this.auctionList = res.data;
        } else {
          alert(res.message);
        }
      });
    }
  },
  watch: {
    params: {
      handler() {
        this.loadData();
      },
      deep: true
    }
  }
};
</script>

<style lang="stylus">
#auction-list
  .nodata
    color #ccc
    font-size 0.4rem
    text-align center
    padding 0.2rem 0
  .content
    background #f0f0f0
  .wrapper
    position absolute
    left 0
    right 0
    bottom 0
    top 0
    .auction-item
      margin 0.1rem auto
      font-size 0.3rem
      border-radius 5px
      background #fff
      padding 0.1rem
      display flex
      height 2.2rem
      flex-direction row
      .auction-image
        position relative
        width 2.8rem
        height 2.2rem
        img
          max-width 100%
          height 100%
        .auction-status
          position absolute
          left 0
          top 0
          height 0.3rem
          padding 0.1rem 0.1rem 0.1rem 0.3rem
          font-size 0.24rem
          line-height 0.3rem
          color #ffffff
          background rgba(0, 0, 0, 0.9)
          border-radius 0 0.27rem 0.27rem 0
      .auction-info
        flex 1
        padding-left 0.2rem
        padding-top 0.05rem
        .auction-title
          color #323232
          font-size 0.3rem
        .auction-amount
          display flex
          align-items center
          justify-content center
          padding-top 0.3rem
          position relative
          .txt
            font-size 0.24rem
            color #666
            width 0.75rem
            text-align left
            line-height 0.3rem
          .amount
            font-size 0.48rem
            color #333
            flex 1
            padding-left 0.3rem
          .book-btn
            position absolute
            top 0rem
            right -0.1rem
            width 0.66rem
            height 0.6rem
            line-height 0.3rem
            font-size 0.24rem
            background #fe7073
            padding 0.15rem 0
            text-align center
            color #fff
        .auction-time
          font-size 0.2rem
          color #666666
          padding-top 0.1rem
</style>



<!--<template>
   <div class="auction-list">
       <auction-item v-for="auctionItem in auctionList" :key=auctionItem.id :auctionItem="auctionItem"></auction-item>
   </div>    
</template>
<script>
// import AuctionItem from "./auction-item";
// export default {
//   name: "auctionList",
//   props: { auctionList: { type: Array, required: true } },
//   components: { AuctionItem}
// };
// </script>
// <style lang="stylus">
// .auction-list 
//   padding .2rem .3rem
//   overflow hidden



// </style>


