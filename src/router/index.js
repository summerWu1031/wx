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
import Coach from "@/views/rc/Coach";
import Referee from "@/views/rc/Referee";
import CRlist from "@/views/rc/CRlist";
import CoachReferee from "@/views/rc/CoachReferee";
import CourseMenu from "@/views/Course/CourseMenu";
import CourseDetailList from "@/views/Course/CourseDetailList";
import MemberPay from "@/views/User/MemberPay";
import CourseContent from "@/views/Course/CourseContent";
import CoursePay from "@/views/Course/CoursePay";
import Trains from "@/views/trains/Trains";
import ApplyList from "@/views/trains/ApplyList";
import ApplyDetail from "@/views/trains/ApplyDetail";
import TrainsDetail from "@/views/trains/TrainsDetail";
import TrainsPay from "@/views/trains/TrainsPay";
import ExamVedio from '@/views/trains/Exam-upvideo'
import ExamOline from '@/views/trains/Exam-online'
import ItemPay from "@/views/trains/ItemPay";
import ExamList from "@/views/trains/Exam-list";
import ExamRecord from "@/views/trains/Exam-record";
import ExamState from '@/views/trains/Exam-state'

import NotFound from "@/components/NotFound";
import Mycourse from "@/views/Course/Mycourse";

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
    // props: true,
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
  },
  {
    path: '/coachreferee',
    name: 'coachreferee',
    component: CoachReferee,
    meta:{
      requireAuth:true
    }
  },
  {
    path: '/crlist',
    name: 'crlist',
    props: true,
    component: CRlist
  },
  {
    path: '/course',
    name: 'course',
    props: true,
    component: CourseMenu,
  },
  {
    path: '/course-detail/:id',
    name: 'course-detail',
    props: true,
    component: CourseDetailList,
    meta:{
      requireAuth:true
    }
  },
  {
    path: '/course-content/:selected/:id',
    name: 'course-content',
    props: true,
    component: CourseContent,
    meta:{
      requireAuth:true
    }
  },
  {
    path: '/course-pay/:detail',
    name: 'course-pay',
    props: true,
    component: CoursePay,
    meta:{
      requireAuth:true
    }
  },
  {
    path: '/myCourse',
    name: 'mycourse',
    props: true,
    component: Mycourse,
    meta:{
      requireAuth:true
    }
  },
  {
    path: '/memberpay',
    name: 'memberpay',
    props: true,
    component: MemberPay,
    meta:{
      requireAuth:true
    }
  },
  {
    path: '/apply-list',
    name: 'applyList',
    props: true,
    component: ApplyList,
  },
  {
    path: '/apply-detail',
    name: 'applyDetail',
    props: true,
    component: ApplyDetail,
    meta:{
      requireAuth:true
    }
  },
  {
    path: '/trains-pay',
    name: 'trainsPay',
    props: true,
    component: TrainsPay,
  },
  {
    path: '/trains',
    name: 'trains',
    props: true,
    component: Trains,
    meta:{
      requireAuth:true
    }
  },
  {
    path: '/trains-detail/:id/:name',
    name: 'trainsDetail',
    props: true,
    component: TrainsDetail,
    meta:{
      requireAuth:true
    }
  },
  // {
  //   path: '/exam-upvideo',
  //   props: true,
  //   component: ExamVedio,
  //   meta:{
  //     requireAuth:true
  //   }
  // },
  {
    path: '/exam-online/:id',
    props: true,
    component: ExamOline,
    meta:{
      requireAuth:true
    }
  },
  {
    path: '/exam-state',
    props: true,
    component: ExamState,
    meta:{
      requireAuth:true
    }
  },
  {
    path: '/item-pay',
    props: true,
    component: ItemPay,
    meta:{
      requireAuth:true
    }
  },
  {
    path: '/exam-list',
    props: true,
    component: ExamList,
    meta:{
      requireAuth:true
    }
  },
  {
    path: '/exam-record/:paperid',
    props: true,
    component: ExamRecord,
    meta:{
      requireAuth:true
    }
  },
  {
    path: '/rc-score-list',
    name:'rcScoreList',
    props: true,
    component: () => import('@/views/rc/RcScoreList'),
    meta:{
      requireAuth:true
    }
  },
  {
    path: '/rc-score-detail',
    name:'rcScoreDetail',
    props: true,
    component: () => import('@/views/rc/RcScoreDetail'),
    meta:{
      requireAuth:true
    }
  },
  {
    path: '/raceList',
    name:'raceList',
    props: true,
    component: () => import('@/views/Race/RaceList'),
    meta:{
      requireAuth:true
    }
  },
  {
    path: '/race-list-detail',
    name:'raceListDetail',
    props: true,
    component: () => import('@/views/Race/RaceListDetail'),
    meta:{
      requireAuth:true
    }
  },
  {
    path:'*',
    component:NotFound
  },
]

const router = new VueRouter({
  routes
})

export default router
