<template>
  <div class="distpicker">
    <div class="province-list" v-show="provinces">
      <div class="item" :class="{'active':item==currentProvince}" v-for="(item, index) in provinces" :key="index" @click="chooseProvince(item)">{{item}}</div>
    </div>
    <div class="city-list" v-show="cities">
      <div class="item" :class="{'active':item==currentCity}" v-for="(item,index) in cities" :key="index" @click="chooseCity(item)">{{item}}</div>
    </div>
    <div class="area-list" v-show="areas">
      <div class="item" :class="{'active':item==currentArea}" v-for="(item,index) in areas" :key="index" @click="chooseArea(item)">{{item}}</div>
    </div>

  

    
  </div>
</template>
<script>
import DATA from "./data.js";
const DEFAULT_CODE = 100000;
export default {
  name: "dist-picker",
  props: {
    province: { type: [String, Number], default: "" },
    city: { type: [String, Number], default: "" },
    area: { type: [String, Number], default: "" }
  },
  data() {
    return {
      provinces: null,
      cities: null,
      areas: null,
      currentProvince: "",
      currentCity: "",
      currentArea: ""
    };
  },
  created() {
    if (this.area) {
      console.log("area");
      this.areas = this.getData(this.getCode(this.city));
      this.currentArea = this.area;
      this.showArea = true;
    } else if (this.city) {
      this.cities = this.getData(this.getCode(this.province));
      this.currentCity = this.city;
      this.showCity = true;
    } else {
      this.provinces = this.getData();
      this.currentProvince = this.provinces;
      this.showProvince = true;
    }
  },
  watch: {},
  methods: {
    chooseProvince(item) {
      if (item == this.currentProvince) return;
      this.currentProvince = item;
      let cities = this.getCities(item);
      if (cities) {
        this.cities = cities;
        this.showCity = true;
      }
    },
    chooseCity(item) {
      if (item == this.currentCity) return;
      this.currentCity = item;
      let areas = this.getAreas(item);
      if (areas) {
        this.areas = areas;
        this.showCity = true;
      }
    },
    chooseArea(item) {
      this.currentArea = item;
    },
    getData(code) {
      code = code ? code : DEFAULT_CODE;
      return DATA[code] || [];
    },
    getProvince(choose) {
      return this.getChooseData(choose);
    },

    getCities(choose) {
      return this.getChooseData(choose);
    },

    getAreas(choose, current) {
      return this.getChooseData(choose);
    },
    getChooseData(choose) {
      let code = this.getCode(choose);
      return this.getData(code);
    },
    getCode(name) {
      for (let x in DATA) {
        for (let y in DATA[x]) {
          if (name == DATA[x][y]) {
            return y;
          }
        }
      }
    },

    getCodeValue(code) {
      for (let x in DATA) {
        for (let y in DATA[x]) {
          if (code === parseInt(y)) {
            return DATA[x][y];
          }
        }
      }
    }
  }
};
</script>


<style lang="stylus">
.distpicker
  color #333
  background-color #ffffff
  height 100%
  overflow scroll
  display flex
  flex-direction row
  .province-list, .city-list, .area-list
    display flex
    flex 1
    border-left 1px solid #ccc
    height 5rem
    overflow scroll
    flex-direction column
    .item
      padding 0.2rem
      position relative
      color #666
      font-size 0.3rem
      &:after
        content ''
        position absolute
        z-index 10005
        background-color #d9d9d9
        transform-origin 100% 50%
        transform scaleY(0.5) translateY(100%)
        bottom 0
        left 0
        width 100%
        height 2px
    .active
      color #40b573
  .confirm-cancel
    height 0.8rem
    display flex
    justify-content center
    align-items center
    background #fff
    text-align center
    box-shadow 0 0 5px #cdcdcd
    .confirm, .cancel
      flex 1
      color #fff
      font-size 0.3rem
      height 0.4rem
      line-height 0.4rem
      padding 0.2rem 0
    .confirm
      background #1abd98
    .cancel
      background #fff
      color #666
</style>




