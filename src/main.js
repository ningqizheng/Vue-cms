import Vue from 'vue'
import App from './App'
// import Router from 'vue-router'
// Vue.use(Router)
import router from './router'

// 2.1 导入 vue-resource
import VueResource from 'vue-resource'
// 2.2 安装 vue-resource
Vue.use(VueResource)

// 引入MintUI的样式
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
// 引入MUI样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
// Vue.config.productionTip = false


//定义处理时间的过滤器
import moment from 'moment'
  Vue.filter('getTime',function(datastr,pattern='YYYY-MM-DD HH:mm:ss'){
    return moment(datastr).format(pattern)
  })
//自定义请求根路径
Vue.http.options.root = 'http://www.lovegf.cn:8899/';
new Vue({
  el: '#app',
  //将路由挂载到Vue实例上,通过router-link和router-view展示不同的组件
  router,
  //代替#app渲染页面
  render: h => h(App)
})
