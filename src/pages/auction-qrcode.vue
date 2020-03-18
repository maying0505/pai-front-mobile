<template>
    <img :src="qrcodeUrl" class="qrcode" />
</template>

<script>
import { bookQrcode ,assetQrcode} from "@/common/utils/api";
export default {
  created() {
    this.loadData();
  },
  data(){
      return {
          qrcodeUrl:''
      }
  },
  methods: {
    loadData() {
      let assetId = this.$route.params.assetId;
      if (assetId) {
        let params = { assetId: assetId };
        assetQrcode(params).then(res=>{
            if(res.code==0){
                this.qrcodeUrl=res.data;
            }
        });
      }
    }
  }
};
</script>

<style lang="stylus">
    .qrcode
        display block
        margin 1rem auto
        border 5px solid #ccc
</style>


