<template>
  <div class='comment-container'>
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要评论的内容" maxlength="120" v-model='msg'></textarea>
    <mt-button type="primary" size="large" class='btn' @click='addcomment'>发表评论</mt-button>
    <div v-for="(item , i) in comments" :key="i">
      <p>第{{1+i}}楼&nbsp;&nbsp;用户:{{item.user_name}} &nbsp;&nbsp;&nbsp;&nbsp;发表时间:{{item.add_time | getTime}}</p>
      <p>{{item.content=='undefined'?'此用户很懒,啥也没说':item.content}}</p>
    </div>
    <mt-button type="danger" size="normal" class='getmore' @click='getmore'>加载更多</mt-button>
  </div>
</template>
<script>
import {Toast} from "mint-ui";

export default {
  data() {
    return {
      pageindex: 1,
      comments: [],
      msg:null,
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      // console.log(this.id)
      this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageindex).then(res=>{
          // console.log(res)
          if(res.body.status==0){
              this.comments = this.comments.concat(res.body.message)  
          }else{
              Toast('获取评论列表失败')
          }
      })
    },
    addcomment(){
      // 在提交评论之前先判断,如果评论内容为空,就不让它执行下面的代码,不发联网请求
      if(this.msg.length === 0 ){
        Toast('没写你也想提交,四不四傻?')
        return
      }
      this.$http.post('api/postcomment/'+this.id,{content:this.msg.trim()}).then(res=>{
        // console.log(res)
        if(res.body.status==0){

          //第一种思路:自定义一个评论对象插入到comments数组里面

          // let mycomment = {
          //   'add_time' : new Date(),
          //   'content':this.msg,
          //   'user_name':'匿名用户'

          // }
          // this.comments.unshift(mycomment)


          //第二种思路,先将页面加载出来调用getComments()已有数据清空,再强行将页码改为1,
          //此时后台数据已经添加完成,再调用getComments()方法渲染出来的的就是第一页的最新的数据了
          this.comments = []
          this.pageindex = 1
          this.getComments()
          this.msg=''
        }
      })
    },
    getmore(){
      // console.log(111)
      this.pageindex++
      this.getComments()

    }

  },
  // 子组件必须有props属性,是一个数组,才能调用
  props: ["id"]
};
</script>
<style lang='less' scoped>
.comment-container{
    textarea{
      margin-bottom: 0
    }
    .btn{
      margin: 8px 0
    }
    .getmore{
      display: block;
      margin: 0 auto
    }
    p:first-child{
      height: 30px;
      line-height: 30px;
      background-color: rgb(226, 223, 223);
      color: black
    }
    p:last-child{
      padding-left: 20px;
      color: black

    }
} 
</style>

