<template>
  <div class="tabbar">
    <div class="tab" :class="{'tab-active': activeTab==0}" @click="handleClick()">
      <i class="icon-tab icon-home"></i>
      <div class="label">首页</div>
    </div>
    <div class="tab" :class="{'tab-active': activeTab==1}" @click="handleClick('books')">
      <i class="icon-tab icon-book"></i>
      <div class="label">预约</div>
    </div>
    <div class="tab" :class="{'tab-active': activeTab==2}" @click="handleClick('uc')">
      <i class="icon-tab icon-uc"></i>
      <div class="label">我的</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "tab-bar",
  props: {
    activeTab: {
      type: String,
      required: true
    }
  },
  methods: {
    handleClick(path) {
      path = path || "/";
      this.$router.push({path:path})
    }
  },
  watch: {}
};
</script>
<style lang="stylus">
   .tabbar
    display flex
    align-items center
    justify-content center
    .tab-active
      color #21c2ae !important
    .tab
      display flex
      align-content center
      justify-content center
      flex 1
      padding 0.1rem 
      color #999999
      text-align center
      flex-direction column
      align-items center
      .icon-tab
        height 0.46rem
        width .46rem
        font-size .46rem
      .label
        font-size .3rem
        padding-top .1rem
</style>
