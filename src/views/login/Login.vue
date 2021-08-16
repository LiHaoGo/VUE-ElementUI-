<template>
  <div class="login">
    <ul class="bg-bubbles">
      <li v-for="i in 10" :key="i"></li>
    </ul>
    <div class="login__left">
      <h1 class="welcome">欢迎登录后台管理平台</h1>
      <h1 class="welcome-en">Welcome to the background management platform</h1>
    </div>
    <div
      class="lgoin__right"
      v-loading="loading"
      element-loading-text="登录中……"
    >
      <span class="login__title">Vue + Element 管理系统——Login</span>
      <el-divider><i class="el-icon-user-solid"></i></el-divider>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :label-position="labelPosition"
      >
        <el-form-item label="用户名" prop="_name">
          <el-input v-model="ruleForm._name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="_password">
          <el-input type="password" v-model="ruleForm._password"></el-input>
        </el-form-item>
        <!-- <el-form-item> -->
        <el-checkbox  @change="handleCheckedChange" style="margin-bottom: 0.2rem" v-model="checked"
          >记住我</el-checkbox
        >
        <!-- </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="login('ruleForm')">登录</el-button>
          <el-tooltip
            class="item"
            effect="light"
            content="清除登录状态等信息"
            placement="top"
          >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-tooltip>
        </el-form-item>

        <el-link class="register__link" @click="handleClick" type="primary"
          >没有账号?去注册</el-link
        >
      </el-form>
    </div>
  </div>
</template>
<script>
import Secret from "../../utils/secret.js";
export default {
  name: "Login",
  created() {
    // crypto-js aes 解密 得到保存到sessionStorage中的username
    if (localStorage.getItem("username")) {
      let username = Secret.Decrypt(localStorage.getItem("username"));
      let password = Secret.Decrypt(localStorage.getItem("password"));
      let checked = localStorage.getItem("checked");
      this.ruleForm._name = username;
      this.ruleForm._password = password;
      // 因为存到localStorage是字符串 所以读取也是字符串，需要转换
      this.checked = Boolean(checked);
      console.log(Boolean(checked));
    }
  },
  props: ["showLoginOrRegister"],
  data() {
    return {
      driver: null,
      checked: false,
      labelPosition: "top",
      ruleForm: {
        _name: "",
        _password: "",
      },
      loading: false,
      rules: {
        _name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 2,
            max: 16,
            message: "长度在  到 16 个字符",
            trigger: "blur",
          },
        ],
        _password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleCheckedChange(){
      console.log(this.checked);
      
    },
    login(formName) {
      let { _name, _password } = this.ruleForm;
      // 校验输入是否合法
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            method: "post",
            url: "/api/user/login",
          }).then((res) => {
            this.loading = true;
            let timer = setInterval(() => {
              this.loading = false;
              clearInterval(timer);
              let { username, password } = res.data.data;
              //  采用crypto-js aes 加解密
              //  console.log(Secret.Encrypt('admin'),Secret.Decrypt(username));
              if (
                Secret.Decrypt(username) === _name &&
                Secret.Decrypt(password) == _password
              ) {
                this.successMessage(_name);
                // 保存用户名到sessionStorage
                // sessionStorage.setItem("username",username)
                localStorage.setItem("isLogin", true);
                if (this.checked) {
                  if (!localStorage.getItem("checked")) {
                    console.log('checked is  false');
                    localStorage.setItem("username", username);
                    localStorage.setItem("password", password);
                    localStorage.setItem("checked", this.checked);
          
                  }
                }else{
                     console.log('checked is  true');
                     localStorage.removeItem("username");
                    localStorage.removeItem("password");
                    localStorage.removeItem("checked");
                  }
                this.$router.push("./home");
              } else {
                this.errorMessage();
              }
            }, 1000);
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm._name = "";
      this.ruleForm._password = "";
      this.checked = false;
      localStorage.removeItem("username");
      localStorage.removeItem("password");
      localStorage.removeItem("checked");
    },
    errorMessage() {
      this.$message.error("您输入的用户或密码不正确!");
    },
    successMessage(username) {
      this.$message.success("欢迎您" + username);
    },
    handleClick() {
      console.log(this.showLoginOrRegister);
      //  通过$emit 让子组件给父组件传值
      this.$emit("changeShowLoginOrRegister", !this.showLoginOrRegister);
    },
  },
};
</script>
<style scoped>
@import "../../style/base.css";
@import "../../style/moveList.css";

.login {
  width: 80%;
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.2rem;
  box-sizing: border-box;
  display: flex;
}
.login .lgoin__right,
.login .login__left {
  flex: 1;
  padding: 0.8rem 0.5rem;
  background: #409eff;
  box-sizing: border-box;
}

.login .lgoin__right {
  background: #fff;
  border-top-right-radius: 0.15rem;
  border-bottom-right-radius: 0.15rem;
}
.login .login__left {
  border-top-left-radius: 0.15rem;
  border-bottom-left-radius: 0.15rem;
}
.login .login__left .welcome {
  color: #fff;
  text-align: center;
}
.login .login__left .welcome-en {
  color: #fff;
  text-align: center;
  margin-top: 1rem;
}
.login .lgoin__right .login__title {
  font-size: 0.25rem;
  color: #409eff;
}
.register__link {
  position: absolute;
  bottom: 0.2rem;
  right: 0.2rem;
}

@media screen and (max-width: 768px) {
  .login {
    width: 100%;
  }
  .login .login__left {
    display: none;
  }
  .login .lgoin__right {
    border-top-left-radius: 0.15rem;
    border-bottom-left-radius: 0.15rem;
  }
}
</style>