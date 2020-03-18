<template>
  <div
    class="tab"
    :class="{'tab-active': isActive}" :path="path"
    @click="handleClick">
      <i :class="icon" class="icon-tab"></i>
      <div v-html="label" class="label"></div>
  </div>
</template>
<script>
  export default {
    name: 'tab',
    props: {
      label: {
        type: [String, Number],
        required: true
      },
      icon: {
        type: String,
        default: ''
      },
      path:{
          type:String,
          default:''
      }
    },
    mounted () {
      this.$parent.addTab(this)
    },
    destroyed () {
      this.$parent.removeTab(this)
    },
    computed: {
      isActive () {
        return this.$parent.value === this.label
      }
    },
    methods: {
      handleClick (item) {
        this.$parent.trigger(this.label)
        console.log(this.path)
        this.$router.push({path:this.path});
        console.log(this.$router)
      }
    }
  }
</script>
<style lang="stylus" scoped>

  .tab
    flex 1
    padding 0.1rem 
    color #999999
    text-align center
    flex-direction column
    align-items center
  .tab-active
    color #21c2ae
  .icon-tab
    height 0.46rem
    width .46rem
    font-size .46rem
  .label
    font-size .3rem
    padding-top .1rem
</style>
