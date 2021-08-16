<template>
  <!-- 左侧导航栏 -->
  <el-aside width="200px" >
    <el-menu 
      :default-active="$route.path"
      exact 
      class="el-menu-vertical-demo "
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <NavItem   :item="item"  v-for="item in item" :key="item.id" />
    </el-menu>
  </el-aside>
</template>
<script>
import NavItem from './NavItem'
export default {
    components:{
        NavItem
    },
  data() {
    return { item: [1] };
  },
  mounted() {
    this.getNav();
  },
  methods: {
    getNav() {
      this.$http.get("/api/nav").then((res) => {
        this.item = res.data.data;
      });
    },
  },
};
</script>
<style scoped>
.el-menu{
    height: 100%;
    min-width: 2rem;
}
.el-aside{
  overflow: hidden;
}
</style>