<template>
  <div class="carousel">
    <el-carousel indicator-position="none" :interval="4000" type="card" height="320px">
      <el-carousel-item v-for="(img,index) in item" :key="index">
        <img :src="img" class="carousel__img"  alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  name: "Carousel",
  data(){
    return {
      item:[
        require('@/assets/1.jpg'),
        require('@/assets/2.jpg'),
        require('@/assets/3.jpg'),
        require('@/assets/4.jpg'),
        require('@/assets/5.jpg'),
      ]
    }
  }
};
</script>
<style scoped>
.carousel{
  width: 100%;
  margin-bottom: .2rem;
}
.carousel__img{
  width: 100%;
}
</style>