<template>
    <div id="my-message-list">

        <div class="header-bar">
            <p class="back" @click="back">
                <i class="icon-left"></i>
            </p>
            我的消息
        </div>

        <div class="main">
            <div class="message-item" v-for="(item,index) in messageList" :key="index">
                <div class="message-title-row">
                    <div class="icon-notice"></div>
                    <div class="message-title">{{item.title}}</div>
                </div>
                <div class="row">
                    <div class="message-time">
                        {{item.date}}
                    </div>
                </div>
                <div class="row">标的物名称:{{item.auctionTitle}}</div>
                <div class="row">录单日期:{{item.auctionAddTime}}</div>
                <div class="row">资产类别:{{item.auctionType}}</div>
                <div class="row">标的物编号:{{item.auctionCode}}</div>

                <div class="detail" @click="detail(item.id)">
                    <div class="detail-text">查看详情</div>
                    <div class="icon-left"></div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  name: "myMessage",
  data() {
    return {
      messageList: [
        {
          id: 1,
          title: "1111111111",
          date: "2018-08-01",
          auctionTitle: "地方撒风安抚",
          auctionAddTime: "2019-08-11",
          auctionType: "方长",
          auctionCode: "F-000111"
        },
        {
          id: 2,
          title: "1111111111",
          date: "2018-08-01",
          auctionTitle: "地方撒风安抚",
          auctionAddTime: "2019-08-11",
          auctionType: "方长",
          auctionCode: "F-000111"
        },
        {
          id: 3,
          title: "1111111111",
          date: "2018-08-01",
          auctionTitle: "地方撒风安抚",
          auctionAddTime: "2019-08-11",
          auctionType: "方长",
          auctionCode: "F-000111"
        },
        {
          id: 4,
          title: "1111111111",
          date: "2018-08-01",
          auctionTitle: "地方撒风安抚",
          auctionAddTime: "2019-08-11",
          auctionType: "方长",
          auctionCode: "F-000111"
        },
        {
          id: 5,
          title: "1111111111",
          date: "2018-08-01",
          auctionTitle: "地方撒风安抚",
          auctionAddTime: "2019-08-11",
          auctionType: "方长",
          auctionCode: "F-000111"
        },
        {
          id: 5,
          title: "1111111111",
          date: "2018-08-01",
          auctionTitle: "地方撒风安抚",
          auctionAddTime: "2019-08-11",
          auctionType: "方长",
          auctionCode: "F-000111"
        },
        {
          id: 5,
          title: "1111111111",
          date: "2018-08-01",
          auctionTitle: "地方撒风安抚",
          auctionAddTime: "2019-08-11",
          auctionType: "方长",
          auctionCode: "F-000111"
        }
      ]
    };
  },
  methods: {
    back() {
      this.$router.back();
    }
  }
};
</script>

<style lang="stylus" scoped>
#my-message-list
    .header-bar
        position absolute
        left 0
        top 0
        right 0
        bottom 0
        height 0.4rem
        padding 0.15rem 0
        background #fff
        color #333333
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
        top 0.7rem
        left 0
        right 0
        bottom 0
        padding 0.25rem
        overflow-y scroll
        .message-item
            padding 0.2rem 0.2rem 0 0.2rem
            border-radius 5px
            background #fff
            margin-top 0.1rem
            .message-title-row
                font-size 0.3rem
                color #323232
                display flex
                .icon-notice
                    width 0.3rem
                    height 0.3rem
                    background #ff9466
                    color #fff
                    border-radius 50%
                    margin-right 0.2rem
                .message-title
                    flex 1
            .row
                padding 0.05rem 0 0.05rem 0.5rem
                font-size 0.24rem
                color #666
                .message-time
                    color #999999
            .detail
                display flex
                color #323232
                font-size 0.3rem
                padding 0.2rem 0 0.2rem 0.5rem
                .detail-text
                    flex 1
                .icon-left
                    transform rotate(180deg)
</style>

