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
        <div class="introWrapper">
          <div class="courseIntro">
            <div class="left">
              <img :src="loadUrl(detail.coverImg)" alt="">
            </div>
            <div class="right">
              <div class="item-name">
                <h2 class="item-title">{{ detail.name }}</h2>
                <el-tag type="info" class="bg1"
                        v-if="isDuringDate(detail.applyStartTime, detail.applyEndTime) == -1">已结束
                </el-tag>
                <el-tag type="danger" class="bg2"
                        v-else-if="isDuringDate(detail.applyStartTime, detail.applyEndTime) == 0">进行中
                </el-tag>
                <el-tag type="success" class="bg3" v-else>筹备中</el-tag>

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
          <div class="courseMenu">

            <div class="tab">课程目录</div>
            <div class="content">
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
          </div>
          <div class="courseTeacher">
            <h3 class="tab">报名信息</h3>
            <p>{{ detail.info }}</p>
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

export default {
  // props: ['id'],

  data() {
    return {
      detail: '',
      id: this.$route.query.id
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
          self.$router.push({name: 'trainsPay', params: {detail: self.detail}})
        } else {
          self.$message(res.msg);
        }
      });
    },

  }

}
</script>

<style lang="scss" scoped>
.trains-detail {
  width: 1200px;
  margin: 0 auto;
  //background-color: #f9f9f9;
  .topBanner {
    color: #848484;
    background-color: #f9f9f9;
    font-size: 12px;
    height: 54px;
    line-height: 46px;
    padding: 8px 0 8px 6px;

    span {
      color: #848484;
    }

    .tabs:hover {
      color: #666;
    }

  }

  .contentWrapper {
    padding: 12px 10px;
    background-color: #fff;

    .introWrapper {
      padding-bottom: 18px;
      //background-color: #f9f9f9;
      background-color: #fff;

      .courseIntro {
        display: flex;
        justify-content: space-between;
        flex-wrap: nowrap;
        //height: 180px;
        //background-color: #f9f9f9;
        //padding-left: 6px;

        .left {
          width: 320px;
          min-height: 166px;
          margin-right: 16px;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .right {
          width: 856px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .item-name {
            display: flex;

            .item-title {
              padding-right: 8px;
              padding-top: 4px;
            }

            ::v-deep .el-tag {
              line-height: 24px;
              background-color: #f4f4f5;
              border-color: #e9e9eb;
              color: #909399;
              height: 24px;
              margin-top: 5px;

            }
          }

          .items {
            display: flex;
            justify-content: space-between;

            ul {
              li {
                color: #666;
                font-size: 14px;
                padding: 10px 0 0 0;

                .price {
                  color: #F01414;
                }
              }

              .btn {
                text-align: center;
                width: 130px;
                height: 36px;
                line-height: 36px;
                border-radius: 4px;
                background-color: #db261d;
                color: #FFFFFF;
                cursor: pointer;
                font-size: 14px;
                display: inline-block;
              }
            }

            .buy {
              display: flex;
              flex-direction: column-reverse;
              align-items: end;
              margin-right: 20px;

              .price {
                font-size: 26px;
                padding-right: 24px;
                color: #F01414;

                i {
                  font-size: 22px;
                  color: #F01414;
                }
              }

              .btn {
                text-align: center;
                width: 150px;
                height: 45px;
                line-height: 45px;
                border-radius: 25px;
                background-color: #db261d;
                color: #FFFFFF;
                cursor: pointer;
                font-size: 16px;
                display: inline-block;
              }
            }
          }
        }
      }
    }


    .courseDetail {
      display: flex;
      justify-content: space-between;
      background-color: #fff;
      //padding-top: 20px;
      //padding-left: 10px;
      //padding-right: 10px;
      //padding-bottom: 20px;
      padding: 20px 0;

      .courseMenu {
        width: 900px;


        .tab {
          height: 52px;
          border-bottom: 1px solid #eee;
          font-size: 18px;
          line-height: 52px;
          color: #000000;
        }

        .content {
          .intro {
            padding: 20px 0;
            margin-bottom: 30px;

            p {
              line-height: 30px;
              color: #666;
              font-size: 14px;
            }
          }

          .list {
            padding-top: 20px;

            li {
              border: 1px solid #eee;
              box-shadow: 0 0 20px #eee;
              border-radius: 5px;
              margin-bottom: 20px;
              padding: 20px 0;
              display: flex;
              align-items: center;
              cursor: pointer;

              i {
                padding-left: 6px;
                width: 60px;
                font-size: 24px;
              }

              .title {
                display: flex;
                justify-content: space-between;
                width: 100%;

                .content {
                  font-size: 16px;
                  padding-left: 10px;

                }

                .time {
                  font-size: 12px;
                  color: #999;
                  line-height: 24px;
                  padding-right: 10px;
                }
              }
            }
          }
        }


      }

      .courseTeacher {
        width: 250px;

        h3 {
          height: 52px;
          border-bottom: 1px solid #eee;
          font-size: 18px;
          line-height: 52px;
        }

        p {
          font-size: 14px;
          line-height: 30px;
          padding: 20px 0;
          color: #666;
          text-indent: 28px;
        }
      }
    }
  }


}
</style>
