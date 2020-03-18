<template>
    
    
    


<div class="page">
    <div class="header">

    </div>

    <div class="body" ref="wrapper" style="height:712px;">
        <div class="main">

        </div>
    </div>

    <div class="footer">
        
    </div>
</div>






    
</template>



<script>
import BScroll from "better-scroll";
import DropMenu from "@/components/drop-menu/drop-menu";
import DistPicker from "@/components/dist-picker/dist-picker";

//import Popup from '@/components/popup/popup'
import { Popup } from "mand-mobile";
import httputil from "@/common/utils/httputil";
import TabBar from "@/components/tab-bar/tab-bar";
export default {
  mounted() {
    this.$nextTick(() => {
      //   this.scroll = new BScroll(this.$refs.wrapper, {});
      //   alert(this.scroll.wrapperHeight)
      //   alert(this.scroll.scrollerHeight)
      //  console.log(this.scroll)
    });

    // httputil.get('asset/list',{}).then(res=>{
    //     console.log(res)
    // })
  },
  components: { DropMenu, [DistPicker.name]: DistPicker, [Popup.name]: Popup },
  data() {
    return {
      isPopupShow: true
    };
  }
};
</script>


<style lang="stylus">
    .header
        position absolute 
        top 0
        left 0
        width 100%
        padding .15rem 0
        background  #f00
    .footer
        position absolute
        bottom 0
        left 0
        width 100%
        padding .15rem 0
        background #ff0


</style>

