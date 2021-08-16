<template>
  <el-descriptions direction="vertical" :column="4" border>
    <el-descriptions-item label="用户名"> {{userData.name}}</el-descriptions-item>
    <el-descriptions-item label="手机号">{{userData.iphone}}</el-descriptions-item>
    <el-descriptions-item label="居住地" :span="2">{{userData.access}}</el-descriptions-item>
    <el-descriptions-item label="备注">
      <el-tag size="small">{{userData.remarks}}</el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="联系地址"
      >{{userData.callAccess}}</el-descriptions-item
    >
  </el-descriptions>
</template>

<script>
export default {
  name:'List',
  data() {
    return {
    };
  },
  props: ["userData"],
   created() {
    this.getData();
  },
  methods: {
    getData() {
      // console.log(this.userData);
    },
  },
};
</script>
