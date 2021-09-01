import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    current: ['首页'],
    title: [
      {name: '首页', link: '/'},
      {name: '机构设置', link: '/introduce'},
      {name: '通知公告', link: '/notice'},
      {name: '政策法规', link: '/policy'},
      {name: '新闻动态', link: '/news'},
      {name: '惠民服务', link: 'http://admin.sportsit.cn',a:true},
      {name: '会员风采', link: '/member'},
      {name: '关于我们', link: '/about'},
      {name: '资料下载', link: '/download'},
    ]
  },
  mutations: {
    updateSelected(state,t){
      state.current.splice(0,1,t.name)
    }
  },
  actions: {
  },
  modules: {
  }
})

