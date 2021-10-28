<template>
  <div class="trains">
    <Nav/>
    <div class="trains-main">
      <div class="filter">
        <div class="course">
<!--          <div class="danSearch">-->
<!--            <el-form :model="queryParams" ref="ruleForm" label-width="100px" class="demo-ruleForm"-->
<!--                     @keyup.enter.native="onSubmit">-->
<!--              <el-form-item label="课程：" class="search-name">-->
<!--                <el-input class="nameInput" v-model="queryParams.name" placeholder="请输入课程标题"></el-input>-->
<!--              </el-form-item>-->
<!--              <el-form-item class="search-btn">-->
<!--                <el-button class="nameButton" @click="onSubmit">查询</el-button>-->
<!--              </el-form-item>-->
<!--            </el-form>-->
<!--          </div>-->
          <div class="tabsWrapper">
            <div class="tabs">
              <ul class="navUl">
                <li class="item " v-for="(item,index) in tabs" :key="index" @click="selectTab(item.value)"
                    :class="{selected:selected==item.value}">
                  <span>{{ item.name }}</span>
                </li>
              </ul>
            </div>
<!--            <div class="search">-->
<!--              <el-input-->
<!--                  placeholder="请输入内容"-->
<!--                  v-model="trainName"-->
<!--                  clearable-->
<!--                  @keyup.enter="onSearchScoreName"-->
<!--              >-->
<!--              </el-input>-->
<!--            </div>-->
          </div>
          <div class="menu">
            <ul class="items" v-show="selected==0">
              <li class="item "  v-for="(item,index) in coursemenus" :key="index" @click="onCMclass('course',item.value)"
                  :class="{on:cmOn==item.value}">
                <span>{{ item.name }}</span>
              </li>
            </ul>
            <ul class="items" v-show="selected==1">
              <li class="item " v-for="(item,index) in coursemenus2" :key="index" @click="onCMclass('test',item.value)"
                  :class="{on:cmOn2==item.value}">
                <span>{{ item.name }}</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
      <div class="course-content" >
        <ul class="course-list" >
          <li class="list-item" v-for="(item,index) in certLists" :key="index" @click="jump(item.id)">
            <div class="item-img">
              <img :src="loadUrl(item.imgUrl)">
            </div>
            <!--          <video class="item-img" v-else >-->
            <!--            <source  :src="loadUrl(item.videoUrl)" type="video/mp4" >-->
            <!--          </video>-->
            <p class="item-title">{{ item.trainName }}</p>
            <p class="item-time">{{ item.beginTime }} 至 {{ item.endTime }}</p>
          </li>
        </ul>
        <div class="page" v-if="total">
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
        <el-empty v-else description="暂无内容"></el-empty>
      </div>

    </div>
    <Footer/>
  </div>
</template>

<script>
import {getTrainList} from '@/api/training'
import {pagination} from '@/mixins/mixin'
import '@/assets/courseContent.scss'
import "@/assets/tabs.scss"
export default {
  mixins: [pagination],
  // props:['aId'],
  data() {
    return {
      applyName:this.$route.query.name,
      certLists: [],
      // 查询
      trainName: "",
      level: "",
      total: 0,
      queryParams: {
        // 0 .待考试 1.已考试
        examed: null,
        pageNum: 1,
        pageSize: 8,
        // 标题搜索
        trainName: this.trainName,
        // 查询类型（0.所有:课程，1.我的考试，2.收藏）
        querytype: 0,
        // 培训类型(1.段位培训，2.教练员培训,3.裁判员培训,4.考评员培训)
        trainType: 1,
        trainLv: null,
        applyId: this.$route.query.aId,
      },
      loading: false,
      finished: false,
      refreshing: false,
      // 菜单类
      tabs: [
        {name: '培训', value: 0},
        {name: '我的考试', value: 1},
      ],
      selected: 0,
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
      cmOn2: 0,
    }

  },
  mounted() {
    this.init()
  },
  // computed:{
  //   aId(){
  //     return this.$route.query.aId
  //   }
  // },
  methods: {
    selectTab(value) {
      this.selected = value
      if(value==0){
        this.$set(this.queryParams, "trainType", this.cmOn);
        this.$set(this.queryParams, "examed", null);
        this.$set(this.queryParams, "querytype", value);
      }else if(value==1){
        this.$set(this.queryParams, "trainType", null);
        this.$set(this.queryParams, "examed", this.cmOn2);
        this.$set(this.queryParams, "querytype", value);
      }

      this.init()
    },
    onCMclass(type, index) {
      if (type == 'course') {
        this.cmOn = index;
        this.$set(this.queryParams, "trainType", this.cmOn);
        this.$set(this.queryParams, "examed", null);
      } else if (type == 'test') {
        this.cmOn2 = index;
        this.$set(this.queryParams, "trainType", null);
        this.$set(this.queryParams, "examed", this.cmOn2);
      }
      this.refreshing = true;
      this.init();
    },
    jump(id) {
      this.$router.push({name: 'trainsDetail', params: {id,name:this.applyName}})
    },
    init() {
      const self = this;
      self.certLists = []
      getTrainList(self.queryParams).then((res) => {
        if (res.code == 200) {
          self.certLists = res.data;
          self.total = res.total;
        } else {
          self.$message(res.msg);
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.trains {
  .trains-main {
    margin-bottom: 80px;

    .filter {
      width: 1200px;
      margin: 0 auto;
      margin-top: 24px;

      .course {
        display: flex;
        flex-wrap: wrap;
        box-shadow: rgb(95 101 105 / 0%) 0px 12px 20px 0px;
        height: 32px;
        background: transparent;
        font-size: 14px;
        //.danSearch {
        //  display: flex;
        //  height: 42px;
        //  //margin-bottom: 30px;
        //  margin-top: 22px;
        //
        //  ::v-deep .el-form {
        //    display: flex;
        //    flex-wrap: nowrap;
        //    margin-left: -49px;
        //  }
        //
        //  ::v-deep .el-input {
        //    width: 260px;
        //    display: flex;
        //    align-items: center;
        //  }
        //
        //  ::v-deep .el-form-item__label {
        //    padding-right: 4px;
        //  }
        //
        //  .search-btn {
        //    margin-left: -86px;
        //  }
        //
        //  .search-level {
        //    margin-left: -32px;
        //  }
        //
        //  ::v-deep .el-button {
        //    height: 40px;
        //    align-items: center;
        //    background-color: #DB261D;
        //    color: #fff;
        //
        //    &.reset {
        //      background-color: transparent;
        //      color: #DB261D;
        //      border: 1px solid #DB261D;
        //    }
        //  }
        //}
        .tabsWrapper {
          display: flex;
          width: 1200px;
          padding-bottom: 12px;


          .search{
            ::v-deep .el-input__inner {
              border-radius: 50px;
              height: 34px;
              line-height: 34px;
            }
          }
        }
        //.tabs{
        //
        //  .navUl {
        //    width: 1200px;
        //    border-bottom: 1px solid #d7d7d7 ;
        //    display: flex;
        //    //justify-content: space-between;
        //    > li {
        //      text-align: center;
        //      width: 100px;
        //      height: 40px;
        //      font-size: 14px;
        //      padding: 10px 2px;
        //      &.selected {
        //        border-bottom: 1px #DB261D solid;
        //        color: #DB261D;
        //
        //      }
        //
        //
        //    }
        //
        //    .dropdownWrapper {
        //      width: 100px;
        //      a {
        //        color: #8e8e8e;
        //      }
        //
        //      ::v-deep .ivu-dropdown-rel {
        //        width: 100px;
        //        margin-left: -20px !important;
        //        box-sizing: border-box;
        //      }
        //
        //      ::v-deep .ivu-dropdown-menu {
        //        position: absolute;
        //        background-color: #fff;
        //        width: 146px;
        //        left: -84px;
        //        border-radius: 4px;
        //        outline: none;
        //        box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
        //        -webkit-transform: translate3d(0, 0, 0);
        //      }
        //
        //      ::v-deep .ivu-dropdown-item {
        //        font-size: 14px !important;
        //        padding: 10px 16px;
        //
        //        :hover {
        //          color: #DB261D;
        //        }
        //      }
        //    }
        //
        //  }
        //}


        .menu {
          .items {
            .item {
              float: left;
              padding: 0 8px;
              margin: 0 12px 8px 0;
              border-radius: 6px;
              line-height: 32px;
              cursor: pointer;
              font-size: 13px;
              :hover {
                color: #DB261D;
              }

              &.on {
                background: rgba(242, 13, 13, .06);
                color: #DB261D;
              }
            }
          }
        }


      }
    }

    //.course-content {
    //  width: 1200px;
    //  margin: 68px auto 0 auto;
    //
    //  .course-list {
    //    display: flex;
    //    flex-wrap: wrap;
    //    margin-right: -24px;
    //    margin-bottom: 20px;
    //
    //    .list-item {
    //      width: 278px;
    //      height: 210px;
    //      margin: 0 24px 24px 0;
    //      background: #FFFFFF;
    //      box-shadow: 0 6px 10px 0 rgb(95 101 105 / 15%);
    //      border-radius: 8px;
    //      cursor: pointer;
    //
    //      .item-img {
    //        height: 152px;
    //        margin-bottom: 8px;
    //
    //        img {
    //          width: 100%;
    //          height: 100%;
    //          object-fit: cover;
    //          border-radius: 8px 8px 0 0;
    //        }
    //
    //        video {
    //          width: 100%;
    //          height: 100%;
    //          object-fit: cover;
    //          border-radius: 8px 8px 0 0;
    //        }
    //      }
    //
    //      .item-title {
    //        height: 26px;
    //        line-height: 20px;
    //        text-indent: 0;
    //        padding: 0 8px;
    //        //margin-bottom: 8px;
    //        white-space: nowrap;
    //        overflow: hidden;
    //        text-overflow: ellipsis;
    //      }
    //
    //      .item-time {
    //        height: 20px;
    //        text-indent: 0;
    //        line-height: 20px;
    //        margin-right: 2px;
    //        margin-bottom: 8px;
    //        padding: 0 8px;
    //        color: #999;
    //        font-size: 12px;
    //      }
    //
    //      .item-price {
    //        height: 20px;
    //        text-indent: 0;
    //        line-height: 20px;
    //        margin-right: 2px;
    //        color: #F01414;
    //        padding: 0 8px;
    //        margin-bottom: 18px;
    //        font-weight: 700;
    //      }
    //    }
    //  }
    //}
  }

}
</style>
<style lang="scss" scoped>
.page {
  display: flex;
  border: 1px solid #dddddd;
  float: right;
  margin-right: 20px;

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
