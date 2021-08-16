<template>
  <div
     v-loading="loading"
    ref="echarts"
    style="width: 100%; height: 400px"
    class="echarts stdy-t-left"
  ></div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "Echarts",
  data() {
    return {  loading: true};
  },
  props: ["optionData"],
  mounted() {
    this.getInit();
  },
  methods: {
    init() {
      console.log(this.optionData);
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(this.$refs.echarts);

      // 指定图表的配置项和数据
      let option = this.optionData;

      // var data = [option,option1,option2];
      //  console.log(JSON.stringify(data));

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    getInit(){
   let timer =   setInterval(()=>{
       if(this.optionData){
          this.init()
          this.loading = false;
          clearInterval(timer)
       } 
      },100)
        
    }
  },
  watch:{
    
    
  }
};
</script>