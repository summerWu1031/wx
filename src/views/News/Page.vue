<template>
  <div class="page">
    <div class="pageTotal">共<span>{{total}}</span>条</div>
    <div  @click="firstPage" class="firstPage">首页</div>
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
</template>

<script>
import {getNoticeList} from "@/api";

export default {
  props:['type'],
  data() {
    return {
      queryParams : {
        noticeClass: this.type,
        sign:"wx",
        pageSize: 10,
        pageNum: 1,
      },
      news: [],
      total: 0,
      input:''

    };
  },
  mounted() {
    this.init();
  },
  methods:{
    handleCurrentChange(val) {
      this.queryParams.pageNum = val;
      this.init();
    },
    handleSizeChange(val) {
      this.queryParams.pageSize = val;
      this.init();
    },
    pervious() {
      this.$refs.pageGroup.prev()
    },
    next() {
      this.$refs.pageGroup.next()
    },
    firstPage(){
      this.handleCurrentChange(1)
    },
    lastPage(){
      let last = Math.ceil(this.total/10)
      this.handleCurrentChange(last)
    },
    jumper(){
      let jump =parseInt(this.input)
      console.log(jump)
      this.handleCurrentChange(jump)
    },
    init() {
      const self = this;
      getNoticeList(self.queryParams).then((res) => {
        if (res.code == 200) {
          self.news = res.rows;
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
.page {
  display:flex;
  border:1px solid #dddddd;
  float: right;
  margin-right: 20px;
  ::v-deep.el-input{
    width: 40px;
    padding: 0;
    border: none;
  }
  ::v-deep .el-input__inner{
    border-radius: 0;
    padding: 0 6px;
  }
  .pageTotal{
    border-right: 1px solid #dddddd;
    padding: 6px 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    &:hover{
      background-color: #fff;
    }
  }
  .jumper{
    padding: 6px 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    cursor: pointer;
    &:hover{
      background-color: #fff;
    }
  }
  .per,.next,.firstPage,.lastPage{
    border-right: 1px solid #dddddd;
    padding: 6px 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    cursor: pointer;
    &:hover{
      background-color: #fff;
    }
  }
  ::v-deep .el-pagination{
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