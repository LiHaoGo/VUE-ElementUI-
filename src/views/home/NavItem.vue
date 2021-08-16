<template>
  <div class="navItem ">
      <!-- 无子级 -->
    <el-menu-item :index="item.url" v-if="!item.child">
      <i :class="item.iconFont"></i>
      <span slot="title">{{item.name}}</span>
    </el-menu-item>
    <!-- 有子级 -->
    <el-submenu :index="item.url" v-else>
      <template slot="title">
        <i :class="item.iconFont"></i>
        <span>{{item.name}}</span>
      </template>
      <el-menu-item :index="itemChild.url" v-for="itemChild in item.child" :key="itemChild.id" >{{itemChild.name}}</el-menu-item>
    
    </el-submenu>
    
  </div>
</template>
<script>
export default {
    name:'NavItem',
    props:['item'], //父传子值
    data(){
        return{}
    }
}
</script>