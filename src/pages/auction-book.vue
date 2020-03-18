<template>
    <div id="auction-book">
        <div class="book-dialog">
            <div class="dialog-header">
                <i class="icon-yuyueguahao"></i>预约看样</div>
            <div class="dialog-body">
                <div class="input-item">
                    <!-- <input name="seeing-time" readonly=readonly v-model="bookParams.bookSeeingDate" placeholder="看样日期" /> -->

                    <select v-model="params.timeId">
                        <option value="">请选择看样时间</option>
                        <option v-for="(time,index)  in times" :value="time.id" :key="index">{{time.inquestDate}}</option>
                    </select>

                </div>
                <div class="input-item">
                    <input name="name" placeholder="您的姓名" v-model="params.name" />

              </div>
                    <div class="input-item">
                        <input name="name" placeholder="手机号" v-model="params.mobile" />
              </div>
                        <div class="input-item">
                            <input name="seeing-time" placeholder="请输入短信验证码" v-model="params.smcode" />
                            <div class="sm-code-btn" @click="getCode" v-text="smcodebtnTxt"></div>
                        </div>

                        <div class="input-item" style="border:0 none">
                            <pai-checkbox v-model="agreeStatus" @change="agree(checkActive, $event)" style="margin-left:.3rem"></pai-checkbox>
                            <div class="see-rule">我已阅读并接受《看样告知书》</div>
                        </div>
                    </div>
                    <div class="dialog-footer" @click="bookSubmit">
                        马上预约
                    </div>

                    <div class="dialog-close">
                        <div class="close" @click="closeDialog">
                            ×
                        </div>
                    </div>
                </div>
            </div>
</template>


<script>
import CheckBox from "@/components/checkbox/checkbox";
import { getAssetTimes, getSmCode, addBook } from "@/common/utils/api";
import { isMobile } from "@/common/utils/regex";
import { Toast } from "mand-mobile";
export default {
  data() {
    return {
      params: {
        timeId: "",
        mobile: "",
        smcode: "",
        name: "",
        assetId: "",
        userId: "",
        time: "",
        url: "https://mobile.nengpaifafu.com/#/books",
        openid: ""
      },
      times: [],
      smcodebtnTxt: "点击获取短信验证码",
      agreeStatus: true,
      smcode: {
        mobile: "",
        type: "ASSETBOOK"
      },
      smcodebtnTxt: "获取短信验证码",
      auth_time: 60,
      isGetSmCode: false,
      isBookSubmit: false,
      hasSmCode: false
    };
  },
  components: { [CheckBox.name]: CheckBox },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      let assetId = this.$route.params.assetId;
      if (assetId) {
        let params = { assetId: assetId };
        this.params.assetId=assetId;
        getAssetTimes(params).then(res => {
          if (res.code == 0) {
            this.times = res.data;
          }
        });
      } else {
      }
    },
    closeDialog() {
      this.$router.back();
    },
    bookSubmit() {
      console.log(this.params);
      if (this.isBookSubmit) return;
      this.isBookSubmit = true;
      if (this.params.timeId == "") {
        Toast.info("请选择看样时间");
        this.isBookSubmit = false;
        return;
      } else if (this.params.name == "") {
        Toast.info("请填写预约人姓名");
        this.isBookSubmit = false;
        return;
      } else if (this.params.mobile == "") {
        Toast.info("请填写看样手机号码");
        this.isBookSubmit = false;
        return;
      } else if (!isMobile(this.params.mobile)) {
        Toast.info("请填写正确的手机号码");
        this.isBookSubmit = false;

        return;
      } else if (!this.hasSmCode) {
        Toast.info("请获取短信验证码");
        this.isBookSubmit = false;

        return;
      } else if (this.params.smcode == "") {
        Toast.info("请填写验证码");
        this.isBookSubmit = false;
        return;
      }
      
      let user = localStorage.getItem("user")?JSON.parse(localStorage.getItem('user')):'';
      if(user){
        this.params.openid=user.openid;
        this.params.userId=user.id;
      }
      addBook(this.params).then(res => {
        let that = this;
        if (res.code == 0) {
          Toast.info("预约成功");
          this.closeDialog();
        } else {
          Toast.info("预约失败" + res.message);
        }
      });
    },
    getCode() {
      if (this.params.mobile == "") {
        Toast.info("请输入手机号码");
        return;
      }
      if (!isMobile(this.params.mobile)) {
        Toast.info("请填写正确的手机号码");
        return;
      }

      if (this.isGetSmCode) return;

      this.smcode.mobile = this.params.mobile;
      this.isGetSmCode = true;
      getSmCode(this.smcode).then(res => {
        if (res.code == 0) {
          var auth_timetimer = setInterval(() => {
            this.auth_time--;
            this.hasSmCode = true;
            this.smcodebtnTxt = this.auth_time + "秒后重新获取";
            if (this.auth_time <= 0) {
              clearInterval(auth_timetimer);
              this.smcodebtnTxt = "获取验证码";
              this.isGetSmCode = false;
            }
          }, 1000);
        } else {
          this.isGetSmCode = false;
          Toast.info(res.message);
        }
      });
    },
    agree() {}
  }
};
</script>


<style lang="stylus">
#auction-book
    position absolute
    left 0
    right 0
    bottom 0
    top 0
    background rgba(0, 0, 0, 0.8)
    .book-dialog
        width 6rem
        position absolute
        left 50%
        top 50%
        transform translateX(-50%) translateY(-50%)
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
</style>


