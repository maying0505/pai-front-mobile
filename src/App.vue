
<template>
  <div id="app">
    <!-- <template v-if="isHome">
      <router-view></router-view>
    </template>
    <template v-else>
       
    </template> 
    <div class="main">
   
    </div>-->

<!--
    <div class="footer">
        <tab-bar
          v-model="selectedLabelDefault"
          :data="tabs"
          @click="clickHandler"
          @change="changeHandler">
        </tab-bar>
    </div>-->

       <router-view></router-view>
  </div>
</template>



<script>
export default {
  name: "App",
  methods: {
    clickHandler(label) {
      console.log("tab was clicked", label);
    },
    changeHandler(label) {
      console.log("value has changed, now is", label);
    },
    back() {
      this.$router.back();
    }
  },
  computed: {
    isHome() {
      var path = this.$route.path;
      return path == "/" || this.paths.indexOf(path) !== -1;
    },
    title() {
      return this.$route.meta;
    }
  }
};
</script>



<style lang="stylus">

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  background #f0f0f0
  height  100%
  overflow hidden

  .footer
    position absolute
    height 1rem
    bottom 0
    left 0
    right 0
    box-shadow 0 0 5px #cdcdcd
    background #fff

 
    




</style>
