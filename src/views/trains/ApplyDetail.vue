<template>
  <div>
    <Nav/>
    <div class="trains-detail">
      <div class="topBanner">
        <router-link to="/" class="tabs">首页 ></router-link>
        <router-link to="/apply-list" class="tabs">培训 ></router-link>
        <span class="courseName">{{ detail.name }}</span>
      </div>
      <div class="contentWrapper">
        <div class="ss-introWrapper">
          <div class="courseIntro">
            <div class="left">
              <img :src="loadUrl(detail.coverImg)" alt="">
            </div>
            <div class="right">
              <div class="item-name">
                <h2 class="item-title">{{ detail.name }}</h2>
                <el-tag type="info" class="bg1" size="small"
                        v-if="isDuringDate(detail.applyStartTime, detail.applyEndTime) == -1">已结束
                </el-tag>
                <el-tag type="danger" class="bg2" size="small"
                        v-else-if="isDuringDate(detail.applyStartTime, detail.applyEndTime) == 0">进行中
                </el-tag>
                <el-tag type="success" class="bg3" size="small" v-else>筹备中</el-tag>

              </div>

              <div class="items">
                <ul>
                  <li>培训人数：{{ detail.applyNum }}</li>
                  <li>
                    报名时间：{{ detail.applyStartTime }} 至
                    {{ detail.applyEndTime }}
                  </li>
                  <li>
                    培训时间：{{ detail.trainStartTime }} 至
                    {{ detail.trainEndTime }}
                  </li>
                  <li>
                    是否报名：
                    <el-tag v-if="detail.isApply == 1" type="success" size="small">已报名</el-tag>
                    <el-tag v-else type="warning" size="small">未报名</el-tag>
                  </li>
                  <!--                <li v-show="detail.needPay==1 &&detail.isApply !== 1 ">-->
                  <!--                  价格：<span class="price"><i>￥</i>{{ detail.price }}</span>-->
                  <!--                </li>-->
                  <!--                <li>-->
                  <!--                  <div class="btn" @click="golink" v-if="detail.isApply == 1">查看课程</div>-->
                  <!--                  <div class="btn" @click="confirmationTrains" v-else>我要报名</div>-->
                  <!--                </li>-->
                </ul>
                <div class="buy">
                  <div class="btn" @click="golink" v-if="detail.isApply == 1">查看课程</div>
                  <div class="btn" @click="confirmationTrains" v-else>我要报名</div>
                  <span class="price"
                        v-show="detail.needPay==1 &&detail.isApply !== 1 "><i>￥</i>{{ detail.price }}</span>

                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="courseDetail">
          <div class="ss-courseMenu">

            <div class="nav2Tabs">
              <div class="tab" :class="{on: selected==index}" @click="select(index)" v-for="(item,index) in tabs"
                   :key="index">
                {{ item }}
              </div>
            </div>
            <div class="content" v-show="selected==0">
              <ul class="list">
                <li @click="jump(item.id)" v-for="(item,index) in detail.orgWxTrainExaminations" :key="index">
                  <i class="el-icon-video-camera" v-if="item.lookType==1"></i>
                  <i class="el-icon-document" v-else-if="item.lookType==2"></i>
                  <div class="title">
                    <span class="content">{{ item.trainName }}</span>
                    <!--                  <span class="time">1时20分</span>-->
                  </div>
                </li>
              </ul>
            </div>
            <div class="content" v-show="selected==1">
              <p class="info">{{ detail.info }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import {
  getApplyTrainDetail,
  confirmationTrain,
} from "@/api/training";
import '@/assets/tabs.scss'
import '@/assets/topBanner.scss'
import '@/assets/ss-introWrapper.scss'
import "@/assets/courseMenu.scss"

export default {
  // props: ['id'],

  data() {
    return {
      detail: '',
      id: this.$route.query.id,
      tabs: ['课程目录', '报名信息'],
      selected: 0
    }
  },

  mounted() {
    this.getApplyTrainDetails()

  },
  methods: {
    getApplyTrainDetails() {
      const self = this;
      let id = self.id;
      self.$store.commit("showLoading");
      getApplyTrainDetail({id}).then((res) => {
        if (res.code == 200) {
          self.detail = res.data;
        } else {
          self.$message(res.msg);
          setTimeout(() => {
            self.$router.push("/login");
          }, 1000);
        }
        self.$store.commit("hideLoading");
      });
    },
    golink() {
      // this.$router.push(`/trains/${this.detail.id}`)
      this.$router.push({path: '/trains', query: {aId: this.detail.id, name: this.detail.name}})
    },
    jump(id) {
      // this.$router.push(`/trains-detail/${id}`)
      let self = this
      if (this.detail.isApply == 1) {
        self.$router.push({name: 'trainsDetail', params: {id, name: self.detail.name}})
      } else {
        this.$message('请先报名')
      }
    },
    // 报名
    confirmationTrains() {
      const self = this;
      let id = self.id;
      confirmationTrain({id}).then((res) => {
        if (res.code == 200) {
          self.$message("报名成功！");
          setTimeout(() => {
            // self.$router.push(`/trains/${this.detail.id}`);
            this.$router.push({path: '/trains', query: {aId: this.detail.id, name: this.detail.name}})

          }, 3000);
        } else if (res.code == 2) {
          self.$router.push({path: '/trains-pay', query: {detail: JSON.stringify(self.detail)}})
        } else {
          self.$message(res.msg);
        }
      });
    },
    select(index) {
      this.selected = index
    }
  }

}
</script>

<style lang="scss" scoped>

.trains-detail {
  width: 1200px;
  margin: 0 auto;
  .topBanner {
    //background-color: #fff;
  }
  .contentWrapper{
    padding: 12px 10px;
    background-color: #fff;
    .courseDetail {
      display: flex;
      justify-content: space-between;
      background-color: #fff;
      padding-top: 20px;
      //padding-left: 10px;
      //padding-right: 10px;
      padding-bottom: 20px;

    }
  }

}

</style>
