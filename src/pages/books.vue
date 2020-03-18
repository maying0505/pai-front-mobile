<template>
  <div id="books">
    <div class="header-bar">
      我的预约
    </div>

    <div class="main">
      <auction-list :params="params">
      </auction-list>
    </div>

    <div class="footer">
      <tab-bar activeTab=1></tab-bar>
    </div>

  </div>

</template>
<script>
import AuctionList from "../components/auction-list";
import TabBar from "@/components/tab-bar/tab-bar";
export default {
  components: { AuctionList, TabBar },
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
  created() {
    this.loadData(this.params);
  },

  methods: {
    back() {
      this.$router.back();
    },
    loadData() {
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
#books
  height 100%
  overflow hidden
  .header-bar
    position absolute
    left 0
    top 0
    right 0
    height 0.4rem
    padding 0.15rem 0
    background #fff
    color #333333
    width 100%
    font-size 0.3rem
    z-index 10000
    box-shadow 0 0 5px #cdcdcd
    text-align center
    line-height 0.4rem
  .main
    position absolute
    top 0.7rem
    bottom 1rem
    left 0
    right 0
    overflow-y scroll
</style>
