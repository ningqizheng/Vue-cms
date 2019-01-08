<template>
  <div class="goodLists-container">
    <div class="goods-item" v-for='item in goodLists' :key='item.id' @click='goodInfo(item.id)'>
      <img :src="item.img_url" alt>
      <p>{{item.title}}</p>
      <div>
        <p>{{item.sell_price}}
          <span>{{item.market_price}}</span>
        </p>
        <p>
          <span >热卖中</span>
          <span >剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return {
            number:1,
            goodLists:[]
        }
    },
    created(){
        this.getGoodLists()
    },
    methods:{
        getGoodLists(){
            this.$http.get('api/getgoods?pageindex='+this.number).then(res=>{
                console.log(res)
                if(res.body.status==0){
                    this.goodLists = res.body.message
                }else{
                    Toast('获取商品列表失败')
                }
            })
        },
        goodInfo(id){
            // 通过路由导航进行跳转
            this.$router.push('/home/goodInfo'+id)
        }
    }
};
</script>
<style lang="less" scoped>
.goodLists-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 8px;
  .goods-item {
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    padding: 2px;
    width: 49%;
    min-height: 293px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    margin-bottom: 8px;
    img {
      width: 100%;
      vertical-align: middle;
    }
    > p {
      font-size: 14px;
      font-weight: bold;
      color: black;
      margin: 0;
      background-color: white;
    }
    div {
      background-color: #eee;
      padding: 3px;
      p{
          margin: 0;
      }
      p:first-child{
        color: red;
        font-size: 15px;
        font-weight: bold;
        padding: 5px;
        span {
          font-size: 12px;
          text-decoration: line-through;
          color: #8f8f94;
          margin-left: 20px;
        }
      }
      p:last-child{
          display: flex;
          justify-content: space-between
      }
    }
  }
}
</style>

