<template>
  <transition name="slide">
    <div id="auction-detail">

      <div class="main">

        <div class="auction-banner" v-if="auctionDetail.baseinfo">
          <img :src="auctionDetail.baseinfo.cover" />
        </div>

        <div class="auction-detail-1">
          <div class="auction-number-title">

            <span class="title">{{auctionDetail?auctionDetail.name:"--"}}</span>
          </div>

          <div class="auction-price">
            <div class="text">
              起拍价<br>RMB
            </div>
            <div class="price">
              {{auctionDetail?auctionDetail.startintPrice:"--"}}
            </div>
          </div>

          <div class="auction-time-resource">
            <div class="time">拍卖日期 {{auctionDetail?auctionDetail.auctionTime:"--"}}</div>
            <div class="resource">来源： {{auctionDetail?auctionDetail.auctionPlatform:"--"}}</div>
          </div>

          <div class="book-btn" @click="book">
            预约看样
          </div>
        </div>

        <div class="auction-detail-2 auction-detail-table">
          <div class="table-cell">
            <span class="cell-text">起拍价</span>
            <span class="cell-value"> {{auctionDetail.startintPrice?auctionDetail.startintPrice:"--"}}</span>
          </div>
          <div class="table-cell border-right-none">
            <span class="cell-text">评估价</span>
            <span class="cell-value">{{auctionDetail.evaluationPrice?auctionDetail.evaluationPrice:"--"}}</span>
          </div>
          <div class="table-cell">
            <span class="cell-text">竞价幅度</span>
            <span class="cell-value">{{auctionDetail.price?auctionDetail.price:"--"}}</span>
          </div>
          <div class="table-cell border-right-none">
            <span class="cell-text">加价周期</span>
            <span class="cell-value"> {{auctionDetail.biddingCycle?auctionDetail.biddingCycle:"--"}}</span>
          </div>

          <div class="table-cell">
            <span class="cell-text">保证金</span>
            <span class="cell-value">{{auctionDetail.bond?auctionDetail.bond:'--'}}</span>
          </div>
          <div class="table-cell border-right-none">
            <span class="cell-text">拍卖方式</span>
            <span class="cell-value">{{auctionDetail.auction==1?'线上':'线下'}}</span>
          </div>

          <div class="table-cell border-bottom-none">
            <span class="cell-text">保留价</span>
            <span class="cell-value">{{auctionDetail.reservePrice?auctionDetail.reservePrice:'--'}}</span>
          </div>
          <div class="table-cell border-right-none border-bottom-none">
            <span class="cell-text">购买优先权</span>
            <span class="cell-value">{{auctionDetail.preemption?'有':'无'}}</span>
          </div>
        </div>

        <div class="auction-detail-3">
          <div class="row">
            <div class="text">标的所在地区</div>
            <div class="value">{{auctionDetail.locationName?auctionDetail.locationName:'--'}}</div>
            <div class="icon-location"></div>
          </div>
          <div class="row">
            <div class="text">处置单位</div>
            <div class="value">{{auctionDetail.handleUnit?auctionDetail.handleUnit:'--'}}</div>
            <div class="icon-left"></div>
          </div>
          <div class="row">
            <div class="text">咨询方式</div>
            <div class="value">网拍管理员 400-087-0213</div>
            <div class="icon-left"></div>
          </div>
          <div class="row" @click="seeContent(1)">
            <div class="text">竞买公告</div>
            <div class="value"></div>
            <div class="icon-left"></div>
          </div>
          <div class="row" @click="seeContent(2)">
            <div class="text">竞买须知</div>
            <div class="value"></div>
            <div class="icon-left"></div>
          </div>
          <div class="row" @click="seeContent(3)">
            <div class="text">*重要提示</div>
            <div class="value"> </div>
            <div class="icon-left"></div>
          </div>

          <div class="row" @click="seeContent(4)">
            <div class="text">其他说明</div>
            <div class="value"></div>
            <div class="icon-left"></div>
          </div>

        </div>

        <div class="auction-detail-4">
          <div class="title">
            标的物介绍
          </div>

          <div class="content" style="min-height:100px" v-html="auctionDetail.html">

          </div>

        </div>

        <div class="auction-detail-5">
          <div class="title">视频-图片</div>
          <div class="video"></div>
          <div class="picture-list">
            <div class="picture" :key="$index" v-for="(item,$index) in auctionDetail.files">
              <img :src="item" />
            </div>
          </div>
        </div>

        <div class="book-btn-bottom" v-if="!auctionDetail.isBooked">
          <div class="phone">
            <i class="icon-phone"></i> 400-087-0213</div>
          <div class="btn" @click="book">预约看样</div>
        </div>
      </div>
    </div>

  </transition>
</template>

<script>
import { assetDetail } from "@/common/utils/api";
import { isMobile } from "@/common/utils/regex";
import { Toast } from "mand-mobile";
import wx from "weixin-js-sdk";
export default {
  name: "auctionDetail",
  data() {
    return {
      auctionDetail: {},
      isWeapp: 0
    };
  },
  created() {
    this.loadData();
  },
  mounted() {},
  methods: {
    loadData() {
      let assetId = this.$route.params.id;
      let isWeapp = this.$route.query.isWeapp ? this.$route.query.isWeapp : 0;
      this.isWeapp = isWeapp;
      let userId = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).id
        : "";
      if (assetId) {
        let params = { assetId: assetId, userId: userId };
        assetDetail(params).then(res => {
          if (res.code == 0) {
            this.$nextTick(() => {
              this.auctionDetail = res.data;
            });
          } else {
            Toast.info(res.message);
            setTimeout(() => {
              this.$router.back();
            }, 3000);
          }
        });
      }
    },
    back() {
      this.$router.back();
    },
    book() {
      let assetId = this.$route.params.id;
      if (this.isWeapp) {
        wx.miniProgram.navigateTo({
          url: "../auction/book?assetId=" + assetId
        });
      } else {
        this.$router.push({
          path: "/auction/book/" + this.auctionDetail.id
        });
      }
    },
    seeContent(type) {
      if (type) {
        this.$router.push({
          path:
            "/auction/article/" +
            type +
            "/" +
            this.auctionDetail.id +
            "/" +
            this.isWeapp
        });
      }
    }
  }
};
</script>

<style lang="stylus">
#app
  overflow scroll
  min-height 100%
#auction-detail
  color #323232
  background #f0f0f0
  font-size 0.3rem
  .main
    overflow-y scroll
    overflow-x hidden
    .auction-banner
      height 3rem
    .auction-detail-table
      display grid
    .table-cell
      padding-top 0.2rem
      padding-bottom 0.2rem
      padding-left 0.5rem
      padding-right 0.2rem
      border-bottom 1px solid #ccc
      border-right 1px solid #ccc
      :last-child
        border-bottom 0 none
      .cell-text
        color #666
        font-size 0.24rem
        padding-right 0.2rem
      .cell-value
        color #333
        font-size 0.3rem
    .auction-detail-1
      padding 0.25rem 0.5rem 0.35rem 0.5rem
      margin-top 0.1rem
      background #fff
    .auction-detail-2
      grid-template-columns 50% 50%
      margin-top 0.1rem
      background #fff
    .auction-detail-5
      margin-top 0.1rem
      background #fff
      margin-bottom 1.5rem
      .title
        background #04c2ae
        color #ffffff
        font-size 0.3rem
        height 0.3rem
        line-height 1
        padding 0.25rem 0
        text-align center
      .video
        height 3rem
        background #666
      .picture-list
        margin-top 0.1rem
        display grid
        grid-template-columns 50% 50%
        grid-column-gap 0.05rem
        grid-row-gap 0.05rem
        .picture
          height 3rem
          background #666
          img
            width 100%
            height 100%
    .auction-detail-3, .auction-detail-4
      margin-top 0.1rem
      background #fff
      .row
        border-bottom 1px solid #ccc
        padding 0.3rem 0.5rem
        height 0.3rem
        display flex
        flex-direction row
      .text
        color #333
        font-size 0.3rem
      .value
        color #666
        font-size 0.24rem
        line-height 0.3rem
        flex 1
        text-align right
        padding-right 0.2rem
      .icon-left
        transform rotate(180deg)
        width 0.14rem
        height 0.28rem
        font-size 0.28rem
      .icon-location
        transform:rotate(360deg)
          width 0.14rem
          height 0.28rem
          font-size 0.28rem
      &:last-child
        border-bottom 0 none
      &:first-child
        .value
          text-align left
          padding-left 0.2rem
  .auction-detail-1
    position relative
    overflow hidden
    .auction-number-title
      padding-right 0.2rem
      word-break break-all
      display -webkit-box
      -webkit-line-clamp 2
      -webkit-box-orient vertical
      overflow hidden
    .auction-price
      padding-top 0.25rem
      display flex
      flex-direction row
      .text
        color #666
        font-size 0.24rem
        line-height 1.25
        width 0.75rem
        height 0.55rem
        text-align left
      .price
        color #333
        font-size 0.48rem
        flex 1
        padding-left 0.5rem
    .auction-time-resource
      color #666
      font-size 0.24rem
      display flex
      flex-direction row
      padding-top 0.15rem
      .time, .resource
        flex 1
    .book-btn
      font-size 0.3rem
      position absolute
      right 0
      top 0.5rem
      color #fff
      padding 0.3rem 0.15rem
      background #fe7073
      width 0.6rem
      word-wrap wrap
  .border-right-none
    border-right 0 none !important
  .border-bottom-none
    border-bottom 0 none !important
  .auction-detail-4
    .title
      background #04c2ae
      color #ffffff
      font-size 0.3rem
      height 0.3rem
      line-height 1
      padding 0.25rem 0
      text-align center
    .content
      padding 0.1rem 0.2rem
      background #fff
      text-align center
      table
        width 100%
        font-size 0.24rem
        tr:nth-child(1)
          border-top 1px solid #ccc
        td
          display table-cell
          vertical-align middle
          padding 0.15rem 0
          border-bottom 1px solid #ccc
          border-right 1px solid #ccc
        td:nth-child(1)
          border-left 1px solid #ccc
    .table
      display grid
      text-align center
      grid-template-columns 1.75rem 2.12rem auto
      border-left 1px solid #ccc
      border-top 1px solid #ccc
      .cell
        padding 0.15rem 0
        border-bottom 1px solid #ccc
        border-right 1px solid #ccc
        display flex
        align-items center
        justify-content center
        font-size 0.24rem
      table
        width 100%
        .grid-column-24
          grid-column 2 / 4
          .div-table
            width 100%
            .div-table-tr
              display flex
              flex-direction row
              border-bottom 1px solid #ccc
              .div-table-td
                padding 0.15rem
                border-right 1px solid #ccc
              :first-child
                width 2.12rem
              :last-child
                border 0 none
                flex 1
            :last-child
              border 0 none
.book-btn-bottom
  display flex
  z-index 1
  position fixed
  bottom 0
  left 0
  right 0
  font-size 0.36rem
  line-height 0.6rem
  box-shadow 0 0 25px #cac6c6
  .phone, .btn
    flex 1
    height 0.6rem
    padding 0.2rem 0
    align-items center
    justify-content center
    text-align center
  .phone
    background #fff
  .btn
    color #fff
    background linear-gradient(to right, #07c1ab, #3eb675)
.icon-phone
  border 1px solid #07c1ab
  border-radius 50%
  color #07c1ab
.banner-item
  float left
  width 100%
  height 100%
  text-align center
  color #FFF
  box-align center
  align-items center
  box-pack center
  justify-content center
  text-decoration-line none
.book-dialog
  width 6rem
  .dialog-header
    padding 0.35rem 0
    text-align center
    color #333
    border-radius 5px 5px 0 0
    font-size 0.36rem
    background #cdcdcd
    height 0.5rem
    line-height 0.5rem
    .icon-yuyueguahao
      color #1abd98
      margin-right 0.1rem
  .dialog-body
    background #fff
    .input-item
      display flex
      height 0.5rem
      padding 0.25rem 0
      border-bottom 1px solid #ccc
      input, .see-rule, select
        flex 1
        font-size 0.3rem
        height 0.5rem
        line-height 0.5rem
        outline 0 none
        color #333
        padding-left 0.3rem
        ::input-placeholder
          color #666
      select
        padding-left 0.4rem
      .see-rule
        padding-left 0.1rem
        color #666
      .sm-code-btn
        width 2.5rem
        height 0.5rem
        line-height 0.5rem
        color #999
        font-size 0.24rem
        text-align right
        padding-right 0.1rem
      .arrow-down
        width 1.1rem
        height 0.5rem
        position relative
        &:after
          content ''
          position absolute
          right 0.5rem
          top 50%
          width 0
          height 0
          margin-top -0.07rem
          border-left 0.14rem solid transparent
          border-right 0.14rem solid transparent
          border-top 0.14rem solid #666
          border-radius 0.07rem
          transition transform 0.3s cubic-bezier(0.86, 0, 0.07, 1)
  .dialog-footer
    height 0.4rem
    padding 0.2rem
    background #1abd98
    color #fff
    line-height 0.4rem
    font-size 0.3rem
    text-align center
    border-radius 0 0 5px 5px
  .dialog-close
    color #fff
    background transparent
    height 0.82rem
    margin-top 0.2rem
    .close
      width 0.78rem
      height 0.78rem
      line-height 0.78rem
      border-radius 50%
      text-align center
      font-size 0.78rem
      border 0.02rem solid #fff
      margin 0 auto
.popup
  .popup-mask
    background rgba(0, 0, 0, 0.8) !important
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>