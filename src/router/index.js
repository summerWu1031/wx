import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Introduce from '@/views/Introduce.vue';
import News from '@/views/News/News.vue';
import Notice from '@/views/News/Notice.vue';
import Policy from '@/views/News/Policy.vue';
import Download from '@/views/Download.vue';
import Detail from '@/views/News/Detail.vue';
import Member from '@/views/Member/Member.vue';
import MemberDetail from '@/views/Member/MemberDetail.vue';
import About from '@/views/About.vue';
import Dan from '@/views/Dan.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/introduce',
    component: Introduce
  },
  {
    path: '/news',
    component: News
  }, {
    path: '/detail/:id',
    props:true,
    component: Detail
  },
  {
    path: '/notice',
    component: Notice
  },
  {
    path: '/policy',
    component: Policy
  },
  {
    path: '/member',
    component: Member
  },
  {
    path: '/member-detail/:id',
    props:true,
    component: MemberDetail
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/download',
    component: Download
  },
  {
    path: '/dan',
    component: Dan
  }

]

const router = new VueRouter({
  routes
})

export default router
