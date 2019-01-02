<template>
  <div>
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要评论的内容" maxlength="120"></textarea>
    <mt-button type="primary" size="large">发表评论</mt-button>
    <div>第1楼 用户:匿名用户 发表时间:</div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      pageindex: 1,
      comments: {}
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      console.log(this.id)
      this.$http.get('api/getcomments/:'+this.id+'?pageindex='+this.pageindex).then(res=>{
          if(res.body.status==0){
              console.log(res.body.message)
              this.comments = res.body.message
          }else{
              Toast('获取评论列表失败')
          }
      })
    }
  },
  props: ["id"]
};
</script>
