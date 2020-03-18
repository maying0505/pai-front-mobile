<template>
    <div v-show="isPopupShow" class="popup" :class="[hasMask?'with-mask':'',position]">
        <transition name="fade">
            <div v-show="hasMask&&isPopupBoxShow" @click="popupMaskClick" class="popup-mask">

            </div>

        </transition>

        <transition name="fade"
               @before-enter="popupTransitionStart" @before-leave="popupTransitionStart" 
               @after-enter="popupTransitionEnd" @after-leave="popupTransitionEnd">
            <div class="popup-box fade" v-show="isPopupBoxShow">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>


<script>
export default {
  name: "popup",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    hasMask: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: "center"
    },
    transition: {
      type: String,
      default: "fade"
    },
    preventScroll: {
      type: Boolean,
      default: false
    },
    preventScrollExclude: {
      type: [String, HTMLElement],
      default() {
        return "";
      }
    }
  },
  data() {
    return {
      isPopupShow: false,
      isPopupBoxShow: false,
      isAnimation: false
    };
  },
  watch: {
    value(val) {
      if (val) {
        if (this.isAnimation) {
          setTimeout(() => {
            this.showPopupBox();
          }, 50);
        } else {
          this.showPopupBox();
        }
      } else {
        this.hidePopupBox();
      }
    }
  },
  mounted() {
    this.value && this.showPopupBox();
  },
  methods: {
    showPopupBox() {
      this.isPopupShow = true;
      this.isAnimation = true;
      this.$nextTick(() => {
        this.isPopupBoxShow = true;
        this.popupTransitionEnd();
      });
      this.preventScroll && this.$preventScroll(true);
    },
    popupTransitionStart() {
      if (!this.isPopupBoxShow) {
        this.$emit("beforeHide");
        this.$emit("before-hide");
      } else {
        this.$emit("beforeShow");
        this.$emit("before-show");
      }
    },
    popupTransitionEnd() {
      if (!this.isAnimation) return;

      if (!this.isPopupBoxShow) {
        this.isPopupShow = false;
        this.$emit("hide");
      } else {
        this.$emit("show");
      }
      this.isAnimation = true;
    },
    popupMaskClick() {
      this.hidePopupBox();
    },
    hidePopupBox() {
      this.isAnimation = true;
      this.isPopupBoxShow = false;
      this.$preventScroll(false);
      this.popupTransitionEnd();
    },
    $preventScroll(isBind) {
      const handler = isBind ? "addEventListener" : "removeEventListener";
      const masker = this.$el.querySelector("popup-mask");
      const boxer = this.$el.querySelector("popup-box");

      masker && masker[handler]("touchmove", this.$preventDefault(), false);
      boxer && boxer[hander]("touchmove", this.$preventDefault(), false);
      this.$preventScrollExclude(isBind);
    },
    $preventScrollExclude(isBind, preventScrollExclude) {
      const handler = isBind ? "addEventListener" : "removeEventListener";
      preventScrollExclude = preventScrollExclude || this.preventScrollExclude;
      const excluder =
        preventScrollExclude && typeof preventScrollExclude === "string"
          ? this.$el.querySelector(preventScrollExclude)
          : preventScrollExclude;
      excluder &&
        excluder[handler]("touchmove", this.$stopImmediatePropagation, false);
    },
    $preventDefault(event) {
      event.preventDefault();
    },
    $stopImmediatePropagation(event) {
      event.stopImmediatePropagation();
    }
  }
};
</script>

<style lang="stylus">
.popup
  &.with-mask
    left 0
    right 0
    top 0
    bottom 0
    z-index 10000
    position fixed
    .popup-box
      position absolute
      z-index 2
  .popup-box
    position fixed
    z-index 5
    max-width 100%
    max-height 100%
    overflow auto
    will-changer auto
  .popup-mask
    left 0
    right 0
    top 0
    bottom 0
    z-index 1
    position absolute
    background rgba(0, 0, 0, 0.4)
    border-bottom 1px solid #f00
  &.center .popup-box
    top 50%
    right auto
    bottom auto
    left 50%
    transform translate(-50%, -50%)
  .fade-enter-active, .fade-leave-active
    transition opacity 0.3s
  .fade-enter, .fade-leave-to, .fade-leave-active
    opacity 0
</style>







