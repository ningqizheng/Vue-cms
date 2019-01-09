<template>
  <div class="goodInfo-container">
     <transition @before-enter='beforeEnter' @enter='enter' @after-enter='afterEnter'>
       <div class="ball" v-show='ballFlag' ref='ball'></div>
       </transition>

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <mt-swipe :auto="4000">
            <!-- 在组件中，使用v-for循环的话，一定要使用 key -->
            <mt-swipe-item v-for="(item,index) in lunbotuList" :key="index">
              <img :src="item.src" alt>
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">商品名称: {{imageInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div>
            <span>市场价:{{imageInfo.market_price}}</span>
            <span>销售价:{{imageInfo.sell_price}}</span>
          </div>
          <div>
            <span>购买数量</span>
            <input type="button" value="-" @click='buyCount > 1 && buyCount--'>
            <input type="button" v-model="buyCount">
            <input type="button" value="+" @click="buyCount++" >
          </div>
          <div>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click='addShopCar'>加入购物车</mt-button>
          </div>
        </div>
       
      </div>
      
    </div>
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号:{{imageInfo.goods_no}}</p>
          <p>库存情况:{{imageInfo.stock_quantity}}</p>
          <p>上架时间:{{imageInfo.add_time}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" @click="goodsDescriptions(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" @click="goodComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotuList: [],
      imageInfo: {},
      buyCount:1,
      ballFlag:false,
    };
  },
  created() {
    this.getLunBo();
    this.getgoodsInfo();
  },
  methods: {
    getLunBo() {
      this.$http.get("api/getthumimages/" + this.id).then(res => {
        if (res.body.status == 0) {
          this.lunbotuList = res.body.message;
        }
      });
    },
    getgoodsInfo() {
      // console.log(1)
      this.$http.get("api/goods/getinfo/" + this.id).then(res => {
        if (res.body.status == 0) {
          // console.log(res.body.message[0]);
          this.imageInfo = res.body.message[0];
        }
      });
    },
    goodsDescriptions(id) {
      this.$router.push("/home/goodDescription" + id);
    },
    goodComment(id) {
      this.$router.push("/home/goodComment" + id);
    },
    addShopCar(){
      this.ballFlag = !this.ballFlag
    },
    beforeEnter(el){
      el.style.transform = 'translate(0,0)';
    },
    enter(el,done){
      el.offsetWidth;
      //获取小球在页面中的位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      //获取徽标在页面中的位置
      const badgePosition = document.getElementById('badge').getBoundingClientRect();
      //获取小球需要移动的距离
      const x =  badgePosition.left - ballPosition.left;
      const y =  badgePosition.top - ballPosition.top;
      el.style.transform = `translate(${x}px,${y}px)`;
      el.style.transition = 'all .5s cubic-bezier(.4,-0.3,1,.68)'
      done();


    },
    afterEnter(){
        this.ballFlag = !this.ballFlag
    }

  }
};
</script>
<style lang='less' scoped>
.goodInfo-container {
  position: relative;
  //轮播图的样式
  .mint-swipe {
    height: 200px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .ball {
    position: absolute;
    left: 130px;
    top:342px;
    width: 13px;
    height: 13px;
    background-color: red;
    border-radius: 50%;
    z-index: 999
  }
}
</style>
