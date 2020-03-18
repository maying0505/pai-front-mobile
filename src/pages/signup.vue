<template>
    <div class="signup-form">
        <div style="padding:0 .45rem">
  <div class="header">
            <p class="title">用户注册</p>
        </div>
        <div class="fill"></div>
        <div class="info-list username">
            <div class="_icon-username"><i class="icon-username"></i></div>
            <div class="input-item">
                <input class="input" placeholder="请输入用户名" v-model="user.phone"/>
            </div>
        </div>
        <div class="info-list password">
            <div class="_icon-password"><i class="icon-password"></i></div>
            <div class="input-item">
                <input class="input" type="password"  placeholder="请输入密码" v-model="user.password"/>
            </div>
        </div>
        <div class="info-list password">
            <div class="_icon-password"><i class="icon-duanxinyanzhengma"></i></div>
            <div class="input-item">
                <input class="input" placeholder="请输入验证码" v-model="user.smcode"/>
            </div>
            <div class="smcode-btn" @click="getCode">{{smcodebtnTxt}}</div>
        </div>
        <div class="rule">
            <pai-checkbox v-model="checkActive" @change="handler(checkActive, $event)"></pai-checkbox>
            <div class="rule-btn" @click="rulePop">阅读并同意服务条款</div>
        </div>


        <pai-button :disabled="signupBtnDisabled" btnTxt="注册" @click="goSignup"></pai-button>
        <div class="login-ask">
            <div class="ask-text" @click="login">已有账号？立即登录</div>
        </div>   


        <popup v-model="ruleShow">
            <div class="rule-pop">
                <div class="rule-title-bar">
                    用户服务条款
                    <div class="rule-close" @click="closeRule">×</div>
                </div>
                <div class="rule-content">
  
                            <p>
                                百度的使命是用科技让复杂的世界更简单。我们希望通过不断地研发新技术、推出新服务，以产品和业务不断提升的智能化推动您的生活更加高效、更加便利。我们将一如既往的重视您的数据隐私的保护，并将持续提升隐私控制功能，使您可以控制您的数据隐私。您可以通过下方【百度隐私政策总则】和【产品线隐私政策】来了解我们会收集哪些数据、为什么收集这些数据，会利用这些数据做些什么及如何保护这些数据。我们正在坚持不懈地进行改进，如果您有任何关于数据隐私方面的需求和建议，请告诉我们。
                            </p>
                            
                       
                            <p>
                                本隐私政策适用于百度平台所有产品和服务。<strong>如某款百度产品有单独的隐私政策，则该产品的隐私政策将优先适用。该产品隐私政策未涵盖的内容，以本隐私政策内容为准</strong>。
                                <br>
                                本隐私政策旨在帮助您了解我们会收集哪些数据、为什么收集这些数据，会利用这些数据做些什么及如何保护这些数据。
                            </p>
                            
                            <p>
                                每个产品都有自己的特定功能，相应地，在隐私数据的收集、使用、共享等方面也有不同。本部分列出了百度一些特定产品的隐私保护内容，包括特定产品的隐私政策、特定产品的隐私保护功能说明等。
                            </p>
                        
                            <p>
                                如果您有任何隐私问题或疑虑，您可以通过百度用户服务中心专门的隐私问题报告页面联系我们处理。为保障我们高效处理您的问题并及时向您反馈，需要您提交身份证明、有效联系方式和书面请求及相关证据，我们会在验证您的身份后处理您的请求。
                            </p>
                </div> 
            </div>
        </popup>   
        </div>
      
    </div>
</template>
<script>
import Button from "@/components/button/button";
import Checkbox from "@/components/checkbox/checkbox";
import { signup,getSmCode } from "@/common/utils/api";
import { isMobile } from "@/common/utils/regex";
import { Toast } from "mand-mobile";
import Popup from "@/components/popup/popup";
export default {
  components: {
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [Popup.name]: Popup
  },
  data() {
    return {
      signupBtnDisabled: false,
      checkActive: true,
      user: {
        phone: "",
        password: "",
        smcode: ""
      },
      smcode:{
          mobile:'',
          type:'SIGNUP'
      },
      ruleShow: false,
      smcodebtnTxt: "获取验证码",
      auth_time:60
    };
  },
  methods: {
    handleCheck(checkActive, event) {},
    login() {
      this.$router.push({ path: "/login" });
    },
    goSignup() {
      if (this.user.phone == "") {
        Toast.info("请输入手机号码");
        return
      }else if(!isMobile(this.user.phone)){
        Toast.info("请输入正确的手机号码");
        return 
      } else if (this.user.password == "") {
        Toast.info("请设置注册密码");
        return
      } else if (this.user.smcode == "") {
        Toast.info("请输入手机验证码");
        return
      } else {
        signup(this.user).then(res => {
          if(res.code==0){
              this.$router.push({path:'/'})
          }else{
              Toast.info(res.message)
          }
        });
      }
    },
    rulePop() {
      this.ruleShow = true;
    },
    closeRule() {
      this.ruleShow = false;
    },
    getCode() {
      if (this.user.phone == "") {
        Toast.info("请输入手机号码");
        return
      } else if (this.user.password == "") {
        Toast.info("请设置注册密码");
        return
      }
      if(this.auth_time<60) return 

    this.smcode.mobile=this.user.phone

      getSmCode(this.smcode).then(res => {
        if (res.code==0) {
          var auth_timetimer = setInterval(() => {
            this.auth_time--;
            this.smcodebtnTxt = this.auth_time + "秒后重新获取";
            if (this.auth_time <= 0) {
              clearInterval(auth_timetimer);
              this.smcodebtnTxt = "获取验证码";
            }
          }, 1000);
        } else {
          Toast.info(res.message);
        }
      });
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
.signup-form
    position fixed
    left 0
    bottom 0
    right 0
    top 0
    z-index 3
    overflow scroll
    background #f0f0f0
    .fill
        height 0.7rem
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
    .info-list
        display flex
        flex-direction row
        margin-top 0.15rem
        padding 0.25rem
        height 0.5rem
        background #fff
        border-radius 0.05rem
        &:first-child
            margin-top 0.45rem
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
        color #333, ::input-placeholder
            color #9b9b9b
.rule, .login-ask
    margin-top 0.2rem
    margin-bottom 0.35rem
    display flex
    .rule-btn, .ask-text
        touch-action none
        color #666666
        font-size 0.24rem
        flex 1
        height 20px
        line-height 20px
        text-align left
        padding-left 10px
    .ask-text
        text-align center !important

.icon-sifa
    display block
    width 1.19rem
    height 1.19rem
    margin 0.9rem auto 0
.smcode-btn
    height 0.5rem
    line-height 0.5rem
    width 2.5rem
    font-size 0.3rem
    color #40b573
    text-align right
.rule-pop
    min-width 300px
    background #fff
    border-radius 5px
    .rule-title-bar
        box-shadow 0 0 10px rgba(0, 0, 0, 0.15)
        font-size 0.3rem
        padding 0.1rem 0
        height 0.5rem
        line-height 0.5rem
        text-align center
        position relative
    .rule-content
        padding 0.2rem 0.1rem
        overflow auto
    p
        text-indent 2em
        margin 0 0 10px
        font-size 0.2rem
        line-height 1.25
    .rule-close
        width 0.5rem
        height 0.5rem
        position absolute
        right 0.1rem
        top 0.1rem
        font-size 0.5rem
        cursor hand
</style>

