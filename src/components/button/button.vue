<template>
    <div class="button" :class="{disabled:disabled==true}" v-text="btnTxt" @click="btnClick">
    
    </div>
</template>


<script>
export default {
    name:"pai-button",
    props:{
        disabled: {
            type: Boolean,
            default: false
        },
        btnTxt:{
            type:String,
            default:""
        }
    },
    methods:{
        btnClick(event){
           if (this.disabled) {
                event.stopImmediatePropagation()
            } else {
                this.$emit('click', event)
            }    
        }
    }

}
</script>


<style lang="stylus" scoped>
    .button
        display: block
        margin: 0
        padding: .3rem 0
        width: 100%
        text-align: center
        white-space: nowrap
        cursor: pointer
        font-size: .36rem
        height .4rem
        line-height: .4rem
        color: #fff
        background: #1abd98
        outline: none
        border: none
        border-radius: .5rem
        -webkit-tap-highlight-color: transparent
        &.disabled
            background-color #ccc

</style>
