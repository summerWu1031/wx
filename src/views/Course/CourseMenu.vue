<template>
  <div class="trains">
    <Nav/>
    <div class="trains-main">
      <div class="filter">
        <div class="course">
          <span class="name">科目：</span>
          <ul class="items">
            <li class="item " v-for="(item,index) in tab" :key="index" @click="select(item.type)"
                :class="{on:selected==item.type}">
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="course-content">
        <ul class="course-list" v-if="certLists.length>0">
          <li class="list-item" v-for="(item,index) in certLists" :key="index" @click="golink(item.id)">
            <div class="item-img">
              <img :src="loadUrl(item.coverImg)">
            </div>
            <!--          <video class="item-img" v-else >-->
            <!--            <source  :src="loadUrl(item.videoUrl)" type="video/mp4" >-->
            <!--          </video>-->
            <p class="item-title">{{ item.name }}</p>
            <p class="item-time">{{ item.applyStartTime.slice(0, 10) }} 至 {{ item.applyEndTime.slice(0, 10) }}</p>
            <p class="item-price" v-show="item.needPay==1">￥{{item.price}}</p>
            <el-tag type="success" size="mini" v-show="item.needPay==0" class="bg3">免费</el-tag>
          </li>
        </ul>
        <el-empty v-else description="暂无内容"></el-empty>
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
import {getApplyTrainList} from '@/api/training'

import {pagination} from '@/mixins/mixin'

export default {
  mixins: [pagination],
  data() {
    return {
      tab: [
        {name: '教学服务', type: 1},
        // {name: '培训', type: 2},
      ],
      selected: 1,
      certLists: [],
      queryParams: {
        pageNum: 1,
        pageSize: 8,
        name: '',
        type:1 //type 类型 1.教学服务 2.培训
      },
      input: '',
      total:0
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    select(type) {
      this.selected = type
      this.queryParams.type = type
      this.init()
    },
    golink(id) {
      this.$router.push(`/course-detail/${id}`);
    },
    init() {
      const self = this;
      self.certLists = [];
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
        box-shadow: rgb(95 101 105 / 0%) 0px 12px 20px 0px;
        height: 32px;
        background: transparent;
        font-size: 14px;

        .items {
          .item {
            float: left;
            padding: 0 8px;
            margin: 0 12px 8px 0;
            border-radius: 6px;
            line-height: 32px;
            cursor: pointer;

            :hover {
              color: #DB261D;
            }

            &.on {
              background: rgba(242, 13, 13, .06);
              color: #DB261D;
            }
          }
        }

        .name {
          width: 3em;
          margin-right: 6px;
          font-weight: 700;
          line-height: 32px;
        }
      }
    }

    .course-content {
      width: 1200px;
      margin: 30px auto 0 auto;

      .course-list {
        display: flex;
        flex-wrap: wrap;
        margin-right: -24px;
        margin-bottom: 20px;

        .list-item {
          width: 278px;
          height: 240px;
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

          .item-title {
            height: 26px;
            line-height: 20px;
            text-indent: 0;
            padding: 0 8px;
            //margin-bottom: 8px;
            white-space:nowrap;
            overflow:hidden;
            text-overflow:ellipsis;
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
          .bg3{
            margin-left: 6px;
          }
        }
      }
    }
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
