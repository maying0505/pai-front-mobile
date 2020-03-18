<template>

    <transition name="slide">
        <div id="auctions">
            <div class="header-bar">
                <div class="header">
                    <p class="back" @click="back">
                        <i class="icon-left"></i>
                    </p>
                    <p class="title" v-text="title"></p>
                </div>
            </div>
            <div class="search-bar">
                <div class="search">
                    <div class="search-append">
                        <i class="icon-search"></i>
                    </div>
                    <input type="text" placeholder="搜索标的物的名称，标的物的编号" />
                </div>
            </div>
            <div class="main">
                <div class="filter">
                    <drop-menu @paramsChange="loadData"></drop-menu>
                </div>
                <auction-list :params="params">
                </auction-list>
            </div>

        </div>
    </transition>

</template>

<script>
import AuctionList from "@/components/auction-list";
import DropMenu from "@/components/drop-menu/drop-menu";
import { assetTypeList } from "@/common/data/data";
const default_params = {
  sort: "-1",
  type: "-1",
  province: "",
  city: "",
  area: "",
  status: "-1",
  time: "-1"
};
export default {
  created() {
    this.loadData();
  },
  data() {
    return {
      params: default_params
    };
  },
  components: { AuctionList, DropMenu },
  methods: {
    back() {
      this.$router.back();
    },
    loadData(params) {
      let type =params.type!=-1?params.type: this.$route.params.type;
      if (type) {
        this.params.type = type;
      }
    }
  },
  computed: {
    title() {
      const type = this.$route.params.type;
      let title = "";
      assetTypeList.forEach(element => {
        if (element.id == type) {
          title = element.txt;
          return true;
        }
      });
      return title;
    }
  }
};
</script>


<style lang="stylus">
#auctions
    .header-bar
        position absolute
        top 0
        left 0
        right 0
        height 1.5rem
        box-shadow 0 0 5px #cdcdcd
        overflow hidden
        .header
            height 0.4rem
            background #fff
            color #333333
            width 100%
            padding 0.15rem 0
            .back
                width 0.14rem
                height 0.28rem
                font-size 0.28rem
                line-height 0.28rem
                left 0.45rem
                color #666
                position absolute
                top 0.21rem
            .title
                height 0.4rem
                line-height 0.4rem
                text-align center
                font-size 0.3rem
    .search-bar
        background #1abd98
        padding 0.15rem 0
        height 0.5rem
        width 100%
        position absolute
        top 0.7rem
        .search
            margin 0 0.95rem
            display flex
            padding 0.1rem 0.25rem
            border-radius 0.25rem
            align-items center
            background #fff
            height 0.3rem
            input
                flex 1
                height 0.3rem
                font-size 0.24rem
                line-height 0.3rem
                width 100%
                outline none
                ::input-placeholder
                    color #9b9b9b
            .search-append
                display flex
                align-items center
                width 0.3rem
                height 0.3rem
                .icon-search
                    font-size 0.24rem
                    color #9b9b9b
    .main
        position absolute
        top 1.5rem
        left 0
        bottom 0
        right 0
        .filter
            padding 0.1rem 0
.slide-enter-active, .slide-leave-active
    transition all 0.3s
.slide-enter, .slide-leave-to
    transform translate3d(100%, 0, 0)
</style>
