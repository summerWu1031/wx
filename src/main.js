import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import base from "@/util/base";
import Nav from '@/components/Nav.vue';
import Nav2 from '@/components/Nav2.vue';
import Footer from '@/components/Footer.vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import '@/assets/base.scss'
// 检测用户操作时间长久
import Automatic from '@/util/automatic'
import {message} from "ant-design-vue";
Vue.use(Automatic)

Vue.use(base);
Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.use(iView)
Vue.use(VueAxios,axios)
Vue.component('Nav',Nav)
Vue.component('Nav2',Nav2)
Vue.component('Footer',Footer)

//判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
    //  window.sessionStorage.setItem("token", res.token);
    // localStorage.getItem('token')
    // window.localStorage.getItem('token')
    if (window.sessionStorage.getItem('token')) {// 判断是否登录
      next()
    } else {// 没登录则跳转到登录界面
      ElementUI.Message('请先登录')
      setTimeout(()=>{
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        },2000)
      })

    }
  } else {
    if (to.matched.length === 0) {
      next('/empty-pages') // 判断此跳转路由的来源路由是否存在，存在的情况跳转到来源路由，否则跳转到404页面
    }
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

