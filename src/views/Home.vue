<template>
  <div>
    <Nav>
      <div class="navImg">
        <img src="../assets/image/nav-img.png" alt="">
      </div>
    </Nav>
    <div class="main">
      <!--轮播图-->
      <div class="lunbo">
        <el-carousel indicator-position="outside" :interval="6000">
          <el-carousel-item v-for="(item,index) in bannerList " :key=index>
            <div v-if="item.ckType==1" @click="linkban(item)" class="luoboImgWrapper">
              <div class="introl">{{ item.title }}</div>
              <img :src="loadUrl(item.ckImg)" :alt="item.title">
            </div>
            <a v-else :href="item.ckUrl" target="_blank">
              <div class="introl">{{ item.title }}</div>
              <img :src="loadUrl(item.ckImg)" :alt="item.title">
            </a>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!--新闻动态切换-->
      <div class="tabs">
        <ul class="tabs-bar">
          <li class="tabs-bar-title" v-for="(title,index) in tabTitle" :key=index @click="current=index"
              :class="{active: current===index}"
          >{{ title }}
          </li>
          <li class="tabs-bar-title last-title">
            <router-link to="/notice">
              <span class="last">更多>></span>
            </router-link>
          </li>
        </ul>
        <div class="tabs-content">
          <ul v-show="current==1">
            <li class="tabs-content-item" v-for="(notice,index) in noticeList.slice(0,5)" :key="index">
              <div class="neirong">
                <router-link :to="{ path: '/detail/' + notice.id }">{{ notice.noticeTitle }}</router-link>
              </div>
              <div class="time">{{ formatTime(notice.releaseTime) }}</div>
            </li>
          </ul>
          <ul v-show="current==2">
            <li class="tabs-content-item" v-for="(policy,index) in policyList.slice(0,5)" :key="index">
              <div class="neirong">
                <router-link :to="{ path: '/detail/' + policy.id }">{{ policy.noticeTitle }}</router-link>
              </div>
              <div class="time">{{ formatTime(policy.releaseTime) }}</div>
            </li>
          </ul>
          <ul v-show="current==0">
            <li class="tabs-content-item" v-for="(news,index) in newsList.slice(0,5)" :key="index">
              <div class="neirong">
                <router-link :to="{ path: '/detail/' + news.id }">{{ news.noticeTitle }}</router-link>
              </div>
              <div class="time">{{ formatTime(news.releaseTime) }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="introduce">
      <!--协会概况-->
      <div class="left">
        <div class="topNav">
          <div class="title">
            协会概况
          </div>
          <!--          <div class="more">-->
          <!--            <a href="">更多>></a>-->
          <!--          </div>-->
        </div>
        <div class="content">
          <router-link to="/introduce">
            <div class="imgWrapper">
              <img :src="loadUrl(this.introductionLogo)" alt="武术协会大图标">
            </div>
            <div class="introl">
              {{ this.introduction.slice(0, 273) }}......
            </div>
          </router-link>

          <!--          <p>&emsp;&emsp;广东省武术协会成立至今已有近40年历史。在广东省各级领导的关心关怀和国家体育总局、中国武术协会、省体育局的指导支持下，广东省武术协会全体人员坚定信念，牢记使命，团结拼搏、追求卓越，为民服务，为国争光，各项工作扎实推进，成绩斐然。</p>-->
          <!--          <p> &emsp;&emsp;广东武术套路和武术散打项目取得了优异的运动成绩。2人获得北京奥运会、南京青奥会特设项目武术比赛太极拳全能冠军。9人获得全运会竞体项目南拳全能、太极拳全能和散打项目冠军，1人获得全运会群体项目太极拳冠军，30人获得南拳、太极拳类项目和散打项目.......</p>-->
        </div>
      </div>
      <!--惠民服务-->
      <div class="right">
        <div class="topNav">
          <div class="title">惠民服务</div>
        </div>
        <ul class="content">
          <router-link to="/login">
            <li>
              <img src="../assets/image/huimin1.png" alt="会员服务">
              <div>
                <span>会员注册、会员登录、信息查阅</span>
              </div>
            </li>
          </router-link>

          <router-link to="/dan">
            <li>

              <img src="../assets/image/huimin2.png" alt="段位查询">
              <div>
                <span>段位登记、段位查阅</span>
              </div>

            </li>
          </router-link>
          <li>
            <img src="../assets/image/huimin3.png" alt="赛事服务">
            <div>
              <span>报名申请、段位考评、报名查询、成绩查询</span>
            </div>
          </li>
          <li>
            <img src="../assets/image/huimin4.png" alt="教学服务">
            <div>
              <span>视频教学</span>
            </div>
          </li>
          <li>
            <img src="../assets/image/huimin5.png" alt="多媒体区">
            <div>
              <span>赛事图片、赛事视频</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!--赛事服务-->
    <!--    <div class="competition-service">-->
    <!--      <div class="topNav">-->
    <!--        <span>赛事服务</span>-->
    <!--        <span class="more">更多>></span>-->
    <!--      </div>-->
    <!--      <div class="competition-main">-->
    <!--        <div class="competition-list">-->
    <!--          <div class="competition-list-img">-->
    <!--            <img src="../assets/image/competition1.png" alt="赛事服务1">-->
    <!--          </div>-->
    <!--          <div class="competition-list-info">-->
    <!--            <ul>-->
    <!--              <li>广东省武术精英大赛“武”动中山</li>-->
    <!--              <li>报名时间：2021-04-13至2021-04-16</li>-->
    <!--              <li>地点：中山市小榄镇芙兰路</li>-->
    <!--              <li>-->
    <!--                <button>我要报名</button>-->
    <!--              </li>-->
    <!--            </ul>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div class="competition-list">-->
    <!--          <div class="competition-list-img">-->
    <!--            <img src="../assets/image/competition2.png" alt="赛事服务2">-->
    <!--          </div>-->
    <!--          <div class="competition-list-info">-->
    <!--            <ul>-->
    <!--              <li>广东省武术精英大赛首站赛事打响</li>-->
    <!--              <li>报名时间：2021-04-15至2021-04-19</li>-->
    <!--              <li>地点：佛山市岭南明珠体育馆</li>-->
    <!--              <li>-->
    <!--                <button>我要报名</button>-->
    <!--              </li>-->
    <!--            </ul>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div class="competition-list">-->
    <!--          <div class="competition-list-img">-->
    <!--            <img src="../assets/image/competition3.png" alt="赛事服务3">-->
    <!--          </div>-->
    <!--          <div class="competition-list-info">-->
    <!--            <ul>-->
    <!--              <li>广东省武术协会网络赛事活动经验交流</li>-->
    <!--              <li>报名时间：2021-04-19至2021-04-26</li>-->
    <!--              <li>地点：自由选址</li>-->
    <!--              <li>-->
    <!--                <button>我要报名</button>-->
    <!--              </li>-->
    <!--            </ul>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->

    <!--会员风采-->
    <div class="banner">
      <div class="topNav">
        <span class="bannerTitle">会员风采</span>
        <div class="bannerMore">
          <router-link to="/member">
            <span class="last">更多>></span>
          </router-link>
        </div>
      </div>
      <div class="stadium_div" ref="stadium_div">
        <div class="stadium_images">
          <div class="images_scroll" ref="images_scroll">
            <ul>
              <li v-for="(img,index) in newSightList" :key="index">
                <router-link :to="{ path:'/member-detail/'+img.id }">
                  <img :src="loadUrl(img.logo)" :alt="img.title">
                  <span>{{ img.title }}</span>
                </router-link>
              </li>
            </ul>
          </div>
          <div class="images_scroll" ref="images_scroll2">
            <ul>
              <li v-for="(img,index) in newSightList" :key="index">
                <router-link :to="{ path:'/member-detail/'+img.id }">
                  <img :src="loadUrl(img.logo)" :alt="img.title">
                  <span>{{ img.title }}</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!--友情链接-->
    <div class="friend-link">
      <div class="topNav">
        <div>友情链接</div>
      </div>
      <ul class="content">
        <li v-for="(item,index) in friendLink" :key="index">
          <a :href="item.linkUrl" target="_blank">
            <img :src="loadUrl(item.logo)" alt="友情链接1">
          </a>
        </li>
      </ul>
    </div>

    <Footer/>
  </div>
</template>

<script>
import {getHome, getqueryOrgInfo, friendLink} from '@/api/index'
import {getUserProfile} from "@/api/user";

export default {
  data() {
    return {
      current: 0,
      tabTitle: ['通知公告', '政策法规', '新闻动态'],
      bannerList: [],
      newsList: [],
      noticeList: [],
      policyList: [],
      sightList: [],
      newSightList: [],
      ulWidth: null,
      introductionLogo: null,
      introduction: '',
      queryParamsInfo: {
        pageSize: 10,
        pageNum: 1,
        sign: "wx"
      },
      queryParamsFriendLink: {
        pageSize: 10,
        pageNum: 1,
        sign: "wx"
      },
      friendLink: [],
    }

  },

  mounted() {
    this.init()
    this.move()
  },
  methods: {
    init() {
      const self = this;
      getHome({sign: 'wx'}).then((res) => {
        if (res.code == 200) {
          self.bannerList = res.data.bannerList;
          self.newsList = res.data.newsList;
          self.noticeList = res.data.noticeList;
          self.policyList = res.data.policyList;
          self.sightList = res.data.sightList;
          this.changeUlWidth()

        } else {
          self.$message(res.msg);
        }
      });
      getqueryOrgInfo(this.queryParamsInfo).then((res) => {
        if (res.code == 200) {
          self.introduction = res.data.introduction
          self.introductionLogo = res.data.logo;

        } else {
          self.$message(res.msg);
        }
      });
      friendLink(this.queryParamsFriendLink).then((res) => {
        if (res.code == 200) {
          self.friendLink = res.rows
        } else {
          self.$message(res.msg);
        }
      });
      getUserProfile().then((res) => {
        if (res.code == 200) {
          window.sessionStorage.setItem("user", JSON.stringify(res.data));
          self.$store.dispatch("saveUserInfo", res.data);
          self.userInfo = res.data.userInfo
          self.userInfo.avatar = self.loadUrl(self.userInfo.avatar)
          console.log(self.userInfo + 'userInfo')
        } else {
          console.log(res.mes)
        }
      })
    },
    linkban(item) {
      //ckType:(1:站内，2：站外)；linkType:(1:赛事，2：新闻)；nodeType:(1:通知公告，2:政策法规，3:新闻动态)
      if (item.linkType == 1) {
        this.$store.dispatch("saveHeadTitle", "赛事服务")
        this.$store.dispatch("saveFootActive", "赛事服务");
        this.$router.push(`/event-entry-contestants/${item.nodeId}`);
      } else {
        if (item.nodeType == 1) {
          this.$store.dispatch("saveHeadTitle", "通知公告");
          this.$store.dispatch("saveFootActive", "通知公告");
        } else if (item.nodeType == 2) {
          this.$store.dispatch("saveHeadTitle", "政策法规");
          this.$store.dispatch("saveFootActive", "政策法规");
        } else {
          this.$store.dispatch("saveHeadTitle", "新闻动态");
          this.$store.dispatch("saveFootActive", "新闻动态");
        }
      }
      this.$router.push(`/detail/${item.nodeId}`);
    },
    formatTime(time) {
      return time.split('T')[0]
    },
    changeUlWidth() {
      this.newSightList = this.sightList
      console.log(this.sightList.length)
      if (this.sightList.length < 4) {
        let arr = this.sightList.copyWithin()
        this.newSightList = this.sightList.concat(arr)
      }
    },
    move() {
      let speed = 40
      let tab = this.$refs.stadium_div
      // let tab1 = this.$refs.images_scroll
      let tab2 = this.$refs.images_scroll2

      // tab2.innerHTML = tab1.innerHTML

      function Marquee() {
        if (tab.scrollLeft <= 0) {
          tab.scrollLeft = tab.scrollLeft + tab2.offsetWidth;

        } else {
          tab.scrollLeft = tab.scrollLeft - 1;

        }
      }

      let MyMar = setInterval(Marquee, speed);
      tab.addEventListener("mouseover", function () {
        clearInterval(MyMar)
      })
      tab.addEventListener("mouseout", function () {

        MyMar = setInterval(Marquee, speed)
      })
    }
  }
}
</script>

<style lang="scss">
body {
  background-image: url("../assets/image/bgc.png");
}

//轮播图+新闻动态切换
.main {
  width: 1200px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;

  //轮播图
  > .lunbo {
    width: 576px;
    height: 277px;
    position: relative;

    .luoboImgWrapper {
      width: 576px;
      height: 300px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .introl {
        background-color: rgba(0, 0, 0, 0.5);
        color: white;
        position: absolute;
        top: 262px;
        width: 576px;
        height: 38px;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        padding: 6px 0 6px 6px;
      }
    }

  }

  //新闻动态切换
  > .tabs {
    width: 600px;
    height: 310px;
    display: flex;
    flex-direction: column;
    background-color: #fff;

    > .tabs-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      //border: 1px solid red;
      margin-bottom: 0;
      //background-color: #fff;
      > .tabs-bar-title {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 158px;
        height: 50px;
        border: 1px solid #E0E0E0;
        font-size: 17px;
        cursor: pointer;
        padding: 3px 0;

        &.active {
          background-color: #DB261D;
          color: white;
        }

        &.last-title {
          border-left: none;
        }

        span {
          display: flex;
          justify-content: center;
          align-items: center;

          &.last {
            color: #838383;
            font-size: 10px;
            border-left: none;
            padding-left: 78px;
          }
        }

      }

    }

    > .tabs-content {


      > ul {

        > .tabs-content-item {
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-between;
          border-bottom: 1px dashed #e0e0e0;
          padding: 0 6px 0 16px;
          //:hover{
          //  color: #DB261D !important;
          //  .time{
          //    color: #DB261D !important;
          //  }
          //}
          > .neirong {
            font-size: 14px;
            width: 450px;
            height: 50px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            line-height: 50px;

            :hover {
              color: #DB261D;
            }

            a {
              color: #545454;

            }
          }

          > .time {
            color: #545454;
            font-size: 12px;
            line-height: 50px;
          }
        }
      }
    }
  }

}

//协会介绍 + 惠民服务
.introduce {
  width: 1200px;
  margin: 26px auto;
  display: flex;
  justify-content: space-between;
  //协会介绍
  > .left {
    width: 576px;
    background-color: #fff;

    > .topNav {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #DB261D;

      > .title {
        width: 88px;
        height: 50px;
        font-size: 16px;
        background-color: #DB261D;
        line-height: 50px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      > .more {
        > a {
          font-size: 10px;
          line-height: 38px;
          padding-right: 15px;
          color: #838383;
        }

      }
    }

    > .content {
      height: 280px;
      margin-top: 8px;
      background-color: #fff;
      padding: 0px 16px;

      a {
        color: #545454;

        > .introl {
          font-size: 14px;
          text-align: left;
          text-indent: 32pt;
          line-height: 24px;
          max-height: 242px;
        }

        > .imgWrapper {
          float: left;
          width: 260px;
          height: 190px;

          > img {
            max-height: 190px;
          }
        }
      }

    }
  }

  //惠民服务
  > .right {
    width: 600px;
    background-color: #fff;

    > .topNav {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #DB261D;
      margin-bottom: 6px;

      > .title {
        width: 88px;
        height: 50px;
        font-size: 16px;
        background-color: #DB261D;
        line-height: 50px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    > .content {
      background-color: #fff;
      height: 242px;

      li {
        display: flex;
        padding: 10px 16px 0 16px;
        align-items: center;

        div {
          line-height: 31px;
          height: 31px;
          flex: 1;
          font-weight: 400;
          color: #5c5c5c;
          padding-left: 12px;
          background: rgb(255 248 247);

          span {
            font-size: 12px;
          }
        }
      }
    }
  }
}

//赛事服务
.competition-service {
  display: block;
  width: 1200px;
  height: 400px;
  margin: 0 auto;
  margin-top: 30px;

  > .topNav {
    width: 100%;
    background-color: #DB261D;
    height: 45px;
    overflow: hidden;
    border-radius: 5px 5px 0 0;
    padding-left: 10px;
    padding-top: 10px;
    color: #fff;
    font-family: 微软雅黑;
    font-size: 16px;
    font-weight: normal;
    line-height: 23px;

    .more {
      float: right;
      padding-right: 8px;
    }
  }

  > .competition-main {
    display: flex;
    justify-content: space-between;

    > .competition-list {
      background-color: #fff;
      padding: 8px 20px;

      .competition-list-info {
        li {
          width: 340px;
          height: 40px;
          font-size: 16px;

          > button {
            font-size: 16px;
            width: 100px;
            height: 40px;
            background-color: #DB261D;
            border: 0;
            color: #FFFFFF;
            border-radius: 5px;
          }
        }
      }
    }
  }
}

//会员风采
.banner {
  width: 1200px;
  margin-top: 26px;
  margin-right: auto;
  margin-left: auto;

  > .topNav {
    width: 100%;
    background-color: #DB261D;
    height: 45px;
    overflow: hidden;
    border-radius: 5px 5px 0 0;
    padding-left: 10px;
    color: #fff;
    font-family: 微软雅黑;
    font-size: 16px;
    font-weight: normal;
    line-height: 23px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .last {
      color: #fff;
      font-size: 10px;
      border-left: none;
      padding-right: 12px;
    }
  }

  > .stadium_div {
    width: 1200px;
    margin-top: 0;
    background: #FFF;
    overflow: hidden;

    .stadium_images {
      float: left;
      width: 800%;
      height: 210px;
      text-align: center;
      padding: 15px;

      > .images_scroll {
        float: left;

        > ul {
          display: block;

          li {
            float: left;
            width: 300px;
            height: 190px;
            margin-right: 15px;
            position: relative;

            img {
              //width: 300px;
              //height: 190px;
              //margin-right: 15px;
              width: 100%;
              height: 100%;
              object-fit: cover;

            }

            span {
              background: linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgba(31, 40, 105, 0));
              position: absolute;
              bottom: 0;
              width: 300px;
              left: 0;
              color: #fff;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              padding: 6px 12px 8px 12px;
              font-size: 14px;
              //text-align: left;
            }
          }
        }
      }

      > .images_scroll2 {
        float: left;
      }
    }

    //> ul {
    //  display: flex;
    //  margin-top: 8px;
    //  //overflow-x: scroll;
    //  //animation:slider  10s linear infinite reverse ;
    //  > li {
    //    margin-right: 12px;
    //
    //    img {
    //      width: 300px;
    //      height: 190px;
    //    }
    //  }
    //}

    @keyframes slider {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-300px);
      }
    }
  }
}

//友情链接
.friend-link {
  background-color: #f0f0f0;
  width: 1200px;
  height: 114px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 40px;

  > .topNav {
    margin-bottom: 10px;

    div {
      color: #080404;
      font-size: 18px;
      text-align: center;
      width: 140px;
      border-bottom: 2px solid #e7141b;
      box-sizing: border-box;
      margin-right: .10rem;
      font-weight: 800;
      padding-top: 6px;
    }

  }

  > .content {
    display: flex;
    margin-left: 30px;

    > li {
      width: 160px;
      height: 46px;
      margin-right: 4px;

      img {
        //width: 160px;
        //height: 46px;
        width: 100%;
        height: 100%;
        object-fit: fill;
      }
    }
  }
}
</style>