<template>
  <div>
    <Nav/>
    <div class="topBanner">
      <router-link to="/" class="tabs">首页 ></router-link>
      <span @click="back" class="tabs">裁判评分 > </span>
      <span class="courseName">评分内容</span>
    </div>
    <div class="courseDetail">
      <div class="courseMenu">
        <div class="tab">视频内容</div>
        <div class="content">
          <video controls class="video">
            <source :src="loadUrl(detail.videoUrl)" type="video/mp4">
          </video>
        </div>

      </div>
      <div class="courseTeacher">
        <h3 class="tab">规程</h3>
        <p class="item-time">考试名称：{{ detail.trainName }}</p>
        <p class="item-time">
          考试类型：{{
            detail.trainType == 1
                ? "段位考评"
                : detail.trainType == 2
                ? "教练员培训"
                : detail.trainType == 3
                    ? "裁判员培训"
                    : "考评员培训"
          }}
        </p>
        <p class="item-time">上传时间：{{ detail.uploadTime }}</p>
        <p class="item-time">等级：{{ detail.trainLv }}</p>
        <el-button class="btn" @click="showScore=true" v-if="type==1">我要打分</el-button>
        <p class="item-time" v-else>考试成绩：<span class="item-score">{{ scores.assessScore }} 分</span></p>
      </div>

      <el-dialog :visible.sync="showScore" title="打分">
        <div class="mark">
          <span>分数：</span>
          <el-input v-model="score" autocomplete="off"></el-input>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="showScore=false">取 消</el-button>
    <el-button type="primary" @click="marking">确定</el-button>
  </span>

      </el-dialog>
    </div>
    <Footer/>
  </div>
</template>

<script>
import {Scoring, reffgetscore} from "@/api/training";

export default {
  data() {
    return {
      showScore: false,
      score: "", //input里面裁判打的分
      detail: {},
      scores: "",
      type: null,
    }
  },
  created() {
    this.detail = JSON.parse(this.$route.query.detail);
    this.type = JSON.parse(this.$route.query.scored);
  },
  mounted() {
    if (this.type == 2) {
      this.getscores();
    }
  },
  methods: {
    // 获取分数
    getscores() {
      reffgetscore({id: this.detail.id}).then((res) => {
        if (res.code == 200) {
          this.scores = res.data;
        } else {
          this.$message(res.msg);
        }
      });
    },
    // 打分
    marking() {
      const self = this;
      let id = self.detail.id;
      let parms = {
        id,
        score: self.score,
      };
      Scoring(parms).then((res) => {
        if (res.code == 200) {
          self.$message('打分成功')
          // self.$router.push({path:"/rc-score-list",query:{
          //     crType:'1'
          //   }});
          self.$router.back()
        } else if (parms.score == '') {
          self.$message('请输入分数')
        } else {
          self.$message(res.msg);
        }
      });
    },
    back() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.topBanner {
  color: #848484;
  background-color: #f9f9f9;
  font-size: 12px;
  height: 54px;
  line-height: 46px;
  padding: 8px 0 8px 6px;
  width: 1200px;
  margin: 0 auto;

  span {
    color: #848484;
  }

  .tabs {
    cursor: pointer;
  }

  .tabs:hover {
    color: #666;
  }

}

.courseDetail {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding-top: 6px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 20px;
  width: 1200px;
  margin: 0 auto 0 auto;

  .courseMenu {
    width: 900px;


    .tab {
      height: 52px;
      border-bottom: 1px solid #eee;
      font-size: 18px;
      line-height: 52px;
    }

    .content {
      .video {
        width: 800px;
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
      padding: 10px 0;
      color: #666;
      text-indent: 4px;
    }

    .item-score {
      color: #f46e6a;
      font-size: 16px;

    }

    .btn {
      text-align: center;
      width: 100px;
      height: 45px;
      //line-height: 45px;
      border-radius: 4px;
      background-color: #db261d;
      color: #FFFFFF;
      cursor: pointer;
      font-size: 16px;
      display: inline-block;
      margin-top: 4px;
    }
  }

  ::v-deep .el-dialog {
    border-radius: 8px;
    width: 400px;
  }

  ::v-deep .el-dialog__footer {
    text-align: center;
    margin-left: 16px;
  }

  .dialog-footer {
    ::v-deep .el-button {
      border-color: #db261d;
      color: #db261d;
      background-color: #fff;
      margin: 0 14px;
    }

    ::v-deep .el-button--primary {
      background: #db261d;
      border-color: #db261d;
      color: #fff;
    }
  }


  .el-dialog {

    .mark {
      display: flex;
      align-items: center;

      span {
        width: 60px;
      }
    }
  }
}


</style>
