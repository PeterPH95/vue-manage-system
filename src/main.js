import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from "./store";
import './api/mock';
import Cookie from "js-cookie";
import i18n from './i18n'


Vue.config.productionTip = false

Vue.use(ElementUI)

// 设置全局路由守卫
router.beforeEach((to ,from, next) => {
  // 判断token是否存在
  const token = Cookie.get('token')
  // 不存在，且要进入的页面不是登录页
  if (!token && to.name !== 'login') {
    next( { name: 'login' } )
  }else if( token && to.name === 'login'){// token存在，且去登录页
    next( { name: 'home' } )
  }else {// 其他放行
    next()
  }
})


new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  // 防止登陆后页面刷新白屏的问题
  created(){
    store.commit('addMenu', router)
  }
}).$mount('#app')
