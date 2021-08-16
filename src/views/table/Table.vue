<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="date" label="日期" width="150">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="province" label="省份" width="120">
      </el-table-column>
      <el-table-column prop="city" label="市区" width="120"> </el-table-column>
      <el-table-column prop="address" label="地址" width="300">
      </el-table-column>
      <el-table-column prop="zip" label="邮编" width="120"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-tooltip
            content="直接就看了,点什么哎"
            placement="left"
            effect="light"
          >
            <el-button type="text" size="small">查看</el-button></el-tooltip
          >
          <el-button type="text" @click="handleClick(scope)" size="small"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      :title="this.fromTitle"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="ltr"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="日期" :label-width="formLabelWidth">
            <el-input v-model="this.date" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="this.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="this.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮编" :label-width="formLabelWidth">
            <el-input v-model="this.zip" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button
            class="btn"
            type="primary"
            @click="$refs.drawer.closeDrawer()"
            :loading="loading"
            >{{ loading ? "提交中 ..." : "确 定" }}</el-button
          >
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Table",
  data() {
    return {
      dialog: false,
      loading: false,
      fromTitle: "",
      address: "",
      date: "",
      name: "",
      zip: "",
      form: {
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "80px",
      timer: null,
      tableData: [
        {
          date: "2021-08-04",
          name: "李浩",
          province: "上海",
          city: "长宁区",
          address: "上海市长宁区临新路 1518 弄",
          zip: 200333,
        },
        {
          date: "2021-08-04",
          name: "谈方培",
          province: "上海",
          city: "长宁区",
          address: "上海市长宁区临新路 1517 弄",
          zip: 200333,
        },
        {
          date: "2021-08-01",
          name: "刘洋",
          province: "上海",
          city: "长宁区",
          address: "上海市长宁区临新路 1519 弄",
          zip: 200333,
        },
        {
          date: "2021-08-03",
          name: "崔双飞",
          province: "上海",
          city: "长宁区",
          address: "上海市长宁区临新路 256 弄",
          zip: 200333,
        },
        {
          date: "2021-08-03",
          name: "吴浩",
          province: "上海",
          city: "长宁区",
          address: "上海市长宁区临新路 256 弄",
          zip: 200333,
        },
        {
          date: "2021-08-03",
          name: "汪锦",
          province: "上海",
          city: "长宁区",
          address: "上海市长宁区临新路 256 弄",
          zip: 200333,
        },
      ],
    };
  },
  methods: {
    open1() {
      this.$message.error({
        message: "无法连接服务器,提交失败!",
        center: true,
      });
    },
    handleClick(row) {
      console.log(row.row);
      this.dialog = true;
      this.name = row.row.name;
      this.date = row.row.date;
      this.address = row.row.address;
      this.zip = row.row.zip;
      this.fromTitle = row.row.name + "的信息";
    },
    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm("确定要提交表单吗？")
        .then((_) => {
          this.loading = true;
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
            }, 400);
            this.open1();
          }, 2000);
        })
        .catch((_) => {});
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },
  },
};
</script>
<style scoped>
#home section.el-drawer__body {
  width: 100%;
  min-width: none !important;
}
.demo-drawer__footer {
  position: absolute;
  bottom: 0.1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
}
.demo-drawer__footer button {
  width: 2rem;
}
.el-input {
  width: 95%;
}
</style>