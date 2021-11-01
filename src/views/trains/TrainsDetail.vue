<template>
  <div>
    <Nav/>
    <div class="trains-detail">
      <div class="topBanner">
        <router-link to="/" class="tabs">首页 ></router-link>
        <router-link to="/apply-list" class="tabs">培训 ></router-link>
        <span @click="back" class="tabs">{{ name }} ></span>
        <span class="courseName">{{ detail.trainName }}</span>
      </div>


      <div class="contentWrapper">

        <div class="ss-introWrapper">
          <div class="courseIntro">
            <div class="left" :class="{exam:detail.hasExam==0 }">
              <img :src="loadUrl(detail.imgUrl)" alt="">
            </div>
            <div class="right">
              <div class="item-name">
                <h2 class="item-title">{{ detail.trainName }}</h2>
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
                  <li>
                    培训类型：{{
                      detail.trainType == 1
                          ? "段位考评"
                          : detail.trainType == 2
                          ? "教练员培训"
                          : detail.trainType == 3
                              ? "裁判员培训"
                              : "考评员培训"
                    }}
                  </li>
                  <li>等级：{{ detail.trainLv }}</li>
                  <li>时间：{{ detail.beginTime }} 至 {{ detail.endTime }}</li>
                  <li>培训方式：{{ detail.lookType == 1 ? "视频" : "资料" }}</li>
                  <li>主办：{{ detail.trainOrganizer }}</li>
                  <li v-show="detail.hasExam==1">考试类型：{{ detail.examType == 1 ? "在线答题" : "上传视频" }}</li>
                  <li v-show="detail.hasExam==1">补考次数：{{ detail.examinationNum }}</li>
                  <li v-show="detail.hasExam==1">
                    考试是否付费：
                    <el-tag v-if="detail.needPay == 1" type="warning" size="small">付费</el-tag>
                    <el-tag v-else type="success" size="small">免费</el-tag>
                  </li>
                  <!--                <li v-show="detail.needPay==1 &&detail.isApply !== 1 ">-->
                  <!--                  价格：<span class="price"><i>￥</i>{{ detail.price }}</span>-->
                  <!--                </li>-->
                  <!--                <li>-->
                  <!--                  <div class="btn" @click="golink" v-if="detail.isApply == 1">查看课程</div>-->
                  <!--                  <div class="btn" @click="confirmationTrains" v-else>我要报名</div>-->
                  <!--                </li>-->
                </ul>
                <!--              未支付-->
                <div class="buy" v-if="detail.paystatus == 0">
                  <div class="btn" v-if="detail.hasExam==1" @click="goLinks">我要考试</div>
                  <div class="btn" v-else @click="$message('暂无考试')">我要考试</div>
                  <span class="price" v-show="detail.needPay==1"><span></span><i>￥</i>{{ detail.examFee }}</span>

                </div>
                <!--              已支付-->
                <div class="buy" v-else>
                  <div class="btn" v-if="detail.hasExam==1" @click="goLinks">我要考试</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="courseDetail">
          <div class="courseMenu">
            <div class="nav2Tabs">
              <div class="tab" :class="{on: selected==index}" @click="select(index)" v-for="(item,index) in tabs"
                   :key="index">
                {{ item }}
              </div>
            </div>
            <div class="content" v-show="selected==0">
              <div v-html="detail.activityRules" class="rules"></div>
            </div>
            <!--          培训内容-->
            <div class="content" v-show="selected===1">
              <video controls class="video" v-if="videoUrl">
                <source :src="loadUrl(videoUrl)" type="video/mp4">
              </video>
              <div class="word" v-else>
                <span class="download">点击下载讲义：</span>
                <a :href="loadUrl(wordUrl)" target="_blank">{{ detail.trainName }}</a>
              </div>
            </div>
            <!--          考试记录-->
            <div class="content" v-show="selected===2">
              <ul class="list" v-if="examList.length>0">
                <li v-for="(item,index) in examList" :key="index" class="listItem" @click="checkRecord(item)">
                  <div class="exam">
                    <span class="times">第{{ item.times }}次考试</span>
                    <el-tag v-if="item.status == 0" type="primary" size="small">考试中</el-tag>
                    <el-tag v-if="item.status == 1" type="warning" size="small">评分中</el-tag>
                    <el-tag v-if="item.status == 2" type="success" size="small">考试完成</el-tag>
                  </div>
                  <div class="score">
                 <span v-if="item.status == 0"
                 >得分：{{ item.score || 0 }} ></span
                 >
                    <span v-if="item.status == 1"
                    >得分：{{ item.score || 0 }} ></span
                    >
                    <span v-if="item.status == 2"
                    >得分：{{ item.score }} ></span
                    >
                  </div>
                </li>

              </ul>
              <el-empty description="暂无考试记录" v-else></el-empty>
            </div>
          </div>
          <!--        <div class="courseTeacher">-->
          <!--          <h3 class="tab">规程</h3>-->
          <!--          <p v-html="detail.activityRules"></p>-->
          <!--        </div>-->
        </div>
      </div>

      <!--上传视频-->
      <el-dialog
          :visible.sync="dialogVisible"
      >
        <ExamUpvideo :detail="detail"/>
      </el-dialog>

    </div>
    <Footer/>
  </div>
</template>

<script>
import {
  getTrainInfo, getPaperHistoryBytrainId
} from "@/api/training";
import ExamUpvideo from '@/views/trains/Exam-upvideo'
import '@/assets/tabs.scss'
import '@/assets/topBanner.scss'
import "@/assets/ss-introWrapper.scss"

export default {
  components: {ExamUpvideo},
  props: ['id'],
  data() {
    return {
      name: this.$route.params.name,
      detail: {},
      wordUrl: '',
      videoUrl: '',
      dialogVisible: false,
      //tabs
      selected: 0,
      tabs: ['规程', '培训内容', '考试记录'],
      // 考试记录
      total: null,
      active: 0,
      activeName: "0",
      parmas: {
        pageNum: 1,
        pageSize: 100,
        trainId: this.id,
      },
      examList: []
    }
  },
  mounted() {
    this.init()
    this.getPaperHistoryBytrainIds()
  },

  methods: {
    init() {
      const self = this
      self.$store.commit("showLoading");
      getTrainInfo({id: self.id}).then((res) => {
        if (res.code == 200) {
          self.detail = res.data
          self.wordUrl = res.data.wordUrl
          if (res.data.videoUrl) {
            self.videoUrl = res.data.videoUrl
          }
        } else {
          self.$message(res.msg)
        }
        self.$store.commit("hideLoading");
      })
    },
    back() {
      this.$router.back()
    },
    select(index) {
      this.selected = index
    },
    goLinks() {
      let self = this
      let _detail = JSON.stringify(self.detail);
      if (self.detail.paystatus == 0 && self.detail.needPay == 1) {
        self.$router.push({path: "/item-pay", query: {IPdetail: _detail }});
      } else {
        if (self.detail.examType == 2) {
          // self.$router.push({
          //   path:'/exam-upvideo',
          //   query:{_detail}
          // })
          self.dialogVisible = true
        } else {
          self.$router.push(`/exam-online/${self.detail.id}`);
        }
      }
    },
    getPaperHistoryBytrainIds() {
      const self = this;
      getPaperHistoryBytrainId(self.parmas).then((res) => {
        if (res.code === 200) {
          self.examList = res.data
        }
      });
    },
    checkRecord(record) {
      // status==0没完成考试
      if (record.status == 0) {
        let _detail = JSON.stringify(this.detail);
        if (this.detail.examType == 2) {
          // this.$router.push({
          //   path: "/exam-upvideo",
          //   query: { detail: _detail },
          // });
          this.dialogVisible = true
        } else {
          this.$router.push(`/exam-online/${this.id}`);
        }
      } else {
        this.$router.push(`/exam-record/${record.paperid}`);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.trains-detail {
  width: 1200px;
  margin: 0 auto;
  //background-color: #f9f9f9;

  .contentWrapper {
    padding: 12px 10px;
    //background-color: #fff;

    .ss-introWrapper {
      .courseIntro {
        .left {
          height: 292px;
          &.exam {
            height: 192px;
          }
        }
      }
    }

    .courseDetail {
      display: flex;
      justify-content: space-between;
      background-color: #fff;
      padding-top: 20px;
      //padding-left: 10px;
      //padding-right: 10px;
      padding-bottom: 20px;

      .courseMenu {
        //width: 900px;
        width: 1200px;


        .content {
          min-height: 294px;

          .rules {
            padding-top: 20px;
          }

          .video {
            width: 1200px;
            height: 400px;
            margin: 12px 0;
          }

          .word {
            font-size: 14px;
            margin: 12px 0;

            a {
              color: #2d8cf0;

            }
          }

          .list {
            cursor: pointer;

            .listItem {
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: 50px;
              border-bottom: 1px solid #eee;

              .exam {
                .times {
                  padding-right: 6px;
                  font-size: 13px;
                }
              }

              .score {
                cursor: pointer;
                font-size: 13px;
              }
            }
          }
        }


      }

      //.courseTeacher {
      //  width: 250px;
      //
      //  h3 {
      //    height: 52px;
      //    border-bottom: 1px solid #eee;
      //    font-size: 18px;
      //    line-height: 52px;
      //  }
      //
      //  p {
      //    font-size: 14px;
      //    line-height: 30px;
      //    padding: 20px 0;
      //    color: #666;
      //    text-indent: 28px;
      //  }
      //}
    }
  }


  ::v-deep .el-dialog {
    width: 600px;
    border-radius: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }
}
</style>
