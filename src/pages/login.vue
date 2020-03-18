<template>
    <div id="login-form">
        <div class="header">
            <p class="title">用户登录</p>
        </div>
        <div class="fill"></div>
        <div class="main">
            <div class="login-icon">
                <i class="icon-sifa"></i>
            </div>
            <div class="info-list username">
                <div class="_icon-username">
                    <i class="icon-username"></i>
                </div>
                <div class="input-item">
                    <input class="input" placeholder="请输入手机号码" v-model="user.phone" />
                </div>
            </div>
            <div class="info-list password">
                <div class="_icon-password">
                    <i class="icon-password"></i>
                </div>
                <div class="input-item">
                    <input class="input" type="password" placeholder="请输入密码" v-model="user.password" />
                </div>
            </div>
            <div class="forget">
                <div class="forget-text" @click="forget">忘记密码？</div>
            </div>

            <pai-button class="login-btn" btnTxt="登录" @click="goLogin" :disabled="loginBtnDisabled"></pai-button>
            <div class="signup-ask">
                <div class="ask-text" @click="signup">没有账号？立即注册</div>
            </div>
        </div>
    </div>
</template>
<script>
import Button from "@/components/button/button";
// import Toast from '@/components/toast/';
import { Toast } from "mand-mobile";
import { login } from "@/common/utils/api.js";

const mobile_regex = /^((1[0-9]))\d{9}$/;
export default {
  components: { [Button.name]: Button },
  data() {
    return {
      user: {
        phone: "",
        password: ""
      },
      loginBtnDisabled: false
    };
  },
  methods: {
    forget() {
      this.$router.push({ path: "/password-reset" });
    },
    signup() {
      this.$router.push({ path: "/signup" });
    },
    goLogin() {
      if (this.user.phone == "") {
        Toast.info("请输入手机号码");
        return;
      } else if (this.user.password == "") {
        Toast.info("请输入密码");
        return;
      } else if (!mobile_regex.test(this.user.phone)) {
        Toast.info("手机号码输入错误");
        return;
      } else {
        this.loginBtnDisabled = true;
        login(this.user).then(res => {
          this.loginBtnDisabled = false;
          if (res.code == 0) {
            localStorage.removeItem('user')
            localStorage.setItem("user", JSON.stringify(res.data));
            this.$router.push({ path: "/" });
          } else {
            Toast.info(res.message);
          }
        });
      }
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
#login-form
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    z-index 4
    padding-left 0.45rem
    padding-right 0.45rem
    background #f0f0f0
    .header
        position fixed
        left 0
        top 0
        right 0
        bottom 0
        height 0.4rem
        padding 0.15rem 0
        background #fff
        color #333
        width 100%
        z-index 2
        box-shadow 0 0 5px #cdcdcd
        .title
            font-size 0.32rem
            text-align center
    .main
        padding-top 1.2rem
        .login-icon
            width 3rem
            height 3rem
            background #e0e0e0
            margin 0 auto 1.4rem
            border-radius 1.5rem
            color #fff
            display flex
            justify-content center
        .info-list
            display flex
            flex-direction row
            margin-top 0.15rem
            padding 0.25rem
            height 0.5rem
            background #fff
            border-radius 0.05rem
        ._icon-username, ._icon-password
            width 0.5rem
            height 0.5rem
            line-height 0.5rem
            font-size 0.4rem
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
                padding-left 0.1rem
                font-size 0.3rem
                flex 1
                color #333, &:input-placeholder
                    color #9b9b9b
        .forget, .signup-ask
            margin 0.15rem 0 0.35rem 0
            flex 1
            text-align right
            .forget-text, .ask-text
                touch-action none
                color #666666
                font-size 0.24rem
                display inline-block
            .ask-text
                text-align center
        .signup-ask
            margin-top 0.3rem !important
        .icon-sifa
            display block
            width 1.19rem
            height 1.19rem
            margin 0.9rem auto 0
</style>

