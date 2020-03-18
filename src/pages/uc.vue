<template>
    <div id="uc">
        <div class="header-bar">
            我的
        </div>
        <div class="main">
            <div class="avatar">
                <img :src="user.headimgurl" />
            </div>
            <div class="nickname" v-text="user.realname?user.realname:user.nickname?user.nickname:'拍拍你'">
                
            </div>

            <div class="uc-panel">
                <div class="uc-panel-in">
                    <div class="row">
                        <div class="row-icon row-auction">
                            <i class="icon-sifa"></i>
                        </div>
                        <div class="row-content" @click="navClick('my-auction')">
                            <div class="row-text">我的拍卖</div>
                            <i class="icon-left"></i>
                        </div>
                    </div>
                    <div class="row">
                        <div class="row-icon row-message">
                            <i class="icon-message"></i>
                        </div>
                        <div class="row-content" @click="navClick('my-message')">
                            <div class="row-text">我的消息</div>
                            <i class="icon-left"></i>
                        </div>
                    </div>
                    <!-- <div class="row">
                        <div class="row-icon row-view">
                            <i class="icon-fankui"></i>
                        </div>
                        <div class="row-content" @click="navClick('view-fadeback')">
                            <div class="row-text">意见反馈</div>
                            <i class="icon-left"></i>
                        </div>
                    </div> -->
                    <div class="row row-last">
                        <div class="row-icon row-kefu">
                            <i class="icon-phone"></i>
                        </div>
                        <div class="row-content">
                            <div class="row-text">联系客服</div>
                            <div class="kefu-phone">400-087-0213</div>
                            <i class="icon-left"></i>
                        </div>
                    </div>
                </div>
            </div>

            <pai-button class="logout-btn" btnTxt='退出登录' @click="logout"></pai-button>
        </div>

        <div class="footer">
            <tab-bar activeTab=2></tab-bar>
        </div>
    </div>
</template>

<script>
import Button from "@/components/button/button";
import TabBar from "@/components/tab-bar/tab-bar";
export default {
  name: "uc",
  components: { [Button.name]: Button, TabBar },
  data() {
    return {
      user: ""
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log(this.user)
  },
  methods: {
    navClick(path) {
      this.$router.push({ path: path });
    },
    logout() {
      this.$router.push({ path: "/login" });
    }
  }
};
</script>
<style lang="stylus">
#uc
    .header-bar
        position absolute
        left 0
        top 0
        right 0
        height 0.4rem
        padding 0.15rem 0
        background #fff
        color #333
        width 100%
        z-index 10000
        box-shadow 0 0 5px #cdcdcd
        font-size 0.3rem
        text-align center
    .main
        margin 0.7rem 0 1rem 0
        padding 1.2rem 0.25rem 0
        display flex
        flex-direction column
        align-items center
        .avatar
            width 3rem
            height 3rem
            background #fff
            border-radius 1.5rem
    .nickname
        height 1rem
        line-height 1rem
        font-size 0.3rem
        color #333
        width 100%
        text-align center
    .uc-panel
        background #fff
        flex 1
        width 100%
        border-radius 5px
        color #333333
        font-size 0.3rem
        .row
            padding 0.3rem
            height 0.4rem
            line-height 0.4rem
            border-bottom 1px solid #ccc
            display flex
            flex-direction row
            .row-icon
                width 0.4rem
                height 0.4rem
                border-radius 50%
                text-align center
                .icon-sifa, .icon-message, .icon-fankui, .icon-phone
                    color #fff
                    font-size 0.2rem
            .row-auction
                background #3a938d
            .row-message
                background #ff9466
            .row-view
                background #fe7073
            .row-kefu
                background #40b573
                .kefu-phone
                    font-size 0.3rem
                    color #333
            .row-content
                flex 1
                display flex
                flex-direction row
                .row-text
                    flex 1
                    text-align left
                    padding-left 0.4rem
                .icon-left
                    transform rotate(180deg)
        .row-last
            border 0 none
    .logout-btn
        margin-top 0.6rem !important
</style>
