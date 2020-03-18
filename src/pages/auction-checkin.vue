<template>
    <!-- <img :src="qrcodeUrl" class="qrcode" border="5px" /> -->
    <div @click="toWeapp" class="check-btn"> 预约签到</div>
</template>

<script>
import { bookCheckin } from "@/common/utils/api";
import wx from "weixin-js-sdk";
export default {
  created() {
    //this.loadData();
  },
  data() {
    return {
      qrcodeUrl: ""
    };
  },
  methods: {
    toWeapp() {
      let assetId = this.$route.params.assetId;
      let timeId = this.$route.params.timeId;
      alert('1')
      wx.miniProgram.navigateTo({
        url: "/pages/auction/checkin?assetId=" + assetId + "&timeId=" + timeId
      });
    },
    loadData() {
      let assetId = this.$route.params.assetId;
      let timeId = this.$route.params.timeId;
      //   let user = localStorage.getItem("user")?JSON.parse(localStorage.getItem('user')):'';
      //   let userId ='';
      //   if(user){
      //       userId=user.id;
      //   }
      //   if (assetId&&timeId&&userId) {
      //     let params = { assetId: assetId,timeId:timeId,userId:userId };
      //     bookCheckin(params).then(res=>{
      //         if(res.code==0){
      //             alert('恭喜你，签到成功');
      //         }else if(res.code==30013){
      //             alert(res.message);
      //         }else{
      //             alert(res.message);
      //         }
      //         this.$router.push({path:'/auction/detail/'+assetId})
      //     });
      //   }else{
      //       alert('参数错误')
      //   }

      //   wx.miniProgram.navigateTo({
      //     url: "../auction/checkin?assetId=" + assetId+"&timeId="+timeId
      //   });
    }
  }
};
</script>

<style lang="stylus">
.qrcode
    display block
    margin 1rem auto;
.check-btn
    height .4rem
    line-height .4rem 
    padding .1rem 0
    background #29ba8a
    color #ffffff
    font-size .24rem
    text-align center
</style>


