<template>
  <div>
    <List v-for="(item, index) in userList" :key="index" :userData="item" />
  </div>
</template>
<script>
import List from "../../list/List";
export default {
  name: "UserList",
  components: { List },
  data() {
    return { userList: "" };
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      this.$http({
        method: "get",
        url: "/api/userList",
      }).then((res) => {
        this.userList = res.data.data;
        // this.pageLength = Math.floor(this.userList.length / 4);

        //   console.log(this.userList);
      });
    }
  },
};
</script>