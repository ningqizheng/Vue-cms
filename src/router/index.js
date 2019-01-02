import Vue from 'vue'
// VueRouter基于Vue
import  VueRouter from 'vue-router'
//引入vue-router后应用组件
Vue.use(VueRouter)
import HomeContainer from '../components/tabbar/HomeContainer.vue'
import MemberContainer from '../components/tabbar/MemberContainer.vue'
import ShopcarContainer from '../components/tabbar/ShopcarContainer.vue'
import SearchContainer from '../components/tabbar/SearchContainer.vue'
import newsLists from '../components/news/newsLists.vue'
import newsInfo from '../components/news/newsInfo.vue'



var router = new VueRouter({
    routes: [ // 配置路由规则
      { path: '/', redirect: '/home' },
      { path: '/home', component: HomeContainer },
      { path: '/member', component: MemberContainer },
      { path: '/shopcar', component: ShopcarContainer },
      { path: '/search', component: SearchContainer },
      {path:'/home/newsLists',component:newsLists},
      //配置获取图文资讯详情的时候要传参:id
      {path:'/home/newsInfo/:id',component:newsInfo}
      
    ],
    linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
  })
  
  // 把路由对象暴露出去
  export default router



