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
Vue.use(base);
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueAxios,axios)
Vue.component('Nav',Nav)
Vue.component('Nav2',Nav2)
Vue.component('Footer',Footer)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

