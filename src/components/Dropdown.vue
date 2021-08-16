<template>
        <div class="user">
            <el-dropdown @command="handleCommand" placement="bottom">
              <span class="el-dropdown-link">
                <!-- {{$data._username}} -->
                <img class="user__img" src="../assets/user.jpg" alt="" />
              </span>
               <el-dropdown-menu slot="dropdown">
                <el-dropdown-item  v-for="(item,index) in listItem" :key="item" :command = "index">{{item}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
</template>
<script>
export default {
    name:'Dropdown',
    props:['goBack'],
    data(){
        return{
               listItem:['个人中心','我的设置','退出登录']
        }
    },
    methods: {
      handleCommand(command) {
        if(command === 2){
          this.goBack();
        }
        // this.$message('click on item ' + command);
      }
    }
}
</script>
<style scoped>
#home .user {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  line-height: 0.1rem;
  cursor: pointer;
}
.user .user__img {
  width: 0.4rem;
  border-radius: 50%;
}
#home .user .el-dropdown {
  padding: 0 0.1rem;
}
</style>