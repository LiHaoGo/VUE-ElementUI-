<template>
     <!-- 面包屑 -->
          <div class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item v-for="(item,index) in list" :key="index" :to="item.path">{{item.meta.title}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
</template>
<script>
export default {
  data(){
    return {
      list:[]
    }
  },
  created(){
    // 刷新的时候，获取到路由信息，显示面包屑
    this.list = this.$route.matched;
    // console.log(this.$route)
  },
  watch:{  // 监听
    $route(route){
      
      let matched = route.matched;
      this.list = matched;
      console.log(this.list)
    }
  }
}
</script>
<style>
.el-breadcrumb__item{
line-height: .6rem;
}
</style>