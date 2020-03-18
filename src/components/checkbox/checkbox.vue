<template>
  <div
    class="checkbox"
    :class="[
      disabled ? 'disabled' : '',
      value ? 'active' : '']"
    @click="$onChange($event)">
    <div class="active-point"></div>
  </div>
</template>

<script>
export default {
  name: 'pai-checkbox',

  props: {
    value: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {}
  },

  methods: {
    // MARK: events handler, 如 $_onButtonClick
    $onChange(event) {
      if (this.disabled) {
        return
      }
      this.$emit('input', !this.value)
      this.$emit('change', event)
    },
  },
}
</script>

<style lang="stylus">
.checkbox
  box-sizing border-box
  position relative
  width 20px
  height 20px
  border-radius 50%
  background-color #ccc
  &.disabled
    opacity .4
  &::before, &::after,.active-point
    content ""
    position absolute
    transition transform .3s
  &::before
    top 0
    left 0
    width 20px
    height 20px
    border-radius 50%
    background-color #ccc
  &::after
    top 2px
    left 2px
    width 16px
    height 16px
    background-color #fff
    border-radius 50%
 
  &.active::before
      transform scale(0)
  &.active::after
      transform translateX(0)
  .active-point
    background #ffffff
    width 10px
    height 10px
    left 5px
    top 5px
  &.active
    .active-point
      background #41b572 
      z-index 1
      border-radius 50%

</style>
