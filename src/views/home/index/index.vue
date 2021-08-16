<template>
  <div style="min-width:12.7rem">
    <div class="activeNumber">
    <ActiveNumber
     v-for = "(item,index) in activeNumberList"
      :key = "index"
      :duration = "item.duration"
      :toNumber = "item.toNumber"
      :fromColor = "item.fromColor"
      :toColor = "item.toColor"
      :title = 'item.title'
       /></div>
    <!-- <Carousel /> -->
    <Echarts  
    :optionData ='options'
    />
 <Date />
  </div>
</template>
<script>
import Carousel from "../../../components/Carousel.vue";
import Echarts from "../../../components/Echarts.vue";
import ActiveNumber from "../../activeNumber/ActiveNumber"
import Table from "../../table/Table"
import Date from "../../date/Date"
export default {
  name: "Index",
  components: { Carousel,Echarts,ActiveNumber,Table,Date },
   data(){
     return {
       activeNumberList:[
         {title:'Google Chrome', duration:3500,toNumber:null,fromColor:'#b3d8ff',toColor:'#409EFF'},
         {title:'Microsoft Edge',duration:3500,toNumber:null,fromColor:'#fde2e2',toColor:'#F56C6C'},
         {title:'Firefox',duration:3500,toNumber:null,fromColor:'#b3d8ff',toColor:'#67C23A'},
         {title:'Safari',duration:3500,toNumber:null,fromColor:'#faecd8',toColor:'#E6A23C'},
         {title:'Opera',duration:3500,toNumber:null,fromColor:'#faecd8',toColor:'#909399'}
       ],
       options : ''
     }
   },
   created(){
   this.getNumber()
   this.getEcharts()
   },
  methods:{
     getNumber(){
       let num ;
       for(let i =0;i<5;i++){
       num =  Math.floor( Math.random()*10000);
        this.activeNumberList[i].toNumber = num <1000 ? num  * 10 :  num  
       }
     },
     getEcharts(){
       this.$http({
          method: "get",
            url: "/api/echartList",
       }).then(res=>{
        //  console.log(res.data[0]);
         this.options = res.data[0]
       })
     }
  }
};
</script>
<style  scoped>
.activeNumber{
  display: flex;
  margin-bottom: .2rem;
}
.el-main{
line-height: 1rem !important;
 }
</style>