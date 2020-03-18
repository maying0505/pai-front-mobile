<template>

  <div class="drop-menu" :class="{'drop-menu-active':isPopupShow}">
    <div class="drop-menu-bar">
      <div class="item-bar" :class="{'item-bar-active':sortStr}" @click='menuClick(1)'>
        <span>{{sortStr?sortStr:'排序'}}</span>
      </div>
      <div class="item-bar" :class="{'item-bar-active':typeStr}" @click='menuClick(2)'>
        <span>{{typeStr?typeStr:'类型'}}</span>
      </div>
      <div class='item-bar' :class="{'item-bar-active':districtStr}" @click='menuClick(3)'>
        <span v-text="distinctStr" :title="distinctStr"></span>
      </div>
      <div class='item-bar' @click='menuClick(4)'>
        <span>更多</span>
      </div>
    </div>

    <div class="popup" v-if="isPopupShow" @click="maskClick">
      <div class="popup-mask"></div>
      <div class="popup-box slide-down">
        <div class="drop-menu-list" v-if="activeMenuIndex==1">
          <div class="row-list">

            <template v-for="(item,index) in sortList">
              <div class="row-item" :class="{'row-item-active':item.id==params.sort}" @click="sortItemClick(item)" :key="index">
                <div class="txt">{{item.text}}</div>
                <div class="icon"></div>
              </div>
            </template>
          </div>
        </div>
        <div class="drop-menu-list" v-if="activeMenuIndex==2">
          <div class="row-list">

            <template v-for="(item,index) in typeList">
              <div class="row-item" :class="{'row-item-active':item.id==params.type}" @click="typeItemClick(item)" :key="index">
                <div class="txt">{{item.text}}</div>
                <div class="icon"></div>
              </div>
            </template>
          </div>
        </div>
        <div class="drop-menu-list" v-if="activeMenuIndex==3">
          <div class="distinct-list">
            <div class="province-list" v-show="provinces">
              <div class="item" :class="{'active':item==currentProvince}" v-for="(item, index) in provinces" :key="index" @click.stop="chooseProvince(item)">{{item}}</div>
            </div>
            <div class="city-list" v-show="cities">
              <div class="item" :class="{'active':item==currentCity}" v-for="(item,index) in cities" :key="index" @click.stop="chooseCity(item)">{{item}}</div>
            </div>
            <div class="area-list" v-show="areas">
              <div class="item" :class="{'active':item==currentArea}" v-for="(item,index) in areas" :key="index" @click.stop="chooseArea(item)">{{item}}</div>
            </div>

          </div>

          <div class='confirm-cancel'>
            <div class='cancel' @click.stop='distinctCancel'>重置</div>
            <div class='confirm' @click.stop='distinctConfirm'>确认</div>
          </div>

        </div>

        <div class="drop-menu-list" v-if="activeMenuIndex==4">
          <div class="custom-list">
            <div class="status-list">
              <div class="status-text">拍卖状态</div>
              <div class="tag-list">
                <div class="tag" :class="{active:state.id==params.status}" v-for="(state,index) in statusList" :key="index" v-text="state.text" @click.stop="statusItemClick(state)">

                </div>
              </div>
            </div>
            <div class="time-list">
              <div class="time-text">
                拍卖时间
              </div>
              <div class="tag-list">
                <div class="tag" :class="{active:time.id==params.time}" v-for="(time,index) in timeList" :key="index" v-text="time.text" @click.stop="timeItemClick(time)">

                </div>
              </div>
            </div>
          </div>

          <div class="confirm-cancel">
            <div class="cancel" @click.stop="customCancel">
              重置
            </div>
            <div class="confirm" @click.stop="customConfirm">
              确认
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>


<script>
import {
  sortList,
  typeList,
  statusList,
  timeList,
  distinctList
} from "./data.js";
import { Popup } from "mand-mobile";
import DiskPicker from "@/components/dist-picker/dist-picker";
const params = {
  sort: "-1",
  type: "-1",
  province: "",
  city: "",
  area: "",
  status: "-1",
  time: "-1"
};
const DEFAULT_CODE = 100000;
export default {
  name: "drop-menu",
  components: { [Popup.name]: Popup, [DiskPicker.name]: DiskPicker },
  props: {
    province: "",
    city: "",
    area: ""
  },
  data() {
    return {
      sortList: sortList,
      typeList: typeList,
      statusList: statusList,
      timeList: timeList,
      distinctList: distinctList,
      sortStr: "",
      typeStr: "",
      districtStr:"",
      activeMenuIndex: -1,
      isPopupShow: false,
      params: params,
      provinces: "",
      cities: "",
      areas: "",
      currentProvince: "",
      currentCity: "",
      currentArea: ""
    };
  },
  created() {
    this.initDistinctData();
  },
  methods: {
    menuClick(index) {
      if (!this.isPopupShow) {
        this.isPopupShow = true;
        this.activeMenuIndex = index;
      } else {
        this.isPopupShow = false;
      }
    },
    initDistinctData() {
      if (this.area) {
        this.areas = this.getData(this.getCode(this.city));
        this.currentArea = this.area;
      } else if (this.city) {
        this.cities = this.getData(this.getCode(this.province));
        this.currentCity = this.city;
      } else {
        this.provinces = this.getData(this.getCode(this.province));
        this.currentProvince = this.province;
      }
    },
    maskClick() {
      this.isPopupShow = false;
    },
    sortItemClick(item) {
      this.params.sort = item.id;
      this.sortStr = item.text;
      this.$emit("paramsChange", this.params);
    },
    typeItemClick(item) {
      this.params.type = item.id;
      this.typeStr = item.text;
      this.$emit("paramsChange", this.params);
    },
    statusItemClick(item) {
      this.params.status = item.id;
    },
    timeItemClick(item) {
      console.log(item);
      this.params.time = item.id;
    },
    onSelected() {
      this.$emit("paramsChange", this.params);
    },
    chooseProvince(item) {
      if (item == this.currentProvince) return;
      this.currentProvince = item;
      this.currentCity = "";
      this.currentArea = "";

      let cities = this.getCities(item);
      if (cities) {
        this.cities = cities;
        this.areas=''
      }
    },
    chooseCity(item) {
      if (item == this.currentCity) return;
      this.currentCity = item;
      this.currentArea = "";
      let areas = this.getAreas(item);
      if (areas) {
        this.areas = areas;
      }
    },
    chooseArea(item) {
      this.currentArea = item;
    },
    getData(code) {
      code = code ? code : DEFAULT_CODE;
      return this.distinctList[code] || [];
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
      for (let x in distinctList) {
        for (let y in distinctList[x]) {
          if (name == distinctList[x][y]) {
            return y;
          }
        }
      }
    },

    getCodeValue(code) {
      for (let x in distinctList) {
        for (let y in distinctList[x]) {
          if (code === parseInt(y)) {
            return distinctList[x][y];
          }
        }
      }
    },
    distinctConfirm() {
      this.isPopupShow = false;
      this.params.province = this.currentProvince;
      this.params.city = this.currentCity;
      this.params.area = this.currentArea;
      this.$emit("paramsChange", this.params);
    },
    distinctCancel() {
      this.params.province = "";
      this.params.city = "";
      this.params.area = "";
      this.currentProvince = "";
      this.currentCity = "";
      this.currentArea = "";
      this.isPopupShow = false;
      this.$emit("paramsChange", this.params);
    },
    customConfirm() {
      this.isPopupShow = false;
      this.$emit("paramsChange", this.params);
    },
    customCancel() {
      this.isPopupShow = false;
      this.params.status = -1;
      this.params.time = -1;
      this.$emit("paramsChange", this.params);
    }
  },
  computed: {
    distinctStr() {
      let p = this.currentProvince ? this.currentProvince : "";
      let c = this.currentCity ? this.currentCity : "";
      let a = this.currentArea ? this.currentArea : "";
      return p + c + a ? p + c + a : "地区";
    }
  }
};
</script>


<style>
.drop-menu {
  color: #666;
}

.drop-menu-active {
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translateZ(0);
  transition: all ease-in 0.3s;
}

.drop-menu-bar {
  display: flex;
  height: 0.8rem;
  background: #fff;
  position: relative;
}

.drop-menu-active .drop-menu-bar {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 102;
  width: 100%;
}

.drop-menu-bar:before {
  content: "";
  position: absolute;
  background-color: #d9d9d9;
  transform-origin: 100% 50%;
  transform: scaleY(0.5) translateY(100%);
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
}

.item-bar {
  display: flex;
  flex: 1;
  margin: 2% 0;
  align-items: center;
  justify-content: center;
  font-size: 0.24rem;
  color: #323232;
}

.item-bar span {
  position: relative;
  padding-right: 0.6rem;
  width: 1.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}

.item-bar span:after {
  content: "";
  position: absolute;
  right: 0;
  top: 50%;
  width: 0;
  height: 0;
  margin-top: -0.04rem;
  border-left: 0.08rem solid transparent;
  border-right: 0.08rem solid transparent;
  border-top: 0.09rem solid #666;
  border-radius: 0.04rem;
  transition: transform 0.3s cubic-bezier(0.86, 0, 0.07, 1);
}

.item-bar span .active span:after {
  transform: rotate(180deg);
}

.item-bar-active {
  color: #1abd98;
}

.item-bar span .selected {
  color: #1abd98;
}

.item-bar span .disabled {
  opacity: 0.8;
}

.item-bar span .active {
  color: #1abd98;
}

.popup {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  transform: translateZ(0);
  z-index: 100;
}

.popup-mask {
  top: 0;
  right: 0;
  bottom: -1rem;
  left: 0;
  position: absolute;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.4);
}

.popup-box {
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
  z-index: 102;
}

.drop-menu-list {
  max-height: 10rem;
  overflow: scroll;
  padding-top: 0.8rem;
  box-shadow: 0 0 5px #cdcdcd;
  transition: height ease-in 0.3s;
}

.row-list,
.distinct-list,
.custom-list {
  z-index: 1000;
  background: #fff;
}

.row-list .row-item {
  display: flex;
  padding: 0.2rem;
  font-size: 0.24rem;
  position: relative;
}
.row-item-active .txt,
.row-item-active .icon {
  color: #1abd98;
}

.row-list .row-item:before {
  content: "";
  position: absolute;
  z-index: 10005;
  background-color: #d9d9d9;
  transform-origin: 100% 50%;
  transform: scaleY(0.5) translateY(100%);
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
}

.row-list .row-item .txt {
  flex: 1;
  height: 0.3rem;
  line-height: 0.3rem;
}

.row-list .row-item .icon {
  width: 0.24rem;
  height: 0.24rem;
  color: #1abd98;
}

.row-list .row-item .row-item-choosen {
  color: #1abd98;
}

.distinct-list {
  display: flex;
  flex-direction: row;
  height: 5rem;
  overflow: scroll;
}

.province-list,
.city-list,
.area-list {
  flex: 1;
  border-left: 1px solid #ccc;
  height: 5rem;

  overflow: scroll;
}

.province-list .item,
.city-list .item,
.area-list .item {
  padding: 0.2rem;
  position: relative;
  color: #666;
  font-size: 0.3rem;
}

.province-list .active,
.city-list .active,
.area-list .active {
  color: #40b573;
}

.province-list .item:after,
.city-list .item:after,
.area-list .item:after,
.confirm-cancel:after {
  content: "";
  position: absolute;
  z-index: 10005;
  background-color: #d9d9d9;
  transform-origin: 100% 50%;
  transform: scaleY(0.5) translateY(100%);
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
}

.confirm-cancel {
  height: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  text-align: center;
  box-shadow: 0 0 5px #cdcdcd;
}

.confirm,
.cancel {
  flex: 1;
  color: #fff;
  font-size: 0.3rem;
  height: 0.4rem;
  line-height: 0.4rem;
  padding: 0.2rem 0;
}

.confirm {
  background: #1abd98;
}

.cancel {
  background: #fff;
  color: #666;
}

.custom-list {
  background: #fff;
  text-align: center;
}

.status-list,
.time-list {
  padding: 0.2rem 0.45rem;
}

.status-list {
  border-bottom: 1px solid #ccc;
}

.status-text,
.time-text {
  color: #333;
  font-size: 0.3rem;
  text-align: left;
  margin-bottom: 0.1rem;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
}

.tag {
  width: 1.2rem;
  height: 0.4rem;
  line-height: 0.4rem;
  font-size: 0.3rem;
  color: #666;
  border: 1px solid #666;
  border-radius: 3px;
  margin-right: 0.2rem;
  margin-bottom: 0.2rem;
}

.tag-list .active {
  color: #40b573;
  border: 1rpx solid #40b573;
}
</style>
