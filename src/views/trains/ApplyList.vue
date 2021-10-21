<template>
  <div>
    <Nav/>
    <Nav2>课程培训</Nav2>
    <!--    查询-->
    <div class="applyList">
      <div class="danSearch">
        <el-form :model="queryParams" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                 @keyup.enter.native="onSubmit">
          <el-form-item label="课程：" class="search-name">
            <el-input class="nameInput" v-model="queryParams.name" placeholder="请输入课程标题"></el-input>
          </el-form-item>
          <el-form-item class="search-btn">
            <el-button class="nameButton" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--    列表-->
      <div class="course-content">
        <ul class="course-list">
          <li class="list-item" v-for="(item,index) in certLists" :key="index" @click="golink(item.id)">
            <div class="item-img">
              <img :src="loadUrl(item.coverImg)">
            </div>
            <!--          <video class="item-img" v-else >-->
            <!--            <source  :src="loadUrl(item.videoUrl)" type="video/mp4" >-->
            <!--          </video>-->
            <div class="item-name">
              <el-tag type="info" class="bg1" size="mini"
                      v-if="isDuringDate(item.applyStartTime, item.applyEndTime) == -1">已结束
              </el-tag>
              <el-tag type="danger" class="bg2" size="mini"
                      v-else-if="isDuringDate(item.applyStartTime, item.applyEndTime) == 0">进行中
              </el-tag>
              <el-tag type="success" class="bg3" size="mini" v-else>筹备中</el-tag>
              <p class="item-title">{{ item.name }}</p>
            </div>
            <p class="item-time">{{ item.applyStartTime.slice(0, 10) }} 至 {{ item.applyEndTime.slice(0, 10) }}</p>
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
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import {getApplyTrainList,getApplyTrainDetail} from "@/api/training";
import {pagination} from '@/mixins/mixin'

export default {
  mixins: [pagination],
  data() {
    return {
      input:'',
      activeNames: ["1", "2"],
      isActive: 0,
      screeningStatus: ["国家级", "一级", "二级"],
      title: "",
      active: 0,
      scoreName: "",
      sign: "wx",
      certLists: [],
      showScore: false,
      // 查询
      // name: "",
      level: "",
      total: null,
      // 下拉刷新
      queryParams: {
        // 0 .待考试 1.已考试
        // examed: null,
        pageNum: 1,
        pageSize: 8,
        // 标题搜索
        name: '',
        // 查询类型（0.所有:课程，1.我的考试，2.收藏）
        // querytype: 0,
        // 培训类型(1.段位培训，2.教练员培训,3.裁判员培训,4.考评员培训)
        // trainType: 1,
        // trainLv: null,
      },
      loading: false,
      finished: false,
      refreshing: false,
      // 菜单类
      coursemenus: [
        {name: "段位考评", value: 1},
        {name: "教练员培训", value: 2},
        {name: "裁判员培训", value: 3},
        {name: "考评员培训", value: 4},
      ],
      cmOn: 1,
      coursemenus2: [
        {name: "待考试", value: 0},
        {name: "已考试", value: 1},
      ],
      cmOn2: 1,
    }
  },
  mounted() {
    if (!this.refreshing) {
      this.onRefresh();
    } else {
      console.log(1)
    }
  },
  methods: {
    init() {
      const self = this;
      // self.$set(self.queryParams, "pageNum", pageNum++);
      // self.$set(self.queryParams, "name", self.name);
      // self.$set(self.queryParams, "querytype", self.active);
      // self.$set(self.queryParams, "trainLv", self.level);
      self.certLists = []
      getApplyTrainList(self.queryParams).then((res) => {
        if (self.refreshing) {
          self.certLists = [];
          self.refreshing = false;
        }
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
          setTimeout(() => {
            self.$router.push(`/login`);
          }, 3000);
        }
      });
    },
    onSubmit() {
      this.onRefresh()
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.init();
    },
    golink(id) {
      this.$router.push(`/apply-detail/${id}`);
    },
  }
}
</script>

<style lang="scss" scoped>
.applyList {
  margin: 0 auto;
  width: 1200px;

  .danSearch {
    display: flex;
    height: 42px;
    //margin-bottom: 30px;
    margin-top: 22px;

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

  .course-content {
    width: 1200px;
    margin: 32px auto 98px auto;

    .course-list {
      display: flex;
      flex-wrap: wrap;
      margin-right: -24px;
      //margin-bottom: 20px;

      .list-item {
        width: 278px;
        height: 230px;
        margin: 0 24px 24px 0;
        background: #FFFFFF;
        box-shadow: 0 6px 10px 0 rgb(95 101 105 / 15%);
        border-radius: 8px;
        cursor: pointer;

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

        .item-name {
          display: flex;
          margin-top: 12px;
          padding-left: 4px;
          align-items: center;
          margin-bottom: 8px;

          .item-title {
            //height: 26px;
            //line-height: 20px;
            text-indent: 0;
            padding: 0 8px;
            //margin-bottom: 8px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }



        .item-time {
          height: 20px;
          text-indent: 0;
          line-height: 20px;
          margin-right: 2px;
          margin-bottom: 8px;
          padding: 0 8px;
          color: #999;
          font-size: 12px;
        }

        .item-price {
          height: 20px;
          text-indent: 0;
          line-height: 20px;
          margin-right: 2px;
          color: #F01414;
          padding: 0 8px;
          margin-bottom: 18px;
          font-weight: 700;
        }
      }
    }

    .empty {
      margin: 0 auto;
    }
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
