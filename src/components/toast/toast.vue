<template>
    <div class="toast" :class="[position]">
        <popup v-model="visiable"  :hasMask="hasMask" @hide="$hide">

            <div class="toast-content">
                <span v-text="content"></span>
            </div>

        </popup>
    </div>
</template>


<script>
import Popup from '@/components/popup/popup'
export default {
    name:'toast',
    components:{[Popup.name]:Popup},
    props:{
        content:{
            type:String,
            default:''
        },
        duration:{
            type:Number,
            default:0
        },
        position:{
            type:String,
            default:'center'
        },
        hasMask:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
            visiable:true
        }
    },
    mounted(){
        this.$update();
    },
    updated(){
        this.$update();
    },
    beforeDestroy(){
        if(this.duration){
            clearTimeout(this.$timer)
        }
    },
    methods:{
        $update(){
            clearTimeout(this.$timer)
            if(this.visiable&&this.duration){
                this.$timer=setTimeout(()=>{
                    this.hide()
                },this.duration)
            }
        },
        $hide(){
            this.$emit('hide')
        },
        hide(){
            this.visiable=false;
        }
    }
}
</script>


<style lang="stylus">
    .toast
        position relative
        z-index 1
        .toast-content
            position relative
            display inline-block
            text-align left
            padding 0.26rem
            border-radius 5px
            font-size .24rem
            color #fff
            background-color rgba(0,0,0,.8)
            box-sizing content-box
        .popup
            .popup-box
                width 80%
                text-align center
                overflow visible
            .popup-mask
                background transparent

</style>


