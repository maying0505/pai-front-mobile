<template>
  <div id="my-auction">

    <div class="header-bar">
      <p class="back" @click="back">
        <i class="icon-left"></i>
      </p>
      我的拍卖
    </div>

    <div class="main">
      <auction-list :params="params">
      </auction-list>
    </div>

  </div>
</template>
<script>
import AuctionList from "../components/auction-list";
export default {
  data() {
    return {
      params: {
        sort: "-1",
        type: "-1",
        province: "",
        city: "",
        area: "",
        status: "-1",
        time: "-1"
      }
    };
  },
  components: { AuctionList },
  created() {
    this.loadData();
  },
  methods: {
    back() {
      this.$router.back();
    },
    loadData(params) {
      let user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : "";
      let userId = user ? user.id : "";
      if (userId) {
        this.params = Object.assign(this.params, { userId, userId });
      }
    }
  }
};
</script>


<style lang="stylus">
#my-auction
  .header-bar
    position absolute
    left 0
    top 0
    right 0
    height 0.4rem
    line-height 0.4rem
    padding 0.15rem 0
    background #fff
    color #333333
    width 100%
    font-size 0.3rem
    z-index 2
    box-shadow 0 0 5px #cdcdcd
    text-align center
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
    left 0
    right 0
    top 0.7rem
    bottom 0
</style>
