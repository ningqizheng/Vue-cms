<template>
    <div class='newsInfo-container'>
        <h4>{{newsInfo.title}}</h4>
        <p>
            <span>发表时间:{{newsInfo.add_time | getTime}}</span>
            <span>点击:{{newsInfo.click}}次</span>
        </p>
        <hr>
        <div v-html='newsInfo.content'></div>
        <!-- 导入子评论组件 -->
        <comments :id='this.id'></comments>
    </div>
</template>
<script>
import comments from '../comments/comment.vue'

export default {
    data(){
        return {
            id:this.$route.params.id,
            newsInfo:{}
        }
    },
    created(){
        this.getnewsInfo()
    },
    methods:{
        getnewsInfo(){
            // console.log(this.id)
            this.$http.get('api/getnew/'+this.id).then(res=>{
                console.log(res.body)
                if(res.body.status==0){
                    //message[0]就是当前资讯详情,是一个对象
                    this.newsInfo=res.body.message[0]
                }else{
                    Toast('图文资讯加载失败')
                }
                
            })
        }
    },
    components:{
        comments
    }
}
</script>
<style lang='less' >
    .newsInfo-container{
        padding: 0 4px;
        
        h4{
            color:red;
            text-align: center;
            font-size: 16px;
            margin: 20px 0
        }
        p{
            display: flex;
            justify-content: space-between;
            span{
                color: #226aff;
            }
        }
        div{
            img{
                width: 100%;
            }
        }
    }
</style>

