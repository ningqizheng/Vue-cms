<template>
  <div>
    <p>{{$store.state.name}}</p>
      <!-- 轮播图区域 -->
    <mt-swipe :auto="4000">
      <!-- 在组件中，使用v-for循环的话，一定要使用 key -->
      <mt-swipe-item v-for="(item,index) in lunbotuList" :key="index">
        <img :src="item.img" alt="">
      </mt-swipe-item>
    </mt-swipe>


    <!-- 六宫格区域 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
							<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
								<router-link to="/home/newsLists">
									<img src="../../images/menu1.png" alt="">
									<div class="mui-media-body">新闻资讯</div>
								</router-link>
							</li>
							<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
								<router-link to='/home/photoList'>
									<img src="../../images/menu2.png" alt="">
									<div class="mui-media-body">图片分享</div>
								</router-link>
							</li>
							<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
								<router-link to='/home/goodLists'>
									<img src="../../images/menu3.png" alt="">
									<div class="mui-media-body">商品购买</div>
								</router-link>
							</li>
							<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
								<a href="#">
									<img src="../../images/menu4.png" alt="">
									<div class="mui-media-body">留言反馈</div>
								</a>
							</li>
							<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
								<a href="#">
									<img src="../../images/menu5.png" alt="">
									<div class="mui-media-body">视频专区</div>
								</a>
							</li>
							<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
								<a href="#">
									<img src="../../images/menu6.png" alt="" @click='changeName'>
									<div class="mui-media-body">联系我们</div>
								</a>
							</li>
						</ul>
  </div>
</template>
<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
        lunbotuList: [] ,// 保存轮播图的数组
        index:null
    };
  },
  created(){
      this.getLunBoTu()
  },
  methods: {
    getLunBoTu() {
      this.$http.get("api/getlunbo").then(result => {
        // console.log(result.body);
        if (result.body.status === 0) {
          // 成功了
          this.lunbotuList = result.body.message;
        } else {
          // 失败的
          Toast("加载轮播图失败。。。");
        }
      });
    },
    changeName(){
      this.$store.commit('changName')
    }
  }
};
</script>
<style lang='less' scoped>
//轮播图的样式
  .mint-swipe{
    height: 200px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  // 六宫格的样式
  .mui-table-view{
    img{
      width: 60px;
      height: 60px;
    }
  }
</style>
