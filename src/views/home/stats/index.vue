<template>
  <div >
      <Map  />
    <Echarts v-for="(item,index) in optionList" :key="index" :optionData="item" />
  
  </div>
</template>
<script>
import Echarts from "../../../components/Echarts";
import Map from "../../../components/Map"
export default {
  name: "Stats",
  components: { Echarts,Map },
  data() {
    return { options: '',optionList:[] };
  },
  created(){
this.getEcharts()
  },
  methods: {
    getEcharts() {
      this.$http({
        method: "get",
        url: "/api/echartList",
      }).then((res) => {
         console.log(res.data[1]);
        this.optionList = res.data
        this.options = res.data[1];
      });
    },
  },
};
</script>