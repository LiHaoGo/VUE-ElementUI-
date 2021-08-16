<template>
  <el-card
    :title="title"
    :visible.sync="visible"
    :before-close="handleClose"
    width="600px"
    append-to-body
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="form-info">
      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        size="small"
        label-width="110px"
       
      >
        <el-form-item  label="选择地址" prop="address">
          <VueMap
            ref="mapSearch"
            :city="form.city"
            :value="form.address"
            :longitude="form.addLon"
            :latitude="form.addLat"
            :isEdit="isEdit"
            @updateLocation="updateLocation"

          /> 
          
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="addLon" label="经度">
              <el-input
                v-model.number="form.addLon"
                :maxlength="15"
                placeholder="请输入经度"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="right-label-form-item">
            <el-form-item prop="addLat" label="纬度">
              <el-input
                v-model.number="form.addLat"
                :maxlength="15"
                placeholder="请输入纬度"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </el-card>
</template>
<script>
import VueMap from "../../../components/VueMap";
export default {
    props: ["visible", "isEdit", "detail"],
    components: {
      VueMap
    },
    data() {
        return {
            title: "添加地址",
            form: {
                address: "",
                addLon: "",
                addLat: ""
            },
            rules: {
                address: [
                  {
                    required: true,
                    message: "请输入地址",
                    trigger: ["blur", "change"]
                  }
                ],
                addLat: [
                  {
                    required: true,
                    message: "请输入纬度",
                    trigger: ["blur", "change"]
                  }
                ],
                addLon: [
                  {
                    required: true,
                    message: "请输入经度",
                    trigger: ["blur", "change"]
                  }
                ],
            }
        };
    },
    created() {
      if (this.isEdit) {
        this.initForm();
      }
    },
    methods: {
        // 初始化表单
        initForm() {
          this.title = "修改地址";
          if (this.detail) {
            this.form = { ...this.detail };
          }
        },
        // 地图搜索选址
        updateLocation(lng, lat, address) {
          this.form.addLon = lng;
          this.form.addLat = lat;
          this.form.address = address;
        },
        handleClose() {
          this.$emit("update:visible", false);
        }
    }
};
</script>