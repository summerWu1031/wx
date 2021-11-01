<template>
  <div>
    <Nav/>
    <Nav2>裁判打分</Nav2>
    <div class="applyList">
      <!--    查询-->
      <div class="danSearch">
        <el-form :model="queryParams" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                 @keyup.enter.native="onSubmit">
          <el-form-item label="课程：" class="search-name">
            <el-input class="nameInput" v-model="queryParams.scoreName" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item class="search-btn">
            <el-button class="nameButton" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="score-bar">
        <div class="tab" @click="select(1)" :class="{on:active==1}">待打分（{{ scoredNum.NotScored }}）</div>
        <div class="tab" @click="select(2)" :class="{on:active==2}">已打分（{{ scoredNum.Scored }}）</div>
      </div>
      <div class="course-content">
        <ul class="course-list">
          <li class="list-item" v-for="(item,index) in certLists" :key="index" @click="golink(item)">
            <div class="item-img">
              <img :src="loadUrl(item.coverUrl)">
            </div>
            <p class="item-title"> {{ item.trainName }}</p>
            <p class="item-time">上传时间：{{ item.uploadTime }}</p>
            <p class="item-time">
              培训类型：{{
                item.trainType == 1
                    ? "段位考评"
                    : item.trainType == 2
                    ? "教练员培训"
                    : item.trainType == 3
                        ? "裁判员培训"
                        : "考评员培训"
              }}
            </p>
            <el-button class="btn" v-if="active==1" >打分</el-button>
            <el-button class="btn" v-else @click="getscores(item)" @click.stop="">查看</el-button>

          </li>
          <el-empty class="empty"
                    v-if="total == 0"
                    description="未找到相关信息"
          />
        </ul>

        <div class="page">
          <div class="pageTotal">共<span>{{ total }}</span>条</div>
          <div @click="firstPage" class="firstPage">首页</div>
          <div @click="pervious" class="per">上一页</div>
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="queryParams.pageNum"
              :page-sizes="[10, 20]"
              :page-size="queryParams.pageSize"
              layout=" pager"
              background
              :total="total"
              ref="pageGroup"
          >
          </el-pagination>
          <div @click="next" class="next">下一页</div>
          <div @click="lastPage" class="lastPage">末页</div>
          <!--          <input class="jumperInput" type="text" value="" ref="jumperInput">-->
          <el-input v-model="input" type="text" ref="jumper"></el-input>
          <div @click="jumper()" class="jumper">
            跳转
          </div>
        </div>

        <el-dialog :visible.sync="showScore" title="成绩">
          <p class="item-time">考试名称：{{scoresTitle}}</p>
          <p class="item-time" >考试成绩：<span class="item-score">{{ scores.assessScore }} 分</span></p>
        </el-dialog>

      </div>
    </div>


    <Footer/>
  </div>
</template>

<script>
import {refereeList, reffgetscore, reffgetcount} from "@/api/training";
import {pagination} from '@/mixins/mixin'

export default {
  mixins: [pagination],
  data() {
    return {
      crType:null,//判断裁判还是教练
      // input: '',
      active: 1,
      // scoreName: "",
      sign: "wx",
      certLists: [],
      showScore: false,
      // 查询
      total: null,
      // 下拉刷新
      queryParams: {
        pageNum: 1,
        pageSize: 8,
        scoreName: '',
        querytype: this.active,
        // refereeId: "",  //替换成用户的裁判id
      },
      loading: false,
      scores: {},
      scoresTitle: "",
      scoredNum: {},
    }
  },
  created() {
    this.crType = this.$route.query.crType
  },
  mounted() {
    this.getReffgetcount();
    this.init()
  },
  methods: {
    getReffgetcount() {
      this.$store.commit("showLoading");
      reffgetcount().then((res) => {
        if (res.code == 200) {
          this.scoredNum = res.data;
        } else {
          this.$message(res.msg);
        }
        this.$store.commit("hideLoading");
      });
    },

    init() {
      const self = this
      self.$set(self.queryParams, "pageNum", self.queryParams.pageNum);
      self.$set(self.queryParams, "scoreName", self.queryParams.scoreName);
      self.$set(self.queryParams, "querytype", self.active);
      self.certLists = []
      refereeList(self.queryParams).then((res) => {

        if (res.code == 200) {
          self.total = res.total || 0;
          if (res.data.length == 0) {
            self.finished = true;
            return;
          }
          for (let i = 0; i < res.data.length; i++) {
            self.certLists.push(res.data[i]);
          }
          self.loading = false;
          if (self.certLists.length >= res.total) {
            self.finished = true;
          }
        } else {
          self.$message(res.msg);
        }
      });

    },
    onSubmit() {
      this.init()
    },
    select(type){
      this.active=type
      this.init()
    },
    golink(item){
      let _detail = JSON.stringify(item);
      let scored = this.active
      this.$router.push(
          {
            path:'/rc-score-detail',
            query:{
              detail: _detail,
              scored
            }
          }
      )
    },
    getscores(item) {
      this.scoresTitle = item.trainName;
      reffgetscore({ id: item.id }).then((res) => {
        if (res.code == 200) {
          this.showScore = true;
          this.scores = res.data;
        } else {
          this.$message(res.msg);
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.applyList {
  margin: 0 auto;
  width: 1200px;
  position: relative;

  .danSearch {
    display: flex;
    height: 42px;
    margin-top: 22px;
    position: absolute;
    top: -8px;
    right: 16px;


    ::v-deep .el-form {
      display: flex;
      flex-wrap: nowrap;
      margin-left: -49px;
    }

    ::v-deep .el-input {
      width: 260px;
      display: flex;
      align-items: center;
    }

    ::v-deep .el-form-item__label {
      padding-right: 4px;
    }

    .search-btn {
      margin-left: -86px;
    }

    .search-level {
      margin-left: -32px;
    }

    ::v-deep .el-button {
      height: 40px;
      align-items: center;
      background-color: #DB261D;
      color: #fff;

      &.reset {
        background-color: transparent;
        color: #DB261D;
        border: 1px solid #DB261D;
      }
    }
  }

  .score-bar {
    display: inline-flex;
    margin-top: 16px;
    cursor: pointer;
    .tab {
      width: 86px;
      height: 40px;
      font-size: 14px;
      margin-right: 40px;
      display: flex;
      justify-content: center;
      align-items: center;

      &.on {
        border-bottom: 2px solid #db261d;
      }
    }
  }

  .course-content {
    width: 1200px;
    margin: 26px auto 98px auto;

    .course-list {
      display: flex;
      flex-wrap: wrap;
      margin-right: -24px;
      //margin-bottom: 20px;

      .list-item {
        width: 278px;
        height: 236px;
        margin: 0 24px 24px 0;
        background: #FFFFFF;
        box-shadow: 0 6px 10px 0 rgb(95 101 105 / 15%);
        border-radius: 8px;
        cursor: pointer;
        position: relative;

        .item-img {
          height: 152px;
          margin-bottom: 8px;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 8px 8px 0 0;
          }

          video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 8px 8px 0 0;
          }
        }

        .item-title {
          text-indent: 0;
          padding: 0 8px;
          //margin-bottom: 4px;

        }

        .item-time {
          height: 20px;
          text-indent: 0;
          line-height: 20px;
          margin-right: 2px;
          padding: 2px 8px;
          color: #999;
          font-size: 12px;
          margin-bottom: 0;
        }

        .btn{
          background: #fff;
          color: #db261d;
          border: 1px solid #db261d;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 500;
          padding: 8px 14px;
          position: absolute;
          bottom: 8px;
          right: 10px;
        }

      }
    }

    .empty {
      margin: 0 auto;
      p{
        text-indent: 0;
      }
    }
  }

  //信息弹框
  .el-dialog{
    p {
      font-size: 14px;
      padding: 10px 0;
      color: #666;
      //text-indent: 4px;
    }

    .item-score {
      color: #f46e6a;
      font-size: 16px;

    }
  }
  ::v-deep.el-dialog {
    border-radius: 16px;
    width: 456px;

    .el-dialog__header {
      border-bottom: 1px solid #e4e4e4;
    }


  }
  ::v-deep .el-dialog__body {
    padding: 12px 0;
    margin-left: -20px;
  }
}

</style>
<style lang="scss" scoped>
.page {
  display: flex;
  border: 1px solid #dddddd;
  float: right;
  //margin-right: 20px;
  margin-top: 20px;

  ::v-deep.el-input {
    width: 40px;
    padding: 0;
    border: none;
  }

  ::v-deep .el-input__inner {
    border-radius: 0;
    padding: 0 6px;
  }

  .pageTotal {
    border-right: 1px solid #dddddd;
    padding: 6px 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;

    &:hover {
      background-color: #fff;
    }
  }

  .jumper, .per, .next, .firstPage, .lastPage {
    border-right: 1px solid #dddddd;
    padding: 6px 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    cursor: pointer;

    &:hover {
      background-color: #fff;
    }
  }

  ::v-deep .el-pagination {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #DB261D;
    color: #fff;
  }

}


</style>
