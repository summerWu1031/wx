import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    current: ['首页'],
    title: [
      {name: '首页', link: '/'},
      {name: '机构设置', link: 'introduce'},
      {name: '通知公告', link: 'notice'},
      {name: '政策法规', link: 'policy'},
      {name: '新闻动态', link: 'news'},
      {name: '惠民服务', link: 'http://admin.sportsit.cn',a:true},
      {name: '裁判教练', link: '',pop:true},
      {name: '会员风采', link: 'member'},
      {name: '联系我们', link: 'about'},
      {name: '资料下载', link: 'download'},
    ],
    userinfo:{},
    cartcount: 0,
    headtitle:"",
    footactive:"",
    footclass:"",
    LOADING: false
  },
  mutations: {
    updateSelected(state,item){
      state.current.splice(0,1,item.name)
    },
    setSaveUserInfo(state, userinfo) {
      state.userinfo = userinfo
    },
    setSaveCartCount(state, count) {
      state.count = count
    },
    setSaveHeadTitle(state, headtitle) {
      state.headtitle = headtitle
    },
    setSaveFootActive(state, footactive) {
      state.footactive = footactive
    },
    setSaveLoading(state, LOADING) {
      state.LOADING = LOADING
    },
    showLoading(state) {
      state.LOADING = true
    },
    hideLoading(state) {
      state.LOADING = false
    }
  },
  actions: {
    saveUserInfo(context, userinfo){
      context.commit('setSaveUserInfo', userinfo)
    },
    saveCartCount(context, count){
      context.commit('setSaveCartCount', count)
    },
    saveHeadTitle(context, headtitle){
      context.commit('setSaveHeadTitle', headtitle)
    },
    saveFootActive(context, footactive){
      context.commit('setSaveFootActive', footactive)
    },
    saveLoading(context, LOADING){
      context.commit('setSaveLoading', LOADING)
    }
  },
  modules: {
  }
})

