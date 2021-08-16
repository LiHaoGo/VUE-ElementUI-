<template>
    <div class="animateNumber">
    <animate-number   :duration ="duration" :to-color ="toColor" :from-color ="fromColor"  from="0" :to="Number(toNumber)"></animate-number>
    <span class="animate__text">访问来源: <i>{{title}}</i> </span>
    </div>
</template>
<script>
export default {
    name:"ActiveNumber",
    props:['duration','toColor','fromColor','toNumber','title']
}
</script>
<style  scoped>
 .animateNumber{
     display: inline-block;
     flex: 1;
     margin: 0 .2rem;
     /* background: pink; */
     box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
     background: #fff;
     border-radius: .08rem;
     line-height: 1rem;
 }
 .el-main .animateNumber  span{
     font-size: .5rem ;
     line-height: 0 !important;
 }
 .el-main .animateNumber .animate__text{
     font-size: .15rem;
     display: block;
     line-height: .2rem;
     margin-bottom: .3rem;
 }
 
</style>