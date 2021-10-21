<template>
  <div>
    <Nav/>
    <!--    考试-->
    <div class="record" v-if="sType==1">
      <!--      标题+导航-->
      <div class="exam-nav">
        <div class="nav" @click="back">
          < 返回培训
        </div>
        <h2>考试详情</h2>
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
        <!--        已经答题-->
        <ul class="options">
          <li class="option disabled" v-for="(item,index) in  currentExam.optionList"
              :key="index"><!--@click="pick(item)" :class="{ disabled:currentExam.userAnswer}"-->
            <!--            题目是正确的-->
            <div class="icon" v-if="trueId.indexOf(currentExam.id)>=0"
                 :class="{
                onTrue: currentExam.subjectAnswer==item.option,
              }"> <!-- :class="{on:item.option==answer}" -->
              <span v-if="currentExam.subjectAnswer==item.option"><i class="el-icon-check"></i></span>
              <span v-else>{{ item.option }}</span>
            </div>
            <!--题目是错误的-->
            <div class="icon" v-else
                 :class="{
                onTrue: currentExam.subjectAnswer==item.option,
                onFalse: currentExam.userAnswer==item.option
              }"> <!-- :class="{on:item.option==answer}" -->
              <span v-if="currentExam.subjectAnswer==item.option"><i class="el-icon-check"></i></span>
              <span v-else-if="currentExam.userAnswer==item.option"><i class="el-icon-close"></i></span>
              <span v-else>{{ item.option }}</span>
            </div>
            <span class="content" :class="{
                onTrue: currentExam.subjectAnswer==item.option ,
                onFalse: currentExam.userAnswer==item.option && falseId.indexOf(currentExam.id)>=0
              }">{{ item.content }}</span>
          </li>

          <li class="correct">
            <span>正确答案：{{ currentExam.subjectAnswer }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="video" v-else>
      <!--      标题+导航-->
      <div class="exam-nav">
        <div class="nav" @click="back">
          < 返回培训
        </div>
        <h2>考试详情</h2>
      </div>

      <div class="checkVideo">
        <img :src="loadUrl(detail.coverUrl) "  alt=""/>
        <a class="btn" :href="loadUrl(detail.videoUrl)" target="_blank">查看考试视频记录</a>
      </div>

<!--      <el-dialog  :visible.sync="videoShow" width="100%">-->
<!--        <video controls >-->
<!--          <source :src="loadUrl(detail.videoUrl)" type="video/mp4">-->
<!--        </video>-->
<!--      </el-dialog>-->
    </div>
    <Footer/>
  </div>
</template>

<script>
import {getPaperInfoByPaperId} from "@/api/training";

export default {
  props: {
    paperid: String,
  },
  data() {
    return {
      sType: 1, // 考试类型（1.答题，2.视频）
      //视频
      detail: {},
      videoShow:false,
      //考试题目
      currentExam: {},
      examList: [],
      allTureList: [],
      allFalseList: [],
      noFinishList: [],
      finishListId: [],
      answer: '',
      cIndex: 0, //选中第几题
      score: 0,
    }
  },
  mounted() {
    this.getPaperInfoByPaperIds(this.paperid);
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
    getPaperInfoByPaperIds(paperId) {
      const self = this;
      // type 考试类型（1.答题，2.视频）
      getPaperInfoByPaperId({paperId}).then((res) => {
        if (res.code == 200) {
          self.sType = res.data.type;
          if (self.sType == 1) {
            self.examList = res.data.orgWxTrainPapers;
            self.currentExam = self.examList[0];
            self.answer =
                self.currentExam.userAnswer != "" ? self.currentExam.userAnswer : 0;
            // self.total = self.examList.length;
            if (self.currentExam.userAnswer != '') {
              self.examList.map((item) => {
                if (item.userAnswer === item.subjectAnswer) {
                  self.allTureList.push(item)
                } else if (item.userAnswer == '') {
                  // self.noFinishList.push(tItem);
                  // 未做的题
                } else {
                  self.allFalseList.push(item)
                }
              })
            }
          } else {
            self.detail = res.data.orgWxTrainAssesses;
          }
        } else {
          self.$message(res.msg);
        }
      });
    },
    //转跳看题目
    select(item, index) {
      this.cIndex = index
      this.currentExam = item
      this.answer = item.userAnswer
    },
    back() {
      this.$router.back()
    },
  }
}
</script>

<style lang="scss" scoped>
.record, .video {
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
    display: flex;
    align-items: center;

    h2 {
      margin-bottom: 0;
      font-weight: 500;
      color: #323233;
      font-size: 16px;
      margin-left: 296px;
    }

    .nav {
      float: left;
      cursor: pointer;
      padding: 12px 10px;
      font-size: 13px;
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
  }

  .checkVideo {
    position: relative;
    width: 840px;
    height: 400px;
    img{
      width: 100%;
      height: 100%;
      object-fit:cover;

    }
    .btn {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      border: 1px solid #fff;
      color: #fff;
      padding: 16px;
      font-size: 14px;
      cursor: pointer;
    }
  }

  video {
    width: 800px;
    max-height: 800px;
  }
}

</style>
