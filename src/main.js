//第一步引入Vue
import Vue from 'vue'
//第二步引入根组件
import App from './App'
//第三步引入路由规则js
import router from './router'
//--------------------------------------------引入resource,preview,MintUI中间件-----------------
// 2.1 导入 vue-resource 中间件
import VueResource from 'vue-resource'
// 2.2 安装 vue-resource
Vue.use(VueResource)


//引入缩略图的中间件
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)

// 引入MintUI的中间件
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
// ----------------------------------------引入MUI样式(在本地文件夹中)--------------------------
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
// Vue.config.productionTip = false


//------------------------------------------定义处理时间的过滤器--------------------------------
import moment from 'moment'
  Vue.filter('getTime',function(datastr,pattern='YYYY-MM-DD HH:mm:ss'){
    return moment(datastr).format(pattern)
  })
//------------------------------------------自定义请求根路径----------------------
Vue.http.options.root = 'http://www.lovegf.cn:8899/';
new Vue({
  el: '#app',
  //将路由挂载到Vue实例上,通过router-link和router-view展示不同的组件
  router,
  //代替#app渲染页面
  render: h => h(App)
})
