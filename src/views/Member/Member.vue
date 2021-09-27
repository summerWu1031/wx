<template>
  <div>
    <Nav/>
    <Nav2>会员风采</Nav2>
    <main>
      <div class="tabs">
        <el-tabs v-model="activeName" @tab-click="changeQuery">
          <el-tab-pane label="明星会员" name="0">
            <el-empty description="暂无数据" v-if="list.length==0"></el-empty>
            <ul v-else>
              <li v-for="(item,index) in list" :key="index">
                <router-link :to="{ path: '/member-detail/' + item.id }">
                  <img :src="loadUrl(item.logo)" alt="item.title">
                  <div class="title">{{ item.title }}</div>
                </router-link>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="个人会员" name="1">
            <el-empty description="暂无数据" v-if="list.length==0"></el-empty>
            <ul v-else>
              <li v-for="(item,index) in list" :key="index">
                <router-link :to="{ path:'/member-detail/'+item.id }">
                  <img :src="loadUrl(item.logo)" alt="item.title">
                  <div class="title">{{ item.title }}</div>
                </router-link>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="单位会员" name="2">
            <el-empty description="暂无数据" v-if="list.length==0"></el-empty>
            <ul v-else>
              <li v-for="(item,index) in list" :key="index">
                <router-link :to="{ path:'/member-detail/'+item.id }">
                  <img :src="loadUrl(item.logo)" alt="item.title">
                  <div class="title">{{ item.title }}</div>
                </router-link>
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>
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
    </main>
    <Footer/>
  </div>
</template>

<script lang="js">
import {querySysNetMemberSightList} from '@/api';
import {pagination} from '@/mixins/mixin'

export default {
  mixins: [pagination],
  data() {
    return {
      activeName: '0',
      list: [],
      queryParams: {
        memberType: 0,
        sign: 'wx',
        pageSize: 10,
        pageNum: 1,
      },
      total: 0,
      input: ''
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    changeQuery(tab) {
      this.queryParams.memberType = tab.name;
      this.init();
    },
    init() {
      const self = this;
      querySysNetMemberSightList(self.queryParams).then((res) => {
        if (res.code == 200) {
          self.list = res.rows;
          self.total = res.total;
        } else {
          self.$message(res.msg);
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
main {
  width: 1200px;
  margin: 20px auto;
  min-height: 455px;

  .tabs {

    ::v-deep .el-tab-pane {
      //display: flex;
      //flex-wrap: wrap;
      //justify-content: space-between;
      //margin-top: 8px;
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      //justify-content: space-between;
      margin-top: 8px;
    }

    li {
      margin-right: 14px;
      margin-bottom: 14px;
      position: relative;
      width: 386px;
      height: 250px;
      overflow: hidden;

      img {
        //width: 386px;
        //height: 250px;
        width: 100%;
        height: 100%;
        object-fit: cover;

      }

      .title {
        position: absolute;
        bottom: 0;
        left: 0;
        font-size: 14px;
        font-weight: 400;
        color: #FFFFFF;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgba(31, 40, 105, 0));
        width: 386px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        padding: 6px 12px 8px 12px;
        font-size: 14px;
        text-align: center;
      }
    }

    ::v-deep .el-tabs__active-bar {
      width: 60px;
      height: 2px;
      background: #DB261D;
    }

    ::v-deep .el-tabs__item {
      color: #333333;
    }

    ::v-deep .el-tabs__item.is-active {
      color: #DB261D;
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

  .jumper {
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

  .per, .next, .firstPage, .lastPage {
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