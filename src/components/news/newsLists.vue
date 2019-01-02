<template>
  <div class='newsList-container'>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for='item in newsLists' :key='item.id'>
        <router-link :to='"/home/newsInfo/"+item.id'>
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
              <h4>{{item.title}}</h4>
            <p class="mui-ellipsis">
                <span>发表时间:{{item.add_time | getTime}}</span>
                <span>点击:{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
     
    </ul>
  </div>
</template>
<script>

import {Toast} from "mint-ui";
export default {
    data(){
        return {
            newsLists:[]
        }
    },
    created(){
         this.getnewslist()
    },
    methods:{
        getnewslist(){
            this.$http.get('api/getnewslist').then(res=>{
                // console.log(res.body)
                if(res.body.status==0){
                    this.newsLists=res.body.message
                }else{
                    Toast('图文资讯加载失败')
                }
            })
        }
    }
};
</script>
<style lang='less' scoped>
    .newsList-container{
        .mui-ellipsis{
            display: flex;
            justify-content: space-between
        }
    }
</style>

