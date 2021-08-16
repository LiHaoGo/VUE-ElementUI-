<template>
  <div>
    <div class="search-box">
      <el-input
        v-model="searchKey"
        type="search"
        id="search"
        placeholder="请输入详细地址"
      ></el-input>
      <!-- <button @click="searchByHand">搜索</button> -->
      <div class="tip-box" id="searchTip"></div>
    </div>
    <!--
      amap-manager： 地图管理对象
      vid：地图容器节点的ID
      zooms： 地图显示的缩放级别范围，在PC上，默认范围[3,18]，取值范围[3-18]；在移动设备上，默认范围[3-19]，取值范围[3-19]
      center： 地图中心点坐标值
      plugin：地图使用的插件
      events： 事件
    -->
    <div class="amap-box">
      <el-amap
        :amap-manager="amapManager"
        :vid="'amap-vue'"
        :zoom="zoom"
        :plugin="plugin"
        :center="center"
        :events="events"
      >
        <!-- 标记 -->
        <el-amap-marker
          v-for="(marker, index) in markers"
          :position="marker"
          :key="index"
        ></el-amap-marker>
      </el-amap>
    </div>
  </div>
</template>
<script>
import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap";
let amapManager = new AMapManager();
export default {
  props: ["city", "value", "longitude", "latitude", "isEdit"],
  data() {
    let self = this;
    return {
      address: null,
      searchKey: "",
      amapManager,
      markers: [],
      searchOption: {
        city: this.city ? this.city : "全国",
        citylimit: true
      },
      center: [121.329402, 31.228667],
      zoom: 17,
      lng: 0,
      lat: 0,
      loaded: false,
      events: {
        init() {
          lazyAMapApiLoaderInstance.load().then(() => {
            self.initSearch();
          });
        },
        // 点击获取地址的数据
        click(e) {
          self.markers = [];
          let { lng, lat } = e.lnglat;
          self.lng = lng;
          self.lat = lat;
          self.center = [lng, lat];
          self.markers.push([lng, lat]);
          // 这里通过高德 SDK 完成。
          let geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
          });
          geocoder.getAddress([lng, lat], function(status, result) {
            if (status === "complete" && result.info === "OK") {
              if (result && result.regeocode) {
                self.address = result.regeocode.formattedAddress;
                self.searchKey = result.regeocode.formattedAddress;
                self.$emit("updateLocation", lng, lat, self.searchKey);
                self.$nextTick();
              }
            }
          });
        }
      },
      // 一些工具插件
      plugin: [
        {
          // 定位
          pName: "Geolocation",
          events: {
            init(o) {
              // o是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  if (self.isEdit) {
                    // 设置经度
                    self.lng = self.longitude;
                    // 设置维度
                    self.lat = self.latitude;
                    // 设置坐标
                    self.center = [self.longitude, self.latitude];
                    self.markers.push([self.longitude, self.latitude]);
                  } else {
                    // 设置经度
                    self.lng = result.position.lng;
                    // 设置维度
                    self.lat = result.position.lat;
                    // 设置坐标
                    self.center = [self.lng, self.lat];
                    self.markers.push([self.lng, self.lat]);
                  }
                  // load
                  self.loaded = true;
                  // 页面渲染好后
                  self.$nextTick();
                }
              });
            }
          }
        }
      ]
    };
  },
  created() {
    if (this.value) {
      this.searchKey = this.value;
      this.address = this.value;
    }
    if (this.longitude && this.latitude) {
      this.lng = this.longitude;
      this.lat = this.latitude;
      this.center = [this.longitude, this.latitude];
      this.markers.push([this.longitude, this.latitude]);
    }
  },
  methods: {
    // 选择地址后自动定位到当前地址附近
    updateAddress(value, longitude, latitude) {
      this.searchKey = value;
      this.address = value;
      this.lng = longitude;
      this.lat = latitude;
      this.center = [longitude, latitude];
      this.markers.push([longitude, latitude]);
    },
    initSearch() {
      let vm = this;
      let map = this.amapManager.getMap();
      AMapUI.loadUI(["misc/PoiPicker"], function(PoiPicker) {
        let poiPicker = new PoiPicker({
          input: "search",
          placeSearchOptions: {
            map: map,
            pageSize: 10
          },
          suggestContainer: "searchTip",
          searchResultsContainer: "searchTip"
        });
        vm.poiPicker = poiPicker;
        // 监听poi选中信息
        poiPicker.on("poiPicked", function(poiResult) {
          let source = poiResult.source;
          let poi = poiResult.item;
          if (source !== "search") {
            poiPicker.searchByKeyword(poi.name);
          } else {
            poiPicker.clearSearchResults();
            vm.markers = [];
            let lng = poi.location.lng;
            let lat = poi.location.lat;
            let address = poi.name; // poi.cityname + poi.adname + poi.name
            vm.center = [lng, lat];
            vm.markers.push([lng, lat]);
            vm.lng = lng;
            vm.lat = lat;
            vm.address = address;
            vm.searchKey = address;
            vm.$emit("updateLocation", lng, lat, vm.searchKey);
          }
        });
      });
    },
    searchByHand() {
      if (this.searchKey !== "" && this.poiPicker) {
        this.poiPicker.searchByKeyword(this.searchKey);
      }
    }
  }
};
</script>
<style  scoped>
.search-box {
  margin-bottom: .1rem ;
  width: 30%;
}
.search-box input {
  padding: 0 15px;
  width: 100%;
  height: 32px;
  line-height: 32px;
  color: #606266;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}
.search-box input:focus {
  border-color: #409eff;
  outline: 0;
}
.search-box input::-webkit-input-placeholder {
  color: #c0c4cc;
}
.tip-box {
  width: 30%;
  max-height:280px;
  position: absolute;
  top: .38rem;
  z-index: 10000;
  overflow-y: auto;
  background-color: #fff;
}
.amap-ui-poi-picker-sugg,
.amap_lib_placeSearch {
  border: 1px solid #eee;
  border-radius: 4px;
}
.amap-box {
  height: 500px;
}
</style>
