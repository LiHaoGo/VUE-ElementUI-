<template>
  <div id="home">
    <el-container>
      <!-- 左侧导航栏 -->
      <Nav />
      <el-container>
        <!-- 头部 -->
        <el-header style="position: relative">
          <!-- 面包屑 -->
          <Breadcrumb class="rbl-tabs" />
           <Dropdown :goBack="goBack" />
          <el-button
            type="primary"
            class="button__back stt-tabs"
            @click="goBack"
            round
            icon="el-icon-switch-button"
            size="small"
            >退出</el-button
          >
        </el-header>
        <!-- 中间内容 -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Nav from "./Nav";
import Breadcrumb from "./Breadcrumb";
import Dropdown from "../../components/Dropdown";
import Secret from "../../utils/secret.js";
// 分布引导插件
import Driver from "driver.js"; // import driver.js
import "driver.js/dist/driver.min.css"; // import driver.js css
import steps from "../../utils/driver";
export default {
  components: {
    Nav,
    Breadcrumb,
    Dropdown,
  },
  data() {
    return {
       _username: "user",
        isNew: true
     
     };
  },
  created() {
    this.getUserName();
    let cookie_arr = document.cookie.indexOf("name" + "=");
    let obj = {};
    let string = this.getCookie("new");
    //  获取cookie中new   判断是否第一次登录
    if (string) {
      this.isNew = !this.isNew;
    }
  },
  methods: {
    // 获取cookie
    getCookie(c_name) {
      if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
          // 3
          c_start = c_start + c_name.length + 1;
          let c_end = document.cookie.indexOf(";", c_start);
          if (c_end == -1) c_end = document.cookie.length;
          return unescape(document.cookie.substring(c_start, c_end));
        }
      }
      return "";
    },
    guideSetup() {
      this.driver = new Driver({
        allowClose: false,
        doneBtnText: "完成",
        closeBtnText: "关闭",
        onReset: (Element) => {
          let steps = this.driver.getSteps();
          if (steps[steps.length - 1] == Element) {
            //  写入cookie 用来判断是否第一次登录
            if (this.isNew) {
              document.cookie =
                "new=true;expires=Fri, 17 Jul 2022 21:15:42 GMT";
            }
          }
        },
      });

      this.driver.defineSteps(steps);
      this.driver.start();
    },
    open1() {
      this.$message.success({
        message: "已退出!",
        center: true,
      });
    },
    goBack() {
      // 清除本地缓存内容
      localStorage.removeItem("isLogin");
      // 跳转()
      this.$router.push("/loginOrRegister");
      this.open1();
    },
    getUserName() {
      //  console.log(this._data._username);
      //  解密
      if (localStorage.getItem("username")) {
        this._data._username = Secret.Decrypt(localStorage.getItem("username"));
        console.log(localStorage.getItem("username"));
      }
    },
  },
  mounted() {
    if (this.isNew) {
      this.guideSetup();
    }
  },
};
</script>
<style scoped>
#home {
  height: 100%;
}
#home section {
  height: 100%;
  min-width: 12.7rem;
}
#home .breadcrumb {
  float: left;
  height: 0.6rem;
}

#home .breadcrumb .el-breadcrumb {
  line-height: 0.6rem;
}
.el-breadcrumb {
  line-height: 0.6rem;
}
.handImg {
  position: absolute;
  right: 1.2rem;
  top: 0.05rem;
  height: 0.5rem;
  width: 0.5rem;
  line-height: 0.5rem;
  cursor: pointer;
}
#home .button__back {
  float: right;
  margin-top: 0.15rem;
}
.el-header,
.el-footer {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-main {
  line-height: 0 !important;
}
.el-avatar {
  background: #f56c6c;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>