import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'echarts/map/js/china.js' 
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts' // 这一步是引入echarts的插件
Vue.prototype.$echarts = echarts // 这一步是为了能在全局直接使用
import axios from 'axios'
import VueAnimateNumber from 'vue-animate-number'
Vue.use(VueAnimateNumber)
Vue.config.productionTip = false
Vue.prototype.$http = axios
axios.defaults.baseURL ='https://www.fastmock.site/mock/f94bc8cefab17f7d44eae41086af01bd/element'
import VueAMap from "vue-amap";
Vue.use(ElementUI);
Vue.use(VueAMap);
// 初始化vue-amap
VueAMap.initAMapApiLoader({
  key: "f6aa810d5118de88a3ee2110ba15395a", // 这里写你申请的高德地图的key
  plugin: ["AMap.Autocomplete", "AMap.Geocoder", "AMap.Geolocation"],
  v: "1.4.15",
  uiVersion: "1.1"
});

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
}).$mount('#app')