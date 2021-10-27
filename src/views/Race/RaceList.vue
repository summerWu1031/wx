<template>
  <div>
    <Nav/>
    <div class="raceList">
      <div class="topBanner">
        <router-link to="/" class="tabs">首页 ></router-link>
        <span @click="back" class="tabs">赛事报名信息 </span>
      </div>
      <div class="course-content">
        <ul class="course-list">
          <li class="list-item" v-for="(item,index) in list" :key="index" @click="golink(item.id)">
            <div class="item-img">
              <img :src="loadUrl(item.imgUrl)">
            </div>
            <p class="item-address">{{ item.address }}</p>
            <p class="item-time">报名：{{ item.applyBeginDate }} 至 {{ item.applyEndDate }}</p>
            <p class="item-time">比赛：{{ item.matchBeginDate }} 至 {{ item.matchEndDate }}</p>

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
import {queryMyJoinCompetitionList} from '@/api/user'
import {pagination} from "@/mixins/mixin";
import '@/assets/topBanner.scss'

export default {
  mixins: [pagination],
  data() {
    return {
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        sign: 'wx'
      },
      total: 0,
      list: []
    }
  },
  mounted() {
    this.init()
    console.log(this.total)
    console.log(this.list)
  },
  methods: {
    init() {
      const self = this
      queryMyJoinCompetitionList(this.queryParams).then((res) => {
        if (res.code == 200) {
          console.log(1)
          self.list = res.rows
          self.total = res.total
          console.log(2)
        } else {
          self.$message(res.msg)
        }
      })
    },
    golink(id){
      this.$router.push({path:'/race-list-detail',query:{id}})
    },
    back() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
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

      .item-address {
        height: 20px;
        text-indent: 0;
        line-height: 20px;
        margin-right: 2px;
        margin-bottom: 8px;
        padding: 0 8px;
        color: #999;
        font-size: 12px;
      }

      .item-time {
        height: 20px;
        text-indent: 0;
        line-height: 20px;
        margin-right: 2px;
        //margin-bottom: 5px;
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
