<template>
    <div>
        <comment :id='id'></comment>
    </div>
</template>
<script>
import comment from '../comments/comment.vue'

export default {
    data(){
        return {
            id:this.$route.params.id,
        }
    },
    components:{
        comment
    }
}
</script>
