<template>
  <div>
    <Nav/>
    <div class="exam-online">
      <!--      标题+导航-->
      <div class="exam-nav">
        <div class="examName">
          <div class="block"></div>
          <span>{{ scoreInfo.trainName }}</span>
        </div>
        <div class="nav">
          导航：<span @click="back" class="back">返回培训</span>
        </div>
      </div>
      <!--      倒计时-->
      <div class="countDown" v-if="isshowDT">
        <span class="time">倒计时：{{ countTime }}</span>
      </div>
      <!--      题目列表-->
      <div class="exam-list">
        <ol>
          <li v-for="(item,index) in examList" :key="index"
              :class="{
              // onTrue: item.subjectAnswer == item.userAnswer,
              onTrue: trueId.indexOf(item.id)>=0,
              onFalse: falseId.indexOf(item.id)>=0,
              // onFalse:
              //   item.subjectAnswer != item.userAnswer && item.isFinish == 1,
              selected: index == cIndex,
            }"
              @click="select(item,index)"
          >
            <span>{{ index + 1 }}</span>
          </li>
        </ol>
      </div>
      <!--      题目内容-->
      <div class="exam-content">
        <h3 class="exam-title">
          <el-tag type="warning">{{ currentExam.subjectType == 1 ? "选择题" : "判断题" }}</el-tag>
          <span>{{ currentExam.subjectCenter }}</span>
        </h3>
        <!--        还没答题-->
        <ul class="options" v-if="currentExam.userAnswer =='' && finishListId.indexOf(currentExam.id)<0">
          <li class="option" v-for="(item,index) in  currentExam.optionList"
              :key="index" @click="pick(item)">
            <div class="icon"> <!-- :class="{on:item.option==answer}" -->
              <span>{{ item.option }}</span>
            </div>
            <span class="content">{{ item.content }}</span>
          </li>
          <li class="option finish">
            <el-button class="finish" @click="testScores">交卷</el-button>
          </li>
        </ul>
        <!--        已经答题-->
        <ul class="options" v-else>
          <li class="option disabled" v-for="(item,index) in  currentExam.optionList"
              :key="index"><!--@click="pick(item)" :class="{ disabled:currentExam.userAnswer}"-->
            <!--            题目是正确的-->
            <div class="icon " v-if="trueId.indexOf(currentExam.id)>=0"
                 :class="{
                onTrue: currentExam.subjectAnswer==item.option,
              }"> <!-- :class="{on:item.option==answer}" -->

              <span v-if="answer==item.option"><i class="el-icon-check"></i></span>
              <span v-else>{{ item.option }}</span>
            </div>
            <!--题目是错误的-->

            <div class="icon " v-else
                 :class="{
                onTrue: currentExam.subjectAnswer==item.option,
                onFalse: picked==item.option
              }">

              <span v-if="currentExam.subjectAnswer==item.option"><i class="el-icon-check"></i></span>
              <span v-else-if="picked==item.option"><i class="el-icon-close"></i></span>
              <span v-else>{{ item.option }}</span>
            </div>
            <span class="content" :class="{
                onTrue: currentExam.subjectAnswer==item.option ,
                onFalse: picked==item.option && falseId.indexOf(currentExam.id)>=0
              }">{{ item.content }}</span>
          </li>

          <li class="correct">
            <span>正确答案：{{ currentExam.subjectAnswer }}</span>
            <el-button class="finish" @click="testScores">交卷</el-button>
          </li>
        </ul>
      </div>
      <!--      考试信息-->
      <el-dialog
          title="考试信息"
          :visible.sync="showTips"
          :before-close="back"
      >
        <!-- 考试信息 -->
        <div class="exam-message">
          <p>考试名称：{{ scoreInfo.trainName }}</p>
          <p>
            考试时间：{{ scoreInfo.examinationTime }}分钟，{{
              scoreInfo.totalSubjectNum
            }}题
          </p>
          <p>
            合格标准：{{ scoreInfo.passingScore }}分及格（满分{{
              scoreInfo.scoreRule == 1 ? 10 : 100
            }}分）
          </p>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="back">退 出</el-button>
    <el-button type="primary" @click="start">开始考试</el-button>
  </span>
      </el-dialog>
      <!--      交卷信息-->
      <el-dialog
          title="交卷"
          :visible.sync="showFinish"
      >
        <div class="exam-message">
          <h2 v-if="isPass" class="title pass">考试及格</h2>
          <h2 v-else class="title not-pass">考试不及格</h2>

          <p>剩余时间：{{ countTime }}</p>
          <p>
            未答题数：{{ noFinishList.length }}
          </p>
          <p>
            答错题数：{{ allFalseList.length }}
          </p>
          <p>
            考试成绩：<span class="cf">{{ score }} </span> 分
          </p>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="showFinish=false">继续答题</el-button>
    <el-button type="primary" @click="linkExamState">现在交卷</el-button>
        </span>
      </el-dialog>
      <!--      最终考卷信息-->

    </div>
    <Footer/>
  </div>
</template>

<script>
import {
  getExamInfoByTrainId,
  getPaperId,
  getSubject,
  answer,
  getExamExpireTime,
  finishPaper,
} from "@/api/training";

export default {
  props: {
    id: String,
  },
  data() {
    return {
      //考前弹框信息
      scoreInfo: {},
      showTips: false,
      //倒计时
      countTime: null,
      isshowDT: false,
      //考卷id
      paperId: '',
      //考试题目
      currentExam: {},
      examList: [],
      allTureList: [],
      allFalseList: [],
      noFinishList: [],
      finishListId:[],
      answer: '',
      cIndex: 0, //选中第几题
      picked: '', //选择答案
      score: 0,
      //对答案
      parms: {
        isFinish: 0, //	是否完成(0否，1是)
        paperId: '', //	试卷id
        subjectId: "", // 题id
        score: 0, // 得分
        userAnswer: "", // 填写的答案
      },
      //交卷
      showFinish: false,
      isPass: false,
      totalScore: {},
      showEndScore: false
    }
  },
  mounted() {
    this.getExamInfoByTrainIds();
    // this.getPaperIds()
  },
  computed: {
    trueId() {
      let idList = []
      for (let i = 0; i < this.allTureList.length; i++) {
        idList.push(this.allTureList[i].id)
      }
      return idList
    },
    falseId() {
      let idList = []
      for (let i = 0; i < this.allFalseList.length; i++) {
        idList.push(this.allFalseList[i].id)
      }
      return idList
    },

  },
  methods: {
    filter(){
      const self = this
      self.allFalseList.map((item)=>{
        if(item.id==self.currentExam.id){
          self.picked = item.selected
        }
      })
    },
    back() {
      this.$router.back()
    },
    start() {
      this.getPaperIds()
      this.showTips = false
    },
    //选择答案
    pick(item) {
      this.answer = item.option
      const self = this
      self.$set(
          self.parms,
          "score",
          self.currentExam.subjectAnswer === item.option ? self.currentExam.fraction : 0
      );
      self.$set(self.parms, "userAnswer", item.option);
      self.$set(self.parms, "subjectId", self.currentExam.id);
      self.$set(self.parms, "isFinish", 1);
      self.$set(self.parms, "paperId", self.paperId);

      //判断是否已经做过这道题目
      if (!self.currentExam.userAnswer) {
        if (!self.isFinshPaper) {
          if (self.currentExam.subjectAnswer === item.option) {
            self.allTureList.push(self.currentExam)
            console.log('true')
          } else if (self.currentExam.sujectAnswer != item.option && item.option != 0) {
            self.allFalseList.push({id:self.currentExam.id,selected:item.option})
          }
        }
      }


      answer(self.parms).then((res) => {
        if (res.code === 200) {

        } else {
          self.$message(res.msg)
        }
      })

      self.finishListId.push(self.currentExam.id)

      let next = this.cIndex += 1
      if (next < this.examList.length) {
        this.currentExam = this.examList[next]
      }


    },
    //转跳看题目
    select(item, index) {
      this.cIndex = index
      this.currentExam = item
      this.answer = item.userAnswer
      this.filter()

    },
    // next() {
    //   let next = this.cIndex += 1
    //   this.currentExam = this.examList[next]
    // },
    // last() {
    //   let last = this.cIndex -= 1
    //   this.currentExam = this.examList[last]
    // },


    // 获取试卷题目
    getSubjects() {
      const self = this;
      let params = {
        trainid: self.id,
        paperId: self.paperId,
      };
      self.$store.commit("showLoading");
      getSubject(params).then((res) => {
        if (res.code === 200) {
          self.examList = res.data
          self.currentExam = self.examList[0]
          self.answer = self.currentExam.userAnswer != "" ? self.currentExam.userAnswer : 0
          if (self.currentExam.userAnswer != '') {
            self.examList.map((item) => {
              if (item.userAnswer === item.subjectAnswer) {
                self.allTureList.push(item)
              } else if (item.userAnswer == '') {
                // self.noFinishList.push(tItem);
                // 未做的题
              } else {
                self.allFalseList.push(item)
                self.allFalseList.push({id:item.id,selected:item.userAnswer})

              }
            })
          }
          this.noFinishList = self.examList.filter((item) => item.isFinish == 0)
        }
        self.$store.commit("hideLoading");
      });
    },

    // 获取考试时间
    getExamExpireTimes() {
      const self = this;
      getExamExpireTime({paperid: this.paperId}).then((res) => {
        if (res.code == 200) {
          self.countDown(res.data / 1000)
          setTimeout(() => {
            self.isshowDT = true;
          }, 10);
        } else {
          this.$message(res.msg);
        }
      });

    },
    countDown(time) {
      const self = this
      self._interval = setInterval(() => {
        if (time == 0) {
          self.$message('时间到，考试结束。')
          self.linkExamState()
          clearInterval(self._interval)
        } else {
          time--
          let hr = parseInt(time / 60 / 60 % 24)
          let min = parseInt(time / 60 % 60)
          let sec = parseInt(time % 60)

          hr = hr > 9 ? hr : '0' + hr
          min = min > 9 ? min : '0' + min
          sec = sec > 9 ? sec : '0' + sec

          self.countTime = `${hr}:${min}:${sec}`
        }
      }, 1000)
    },
    //试卷信息
    getExamInfoByTrainIds() {
      const self = this;
      let trainId = self.id;
      self.$store.commit("showLoading");
      self.showBtn = true;
      getExamInfoByTrainId({trainId}).then((res) => {
        if (res.code == 200) {
          self.scoreInfo = res.data;
          self.showTips = true;
        } else {
          self.$message(res.msg);
          setTimeout(() => {
            self.$router.push("/login");
          }, 3000);
        }
        self.$store.commit("hideLoading");
      });
    },
    // 获取试卷id
    getPaperIds() {
      const self = this;
      let trainId = self.id;
      getPaperId({trainId}).then((res) => {
        if (res.code == 200) {
          self.paperId = res.data.paperId;
          // self.parms.paperId = self.paperId;
          self.showBtn = false;
          self.getSubjects();
          self.getExamExpireTimes();
        }else if (res.code === -1) {
          if (res.msg == 2) {
            self.$message(res.msg);
            setTimeout(() => {
              self.$router.push('/myuser')
            }, 3000)

          } else {
            self.$message(res.msg);
            let crType = res.msg
            setTimeout(() => {
              self.$router.push({path:'/coachreferee',query:{crType}})
            }, 3000)
          }
        } else if(res.code===500){
          self.$message(res.msg);
          setTimeout(() => {
            self.$router.back()
          }, 3000);
        } else {
          self.$message(res.msg);
          setTimeout(() => {
            self.$router.push("/login");
          }, 3000);
        }
      });
    },

    // tips 提示展示 当前已做题信息
    testScores() {
      this.showFinish = true
      // 当前已做题的分数
      this.score = 0;
      this.allTureList.map((sItem) => {
        this.score += sItem.fraction;
      })

      setTimeout(() => {
        this.isPass =
            this.score > this.scoreInfo.passingScore ? true : false;
      }, 10);

    },

    // 倒计时结束交卷
    finish() {
      const self = this
      finishPaper({paperid: this.paperId}).then((res) => {
        if (res.code == 200) {
          this.totalScore = res.data;
          this.showEndScore = true;
          setTimeout(() => {
            this.$router.push(`/exam-record/${self.paperId}`);
          }, 3000);
        } else {
          this.$message(res.msg);
        }
      });
    },

    // 现在交卷
    linkExamState() {
      let params = {
        paperId: this.paperId,
        trainName: this.scoreInfo.trainName,
        trainId: this.id,
      };
      let stateInfo = JSON.stringify(params);
      this.$router.push({path: "/exam-state", query: {stateInfo}});
      // this.$router.push(`/TC-online-state/${this.paperId}`);
    },
  }
}
</script>

<style lang="scss" scoped>
.exam-online {
  width: 900px;
  margin: 20px auto;
  padding: 20px 30px;
  background-color: #f3f5f7;

  //标题
  .exam-nav {
    //width: 900px;
    box-shadow: 0 0 5px 1px rgb(26 26 26 / 10%);
    border-radius: 4px;
    margin: 18px auto;

    .examName {
      //padding-top: 6px;
      font-size: 18px;
      font-weight: 700;
      border-bottom: 1px solid #e4e4e4;
      height: 46px;
      display: flex;
      align-items: center;

      .block {
        height: 46px;
        width: 8px;
        background-color: #db261d;
        border-top-left-radius: 4px;
      }

      span {
        padding-left: 12px;
      }
    }

    .nav {
      padding: 8px 20px;

      .back {
        cursor: pointer;
      }
    }

  }

  //倒计时
  .countDown {
    //width: 900px;
    margin: 18px auto;
    box-shadow: 0 0 5px 1px rgb(26 26 26 / 10%);
    border-radius: 4px;
    height: 66px;
    display: flex;
    justify-content: center;
    align-items: center;

    .time {

      font-size: 14px;
    }
  }

  //题目总集
  .exam-list {
    margin: 18px auto;
    box-shadow: 0 0 5px 1px rgb(26 26 26 / 10%);
    border-radius: 4px;

    ol {
      display: flex;
      flex-wrap: wrap;
      padding: 12px 6px;

      li {
        border: 1px solid #ccc;
        border-radius: 50%;
        width: 40px;
        text-align: center;
        line-height: 40px;
        margin: 5px 1%;
        color: #999;
        cursor: pointer;

        &.onFalse {
          background-color: #f9e7e2;
          color: #f46e6a;
          border-color: #f9e7e2;
        }

        &.onTrue {
          background-color: #def0fa;
          color: #4bacef;
          border-color: #def0fa;
        }

        &.selected {
          border-color: #4bacef;
        }
      }
    }
  }

  //考试内容
  .exam-content {
    margin: 18px auto;
    box-shadow: 0 0 5px 1px rgb(26 26 26 / 10%);
    border-radius: 4px;
    padding: 20px;


    .exam-title {

    }

    .options {
      margin-left: 20px;
      padding-top: 12px;

      .option {
        margin-bottom: 12px;
        font-size: 15px;
        display: flex;
        align-items: center;
        cursor: pointer;

        &.disabled {
          //pointer-events: none;
          cursor: not-allowed;
        }

        &.finish {
          padding-right: 26px;
          display: flex;
          justify-content: right;
          margin-bottom: 0;

          ::v-deep .el-button {
            color: #fff;
            background-color: #1989fa;
            border: 1px solid #1989fa;
            border-radius: 25px;
            height: 32px;
            line-height: 7px;

            :hover {
              background-color: transparent;
            }
          }
        }

        .icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
          display: flex;
          justify-content: center;
          align-items: center;

          &.onTrue {
            background-color: #def0fa;
            color: #4bacef;
            border-color: #def0fa;
          }

          &.onFalse {
            background-color: #f9e7e2;
            color: #f46e6a;
            border-color: #f9e7e2;
          }
        }

        .content {
          padding-left: 12px;

          &.onTrue {

            color: #4bacef;

          }

          &.onFalse {

            color: #f46e6a;

          }

        }

      }

      .correct {
        margin-top: 10px;
        font-size: 14px;
        background-color: #e4e4e4;
        padding: 5px 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        ::v-deep .el-button {
          color: #fff;
          background-color: #1989fa;
          border: 1px solid #1989fa;
          border-radius: 25px;
          height: 32px;
          line-height: 7px;

          :hover {
            background-color: transparent;
          }
        }
      }
    }

    .finish {

    }
  }


  //考试信息弹框
  ::v-deep.el-dialog {
    border-radius: 25px;
    width: 456px;

    .el-dialog__header {
      border-bottom: 1px solid #e4e4e4;
    }

    .exam-message {
      .title {
        display: flex;
        justify-content: center;
        align-items: center;

        &.pass {
          color: #4bacef;
        }

        &.not-pass {
          color: #f46e6a;
        }
      }

      p {
        margin-bottom: 9px;

        .cf {
          font-size: 18px;
          color: #fb7f35;
        }
      }
    }

  }

  ::v-deep .el-dialog__body {
    padding: 12px 0;
    margin-left: -20px;
  }

  ::v-deep .el-dialog__footer {
    text-align: center;
  }

  ::v-deep .el-button {
    border-color: #db261d;
    color: #db261d;
    background-color: #fff;
  }


  ::v-deep .el-button--primary {
    background: #db261d;
    border-color: #db261d;
    color: #fff;
  }

}
</style>
