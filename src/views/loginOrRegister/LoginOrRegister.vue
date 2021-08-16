<template>

<div >
  <!-- 通过添加transition 来实现过渡动画 -->
  <transition name="plus-icon"  >
  <Login v-if="ruleForm.showLoginOrRegister" :showLoginOrRegister ="ruleForm.showLoginOrRegister"  @changeShowLoginOrRegister="changeShowLoginOrRegister"  />
  
  <Register v-else :showLoginOrRegister ="ruleForm.showLoginOrRegister"  @changeShowLoginOrRegister="changeShowLoginOrRegister" />
  </transition>
</div>
</template>
<script>
import Register from '../register/Register'
import Login from '../login/Login'
export default {
  name: "LoginOrRegister",
  components: { Register, Login },
  created(){
  //  let username = localStorage.getItem("username");
  //  console.log(username);
   
  //   if(username){
  //     this.ruleForm._name = username;
  //   }
  },
  data() {
    return {
      labelPosition: 'top',
      ruleForm: {
        _name: "",
        _password: "",
        showLoginOrRegister: true
      },
      loading: true,
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
    changeShowLoginOrRegister(params){
      this.ruleForm.showLoginOrRegister  = params;
      console.log(this.ruleForm.showLoginOrRegister);
      
    }
  },
};
</script>
<style scoped>
@import '../../style/base.css';
.login{
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
.login .lgoin__right ,
.login .login__left
{
  flex: 1;
    padding: .8rem .5rem;
  background: #409EFF;
    box-sizing: border-box;
}
.plus-icon-enter-active{
    transition: opacity .5s;
  }
  .plus-icon-enter{
     opacity: 0;
  }
  .plus-icon-leave-active{
    transition: opacity .5s;
  }
  .plus-icon-leave-to{
    opacity: 0;
  }

.login .lgoin__right {
  background: #fff;
  border-top-right-radius: .15rem;
  border-bottom-right-radius: .15rem;
}
.login .login__left{
   border-top-left-radius: .15rem;
  border-bottom-left-radius: .15rem;
}
.login .login__left .welcome{
  color: #fff;
  text-align: center;
}
.login .login__left .welcome-en{
  color: #fff;
  text-align: center;
   margin-top: 1rem;
}
.login .lgoin__right .login__title{
  font-size: .25rem ;
  color: #409EFF;
}
.register__link{
  position: absolute;
  bottom: .2rem;
  right: .2rem;
}
@media screen and (max-width: 768px) {
    .login {
        width: 100%;
    }
    .login .login__left{
      display: none;
    }
}
</style>