<template>
  <div class="register" >
    <ul class="bg-bubbles">
    <li v-for="i in 10" :key="i"></li>
</ul>
    <div class="lgoin__right">
     
      <span class="register__title">Vue + Element 管理系统——register</span>
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
      <el-form-item>
        <el-button type="primary"  @click="register('ruleForm')"
          >注册</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
         <el-link class="register__link" @click="handleClick" type="primary">已有账号?去登录</el-link>
    </el-form></div>
     <div class="register__left">
      <h1 class="welcome">欢迎注册后台管理平台</h1>
      <h1 class="welcome-en">
Welcome to the background management platform

</h1>
    </div>
    <el-dialog
  title="这是个非常重要的信息"
  :modal=" false "
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <p >虽然您已经注册了但然并卵</p>
  <p>还是需要使用我提供的账号登录</p>
  <p>账号:admin  密码:123456</p>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>
<script >
export default {
  name: "register",
  created(){
  },
  props:['showLoginOrRegister'],

  data() {
    return {
      labelPosition: 'top',
      ruleForm: {
        _name: "",
        _password: "",
      },
          dialogVisible: false,
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
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    register(formName) {
      let { _name, _password } = this.ruleForm;
      // 校验输入是否合法
      this.$refs[formName].validate((valid) => {
        if (valid) {
           this.dialogVisible = true;
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm._name = ''
    },
    errorMessage() {
      this.$message.error("您输入的密码不正确!");
    },
    successMessage(username) {
      this.$message.success("欢迎您" + username);
    },
    handleClick(){
      //  通过$emit 让子组件给父组件传值
      this.$emit('changeShowLoginOrRegister',!this.showLoginOrRegister)
    }
  },
};
</script>
<style scoped >
@import '../../style/base.css';
@import '../../style/moveList.css';
.register{
  width:80%;
  background: #fff;
   position: absolute;
   left: 50%;
   top: 50%;
   transform: translate(-50%,-50%);
   box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
   border-radius: .2rem;
   box-sizing: border-box;
   display: flex;
}
.el-dialog__body p{
 padding: 0 .5rem;
}
.register .lgoin__right ,
.register .register__left
{
  flex: 1;
    padding: .8rem .5rem;
  background: #409EFF;
    box-sizing: border-box;
}

.register .lgoin__right {
  background: #fff;
  border-top-left-radius: .15rem;
  border-bottom-left-radius: .15rem;
  position: relative;

}
.register .register__left{
    border-top-right-radius: .15rem;
  border-bottom-right-radius: .15rem;
}
.register .register__left .welcome{
  color: #fff;
  text-align: center;
}
.register .register__left .welcome-en{
  color: #fff;
  text-align: center;
   margin-top: 1rem;
}
.register .lgoin__right .register__title{
  font-size: .25rem ;
  color: #409EFF;
}
.register__link{
  position: absolute;
  bottom: .2rem;
  right: .2rem;
}
@media screen and (max-width: 768px) {
    .register {
        width: 100%;
    }
    .register .register__left{
      display: none;
    }
}
</style>