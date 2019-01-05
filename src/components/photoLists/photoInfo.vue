<template>
    
    <div class='imgsInfo-container'>
        <!-- 标题区域 -->
        <h4>{{imgsInfo.title}}</h4>
        <p>
            <span>发表时间:{{imgsInfo.add_time | getTime}}</span>
            <span>点击:{{imgsInfo.click}}次</span>
        </p>
        <hr>
        <!-- 缩略图区域 -->
        
        <!-- 内容区域 -->
        <div v-html='imgsInfo.content'></div>

        <!-- 导入子评论组件 父组件自定义id属性向子组件传值 -->
        <comments :id='id'></comments>
    </div>
    
</template>
<script>
import comments from '../comments/comment.vue'
export default {
    data(){
        return {
            //先拿到地址栏自定义to属性拼接传过来的id
            id:this.$route.params.id,
            imgsInfo:{}
        }
    },
    created(){
        this.getimgInfo()
    },
    methods:{
        getimgInfo(){
            console.log(this.id)
            this.$http.get('api/getimageInfo/'+this.id).then(res=>{
                console.log(res.body.message)
                if(res.body.status==0){
                    this.imgsInfo = res.body.message[0]
                }
            })
        }
    },
    components:{
        comments
    }
}
</script>
<style lang='less'>

.imgsInfo-container{
        padding: 0 4px;
        
        h4{
            color:#26a2ff;
            text-align: center;
            font-size: 16px;
            margin: 20px 0
        }
        p{
            display: flex;
            justify-content: space-between;
            span{
                color: #8f8f94;
            }
        }
        
    }
</style>
