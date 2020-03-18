<template>
    <div id="reset-form">

        <div class="header">
            <p class="title">密码重置</p>
        </div>
        <div class="fill"></div>
        <div class="info-list username">
            <div class="_icon-username"><i class="icon-username"></i></div>
            <div class="input-item">
                <input class="input" placeholder="请输入用户名"/>
            </div>
        </div>
        <div class="info-list password">
            <div class="_icon-password"><i class="icon-password"></i></div>
            <div class="input-item">
                <input class="input" placeholder="请输入密码"/>
            </div>
        </div>
        <div class="info-list password">
            <div class="_icon-password"><i class="icon-password"></i></div>
            <div class="input-item">
                <input class="input" placeholder="请再次输入密码"/>
            </div>
        </div>

        <div class="info-list password">
            <div class="_icon-password"><i class="icon-password"></i></div>
            <div class="input-item">
                <input class="input" placeholder="请输入验证码"/>
            </div>
        </div>

        <pai-button disabled="false" btnTxt="提交" class="submit-btn"></pai-button>
        <div class="login-ask">
            <div class="ask-text" @click="login">返回登录</div>
        </div>        
    </div>
</template>
<script>

import Button from '@/components/button/button'
export default {
    components:{[Button.name]:Button},
    data() {
    return {
      isPopupShow: {},
    }
  },
  methods: {
    showPopUp(type) {
      this.$set(this.isPopupShow, type, true)
      console.log(this.isPopupShow.center)
    },
    hidePopUp(type) {
      this.$set(this.isPopupShow, type, false)
    },
    showToast(type) {
        
        Toast.info('11111111111',3000,true,'document.body')
        // Toast.succeed('fff')
    },
    hideToast(type) {
      this.$set(this.isPopupShow, type, false)
    },
    login(){
        this.$router.push({path:'/login'});
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  
      
    #reset-form
        display flex
        flex-direction column
        padding-left 0.45rem
        padding-right 0.45rem
        background #f5f5f5
        min-height 100%
        .fill 
            height .7rem
        .header
            position fixed
            left 0
            top 0
            right 0
            bottom 0
            height .4rem
            padding .15rem 0 
            background #fff
            color #333
            width 100%
            z-index 10000
            .title
                font-size .32rem
                text-align center
        .login-icon
            width 3rem
            height 3rem
            background #e0e0e0
            margin 0 auto 1.4rem
            border-radius 1.5rem
            color #fff
        .info-list
            display flex
            flex-direction row
            margin-top .15rem
            padding .25rem
            height .5rem  
            background  #fff
            border-radius .05rem
            &:first-child
                margin-top .45rem
        ._icon-username,._icon-password
            width .5rem
            height .5rem
            line-height .5rem
            font-size .4rem
            color #9b9b9b
 
    .input-item 
            flex 1 
            display flex

    .input-item
        input
            border 0 none
            height 100%  
            appearance none
            background-color transparent
            outline 0 none
            padding-left .1rem
            font-size .3rem
            flex 1
            color #333
            ::input-placeholder
                color #9b9b9b
    .submit-btn
        margin-top .8rem !important
    .login-ask
        background #f5f5f5
        margin .3rem 0 .35rem 0
        flex 1
        text-align  right 
        .ask-text
            touch-action none
            color #666666
            font-size .3rem
            text-align center
       
         
  
    
</style>

