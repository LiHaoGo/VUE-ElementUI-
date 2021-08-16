<template>
  <div>
    <Table v-if="routePath" />
    
    <router-view />
    <!-- <h1>信息管理</h1> -->
  </div>
</template>
<script>
import Table from "../../table/Table";
export default {
  name: "Wms",
  components: { Table },
  data() {
    return { routePath: false };
  },
  created() {
    this.getPath();
  },
  watch:{
  $route(to,from){
    this.getPath();
  }
},
  methods: {
    getPath() {
      if (this.$route.fullPath != "/wms/list") {
        this.routePath = true
      }else{
          this.routePath = false
      }
      console.log(this.$route);
    },
  },
};
</script>