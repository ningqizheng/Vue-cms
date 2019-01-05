<template>
  <div>
    <!-- 头部导航区域 -->
    <div
      class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
    >
      <div class="mui-scroll">
        <!-- <a class="mui-control-item mui-active" v-for='(item ,index) in categorys' :key='index'>{{item.title}}</a> -->
        <a
          :class="{'mui-control-item':true,'mui-active':index==0}"
          v-for="(item ,index) in categorys"
          :key="index"
          @click="getimglists(item.id)"
        >{{item.title}}</a>
      </div>
    </div>
    <!-- 图片展示区域 -->
    <ul>
      <router-link v-for="(item) in imglists" :key="item.id" :to="'/home/photoInfo'+item.id" tag="li">
        <img :src="item.img_url">
        <div>
          <h3>{{item.title}}</h3>
          <p>{{item.zhaiyao}}</p>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
import mui from "../../lib/mui/js/mui.js";
export default {
  data() {
    return {
      categorys: [],
      imglists: []
    };
  },
  created() {
    this.getCategory();
  },
  mounted() {
    //dom操作一般放在mounted生命周期函数里面,此时dom元素被挂载到dom树上
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getCategory() {
      this.$http.get("api/getimgcategory").then(res => {
        // console.log(res)
        if (res.body.status == 0) {
          this.categorys = res.body.message;
        }
      });
    },
    getimglists(id) {
      this.$http.get("api/getimages/" + id).then(res => {
        // console.log(res);
        if (res.body.status == 0) {
          this.imglists = res.body.message;
        }
      });
    }
  }
};
</script>
<style lang='less'>
ul {
  padding: 0 10px;
  list-style: none;
  li {
      position: relative;
      margin-bottom: 10px;
    img {
      width: 100%;
      vertical-align: middle
    }
    div{
      position: absolute;
      bottom: 0;
      max-height: 85px;
      overflow: hidden;
      background-color: rgba(0,0,0,.4);
      h3{
          color: white;
          font-size: 15px;
      }
      p{
          color: orange;
          font-size: 12px
      }
    }
  }
}
</style>

