<template>
  <div class="auction-item" @click="detail(auctionItem)">
    <div class="auction-image">
      <img v-lazy="prefix+auctionItem.cover" />

      <div class="auction-status" :class="'auction-status-'+auctionItem.status" v-text="status" v-if="status">
      </div>

    </div>
    <div class="auction-info">
      <div class="auction-title" v-text="auctionItem.name"></div>
      <div class="auction-amount">
        <div class="txt">
          起拍价<br> RMB
        </div>
        <div class="amount">
          {{auctionItem.startintPrice}}
        </div>

        <div class="book-btn" v-if="auctionItem.status==9">
          预约<br />看样
        </div>
      </div>
      <div class="auction-time">
        拍卖时间 {{auctionItem.auctionTime}}
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: "auctionItem",
  props: { auctionItem: { type: Object, required: true } },
  data() {
    return {
      prefix: "https://mobile.nengpaifafu.com/img/"
    };
  },
  methods: {
    detail(auctionItem) {
      this.$router.push({ path: "/auction/detail/" + auctionItem.id });
    }
  },
  computed: {
    status() {
      let status = this.auctionItem.status + "";
      let statusStr = "";
      switch (status) {
        case "7":
          statusStr = "看样排期中";
          break;
        case "8":
          statusStr = "不安排看样";
          break;
        case "9":
          statusStr = "看样预约中";
          break;
        case "10":
          statusStr = "预约结束";
          break;
        case "11":
          statusStr = "即将开始";
          break;
        case "12":
          statusStr = "拍卖进行中";
          break;
        case "13":
          statusStr = "拍卖完成";
          break;
        case "14":
          statusStr = "流拍";
          break;
        case "15":
          statusStr = "中止";
          break;
        case "16":
          statusStr = "撤回";
          break;
        default:
          statusStr = "";
          break;
      }
      return statusStr;
    }
  }
};
</script>

<style lang="stylus" scoped>
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
      padding 0.1rem 0.1rem 0.1rem 0.1rem
      font-size 0.24rem
      line-height 0.3rem
      color #ffffff
      background rgba(0, 0, 0, 0.9)
      border-radius 0 0.27rem 0.27rem 0
      text-align left
    .auction-status-9
      background rgba(251, 174, 6, 0.9)
    .auction-status-10
      background rgba(25, 185, 85, 0.9)
    .auction-status-11
      background rgba(101, 101, 101, 0.9)
    .auction-status-12
      background rgba(101, 101, 101, 0.9)
    .auction-status-13
      background rgba(101, 101, 101, 0.9)
    .auction-status-14
      background rgba(101, 101, 101, 0.9)
    .auction-status-15
      background rgba(101, 101, 101, 0.9)
    .auction-status-16
      background rgba(101, 101, 101, 0.9)
  .auction-info
    flex 1
    padding-left 0.2rem
    padding-top 0.05rem
    .auction-title
      color #323232
      font-size 0.3rem
      cursor hand
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

