<template>
  <div>
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
      <div class="mui-card-header">商品名称</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
            <p><span>市场价:¥222</span><span>销售价:¥333</span></p>
            <div>
                <span>购买数量</span>
            </div>
            <mt-button type='primary' size='small'>立即购买</mt-button>
            <mt-button type='danger' size='small'>加入购物车</mt-button>

        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">页眉</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">包含页眉页脚的卡片，页眉常用来显示面板标题，页脚用来显示额外信息或支持的操作（比如点赞、评论等）</div>
      </div>
      <div class="mui-card-footer">页脚</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        id:this.$route.params.id,
        lunbotuList:[]
    };
  },
  created(){
      this.getLunBo()
  },
  methods: {
    getLunBo() {
        this.$http.get('api/getthumimages/'+this.id).then(res=>{
            if(res.body.status==0){
                
                this.lunbotuList = res.body.message
            }
        })
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
  
</style>
