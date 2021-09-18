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
import SignUp from "@/views/User/SignUp";
import Login from "@/views/User/Login";
import Agreement from "@/components/Agreement";
import MyUser from "@/views/User/MyUser";
import ForgetPassword from "@/views/User/ForgetPassword";
import Coach from "@/views/User/Coach";
import Referee from "@/views/User/Referee";
import CoachList from "@/views/User/CoachList";

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '/',
    component: Home
  },
  {
    path: '/introduce',
    name: 'introduce',
    component: Introduce
  },
  {
    path: '/news',
    name: 'news',
    component: News
  }, {
    path: '/detail/:id',
    name:'detail',
    props:true,
    component: Detail
  },
  {
    path: '/notice',
    name: 'notice',
    component: Notice
  },
  {
    path: '/policy',
    name:'policy',
    component: Policy
  },
  {
    path: '/member',
    name: 'member',
    component: Member
  },
  {
    path: '/member-detail/:id',
    name:'member-datail',
    props:true,
    component: MemberDetail
  },
  {
    path: '/about',
    name:'about',
    component: About
  },
  {
    path: '/download',
    name:'download',
    component: Download
  },
  {
    path: '/dan',
    name: 'dan',
    component: Dan
  },
  {
    path: '/signup',
    name:'signup',
    component: SignUp
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/agreement',
    name: 'agreement',
    component: Agreement
  },
  {
    path: '/myuser',
    name: 'myuser',
    component: MyUser
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgetPassword
  }, {
    path: '/coach',
    name: 'coach',
    component: Coach
  },
  {
    path: '/referee',
    name: 'referee',
    component: Referee
  },
  {
    path: '/coachlist',
    name: 'coachlist',
    props: true,
    component: CoachList
  },

]

const router = new VueRouter({
  routes
})

export default router
