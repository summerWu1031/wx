<template>
  <div>
    <Nav/>
    <Nav2>段位查询</Nav2>
    <main>
      <div class="danSearch">
        <div class="name">
          <span class="nameTitle">姓名：</span>
          <el-input class="nameInput" v-model="name" placeholder="请输入姓名"></el-input>
        </div>
        <div class="id">
          <div class="idTitle">身份证：</div>
          <el-input class="idInput" v-model="id" placeholder="请输入身份证号码"></el-input>
        </div>
        <el-button class="nameButton" @click="onSubmit" >查询</el-button>
      </div>
      <div class="danDetail">
            <el-table
                :data="list"
                style="width: 100%">
              <el-table-column
                  prop="userName"
                  label="姓名"
                 >
              </el-table-column>
              <el-table-column
                  prop="sex"
                  label="性别"
                  >
              </el-table-column>
              <el-table-column
                  prop="identityCode"
                  label="出生年月"
                 >
              </el-table-column>
              <el-table-column
                  prop="boxingKind"
                  label="段位类别"
                  >
              </el-table-column>
              <el-table-column
                  prop="rankLevel"
                  label="段位级别"
                 >
              </el-table-column>
              <el-table-column
                  prop="examAddress"
                  label="考点"
                  >
              </el-table-column>
              <el-table-column
                  prop="ratifyDate"
                  label="发证日期"
                  >
              </el-table-column>
            </el-table>
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
      </div>

    </main>
    <Footer/>
  </div>
</template>

<script>
import { queryUserRank} from '@/api'
import {pagination} from '@/mixins/mixin'
export default {
  mixins:[pagination],
  data() {
    return {
      queryParams : {
        userName: '',
        identityCode:null,
        pageSize: 10,
        pageNum: 1,
      },
      list:[],
      name:'',
      id:null,
      total: 0,
      input:''
    }
  },

  mounted() {
    this.init()
    this.format()
  },
  methods: {
    init() {
      const self = this;
      if(self.queryParams.userName || self.queryParams.identityCode){
        queryUserRank(self.queryParams).then((res) => {
          if (res.code == 200 ) {
            self.list =  res.rows
            self.total = res.total
            this.format()
            console.log(self.queryParams.userName)
            console.log(self.list)
          } else {
            self.$message(res.msg);
          }
        });
      }
    },
    onSubmit() {
      this.queryParams.userName = this.name
      this.queryParams.identityCode = this.id
      this.init()
    },
    format(){
      for (let i = 0 ; i<this.list.length ; i++){
        this.list[i].identityCode=this.IdCard(this.list[i].identityCode,1)
       if(this.list[i].sex==1){
         this.list[i].sex='男'
       }else {
         this.list[i].sex='女'
       }
      }
    }
  },

}
</script>

<style lang="scss" scoped>
main{
  width: 1200px;
  margin: 20px auto;
  min-height: 455px;

  .danSearch{
    display: flex;
    height: 42px;
    margin-bottom: 30px;
    .name{
      display: flex;
      padding-right: 16px;
      .nameTitle{
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: start;
      }
      ::v-deep .el-input{
        width: 260px;
        display: flex;
        align-items: center;
      }
      //::v-deep .el-input__inner{
      //  height: 32px;
      //}
    }
    .id{
      display: flex;
      padding-right: 16px;
      .idTitle{
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: start;
      }
      ::v-deep .el-input{
        width: 260px;
        display: flex;
        align-items: center;
      }
    }
    ::v-deep .el-button{
      height: 40px;
      align-items: center;
      background-color: #DB261D;
      color: #fff;
    }
  }
  .danDetail{
    width: 1200px;
    margin-bottom:60px;
    ::v-deep.el-table th{
      width: 60px;
    }
  }
  ::v-deep .el-table th>.cell{
    font-weight: normal;
  }
}
</style>
<style lang="scss" scoped>
.page {
  display:flex;
  border:1px solid #dddddd;
  float: right;
  //margin-right: 20px;
  margin-top:20px;
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
  .jumper,.per,.next,.firstPage,.lastPage{
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