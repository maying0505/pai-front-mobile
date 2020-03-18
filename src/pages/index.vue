<template>
    <div id="index">
        <div class="header-bar">
            <div class="header">
                <div class="logo">
                    <i class="icon-tianping"></i>&nbsp;&nbsp;司法拍卖</div>
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

                <div class="notice-bar" @click="test">
                    <i class="icon-notice"></i>通知：您有一个预约即将到时。。
                </div>

                <div class="nav-bar">
                    <router-link :to="'/auctions/'+item.id" class="nav-item" tag="div" v-for="(item,index) in assetTypeList" :key="index">
                        <div class="circle">
                            <i class="icon-fangzu"></i>
                        </div>
                        {{item.txt}}
                    </router-link>
                </div>

                <div class="progress">
                    <div class="progress-point point-tag">竞拍<br/>流程</div>
                        <div class="progress-point">
                            <h3>查阅标物</h3>
                            <div class="content">
                                阅读竞买公告,初步了解标的物信息
                            </div>
                        </div>
                        <div class="progress-point">
                            <h3>预约看样</h3>
                            <div class="content">
                                提供在线预约，实地现场看样
                            </div>
                        </div>
                        <div class="progress-point">
                            <h3>司法拍卖</h3>
                            <div class="content">
                                司法拍卖平台在线出价竞拍标的物
                            </div>
                        </div>
                        <div class="progress-point">
                            <h3>中标交易</h3>
                            <div class="content">
                                提供全套过户办证服务
                            </div>
                        </div>
                    </div>
                    <div class="filter">
                        <drop-menu @paramsChange="loadData" :province="params.province" :city="params.city" :area="params.area"></drop-menu>
                    </div>

                    <div class="auction-list">
                        <auction-list :params="params">
                        </auction-list>
                    </div>
                </div>

                <div class="footer">
                    <tab-bar activeTab=0></tab-bar>
                </div>

            </div>
</template>

<script>
import TabBar from "@/components/tab-bar/tab-bar";
import AuctionList from "../components/auction-list";
import DropMenu from "../components/drop-menu/drop-menu";
import { assetTypeList } from "@/common/data/data";
export default {
  data() {
    return {
      activeMenuIndex: -1,
      activeMenuListData: [],
      isPopupShow: false,
      scroller: "",
      selectedMenuListItem: [],
      assetTypeList: assetTypeList,
      params: {}
    };
  },
  created() {
    this.loadData(this.params);
  },
  components: { AuctionList, DropMenu, TabBar },
  methods: {
    test() {
      this.$router.push({ path: "/test" });
    },
    loadData(params) {
      console.log("1111111" + params);
      this.params = params;
    }
  },
  computed: {}
};
</script>

<style lang="stylus">
#index
    height 100%
    overflow hidden
    .header-bar
        position absolute
        top 0
        left 0
        right 0
        height 0.7rem
        .header
            height 0.4rem
            background #1abd98
            color #fff
            width 100%
            font-size 0.32rem
            padding 0.15rem 0
            .logo
                height 0.4rem
                line-height 0.4rem
                text-align center
                .icon-tianping
                    width 0.4rem
                    height 0.4rem
                    border-radius 50%
                    background #ffffff
                    color #1abd98
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
        bottom 1rem
        left 0
        right 0
        overflow-y scroll
        .notice-bar
            font-size 0.3rem
            margin-top 0.1rem
            padding 0.1rem 0 0.1rem 0.55rem
            background #ffffff
            color #666666
            font-size 0.18rem
            height 0.3rem
            line-height 0.3rem
        .icon-notice
            color #ff9466
            width 0.2rem
            height 0.2rem
            margin-right 0.2rem
        .nav-bar
            display flex
            padding 0.2rem 0
            margin-top 0.1rem
            background #ffffff
            align-items center
            justify-content center
            flex-wrap wrap
            -webkit-flex-wrap wrap
            text-align center
            font-size 0.24rem
            color #323232
            .nav-item
                flex 1
                align-content center
                justify-content center
                color #323232
                // max-width 20%
                // min-width 20%
                margin-bottom 0.1rem
                .circle
                    width 0.8rem
                    height 0.8rem
                    background #29ba8a
                    color #ffffff
                    border-radius 50%
                    display flex
                    justify-content center
                    align-items center
                    margin 0 auto 0.1rem
                    .icon-fangzu
                        font-size 0.3rem
        .progress
            display flex
            margin-top 0.1rem
            align-items center
            background #fff
            .progress-point
                flex 1
                height 1rem
                padding-left 0.1rem
                h3
                    font-size 0.2rem
                    color #323232
                    padding-top 0.1rem
                    padding-bottom 0.05rem
                .content
                    font-size 0.16rem
                    color #666
            .point-tag
                padding-top 0.25rem !important
                background #03c2af
                line-height 1.5
                color #fff
                font-size 0.24rem
                background #03c2af
                text-align center
        .filter
            height 0.8rem
            margin-top 0.1rem
        .auctionlist
            margin-top 0.1rem
            height 6.5rem
            background #fff
            position relative
            .wrapper
                top 1rem !important
</style>



