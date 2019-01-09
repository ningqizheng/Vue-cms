<template>
    <div class='goodDescription-container'>
        <h3>{{imageInfo.title}}</h3>
        <hr>
        <div v-html='imageInfo.content' class='content'></div>
    </div>
</template>
<script>


export default {
    data(){
        return {
            id:this.$route.params.id,
            imageInfo:{}
        }
    },
    created(){
        this.getdescription()
    },
    methods:{
        getdescription(){
            this.$http.get('api/goods/getdesc/'+this.id).then(res=>{
        if (res.body.status == 0) {
          console.log(res.body.message[0])
          this.imageInfo = res.body.message[0];
        }
      })
        }
    }

}
</script>
<style lang="less" scoped>
.goodDescription-container{
    h3{
        color:blue
    }
    .content{
        img{
            width: 100%;
        }
    }
}
</style>

