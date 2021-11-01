<template>
  <div>
    <Nav/>
    <div class="myCourse">
      <div class="tabs">
        <ul class="navUl">
          <li class="item " v-for="(item,index) in tabs" :key="index" @click="selectTab(index)"
              :class="{selected:selected==index}">
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>

      <div class="course-content">
        <ul class="course-list">
          <li class="list-item" v-for="(item,index) in list" :key="index" @click="golink(item.id,item.type)">
            <div class="item-img">
              <img :src="loadUrl(item.coverImg)">
            </div>
            <p class="item-title">{{ item.name }}</p>
            <p class="item-time">{{ item.trainStartTime }} 至 {{ item.trainEndTime }}</p>
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
import '@/assets/courseContent.scss'
import "@/assets/navUl.scss"
import {myCourse} from '@/api/training'
import {pagination} from "@/mixins/mixin";

export default {
  mixins: [pagination],
  data() {
    return {
      tabs: ['免费课程', '付费课程'],
      selected: 0,
      queryParams: {
        needPay: 0,  //0.无需支付 1.需要支付
        pageNum: 1,
        pageSize: 8
      },
      list: [],
      total: 0,
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      myCourse(this.queryParams).then((res) => {
        if (res.code === 200) {
          this.list = res.data
          this.total = res.total
        } else {
          this.$message(res.msg)
        }
      })
    },
    selectTab(index) {
      this.selected = index
      this.queryParams.needPay = index
      this.init()
    },
    golink(id,type) {
      //type 类型 1.教学服务 2.培训
      if(type==1){
        this.$router.push(`/course-detail/${id}`);
      }else if(type==2){
        this.$router.push(`/apply-detail/${id}`);

      }

    }
  }
}
</script>

<style lang="scss" scoped>

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

