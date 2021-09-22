<template>
  <div>
    <Nav/>
    <Nav2>
      <span v-if="queryParams.type=='0'">教练列表</span>
      <span v-else>裁判列表</span>
    </Nav2>
    <main>
      <div class="danSearch">
        <div class="name">
          <span class="nameTitle">姓名：</span>
          <el-input class="nameInput" v-model="userName" placeholder="请输入姓名"></el-input>
        </div>
        <div class="id">
          <div class="idTitle">等级：</div>
          <el-select v-model="level" placeholder="请选择等级">
            <el-option
                v-for="item in levelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
        <el-button class="nameButton" @click="onSubmit">查询</el-button>
        <el-button @click="resetForm()" class="reset">重置</el-button>
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
              prop="province"
              label="地区"
              width="180"
          >
          </el-table-column>
          <el-table-column
              prop="item"
              label="项目"
          >
          </el-table-column>
          <el-table-column
              prop="level"
              label="等级"
          >
          </el-table-column>
          <el-table-column
              prop="certCode"
              label="证书编号"
          >
          </el-table-column>
          <el-table-column
              prop="certTime"
              label="发证日期"
          >
          </el-table-column>
          <el-table-column
              label="执行记录"
              width="120"
          >
            <template scope="scope">
              <el-button
                  size="small"
                  @click="popClick(scope.$index, scope.row)">查看
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="执行记录" :visible.sync="dialog" @close="clear">
          <div class="popTitle">
            <el-date-picker
                v-model="newCRtime"
                type="year"
                placeholder="选择查询年份"
                format="yyyy 年"
                value-format="yyyy 年"
            >
            </el-date-picker>
            <el-button @click="checkDetail">查询</el-button>
          </div>
          <div class="popContent">
            <el-table :data="popList" v-if="popTotal!=0" border>
              <el-table-column width="180" prop="dtime" label="时间"></el-table-column>
              <el-table-column width="180" prop="remark" label="内容"></el-table-column>
            </el-table>
            <el-empty description="未查到相关记录"
                      v-else
            >

            </el-empty>
          </div>
        </el-dialog>
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

    </main>
    <Footer/>
  </div>
</template>

<script>
import {checkUserMember, getUserProfile, queryCertList, queryUserCertDetailList} from "@/api/user";
import {pagination} from '@/mixins/mixin'

export default {
  mixins: [pagination],
  // props: {
  //   rcType: String,
  // },
  data() {
    return {
      levelOptions: [
        {label: '国家级', value: '国家级'},
        {label: '一级', value: '一级'},
        {label: '二级', value: '二级'},
      ],
      // 下拉刷新
      queryParams: {
        pageSize: 10,
        pageNum: 1,
        userName: '',
        level: '',
        type: '',
      },
      list: [],
      // 查询
      userName: "",
      level: "",
      total: 0,
      input: '',
      detail: {},

      // 弹窗
      newCRtime: "",
      id: '',
      popList: [],
      popTotal: 0,
      dialog: false,
      currentDate: new Date()
    }
  },
  created() {
    this.queryParams.type = this.$route.query.crType
  },
  watch: {
    $route() {
      this.queryParams.type = this.$route.query.crType
      if (this.queryParams.type == '0' || this.queryParams.type == '1') {
        this.init()
      }
    }
  },
  mounted() {
    this.init()
    this.format()
    // this.checkUserMembers()
    // this.rcType = this.$router.query.rcType
    // console.log(this.queryParams.type)

    this.queryParams.type = this.$route.query.crType

  },

  methods: {
    clear() {
      this.id = ''
      this.newCRtime = ''
      this.popList = ''
      this.popTotal = 0
    },
    checkDetail() {
      const self = this;
      if (self.newCRtime == '') {
        self.$message('请选择查询年份')
        return false
      }
      let parms = {
        id: self.id,
        year: self.newCRtime ? self.newCRtime : null
      }
      queryUserCertDetailList(parms).then((res) => {
        if (res.code == 200) {
          for (let i = 0; i < res.rows.length; i++) {
            res.rows[i].dtime = res.rows[i].dtime.slice(0, 10)
          }
          self.popList = res.rows;
          self.popTotal = res.total


          if (res.total == 0) {
            self.$message('未查到相关数据')
          }
        } else {
          self.$message(res.msg);
        }
      });
    },
    popClick(index, row) {
      const self = this;
      self.id = row.id
      self.dialog = true
    },
    checkUserMembers() {
      const self = this;
      checkUserMember({sign: "wx"}).then((res) => {
        if (res.code == 200) {
          if (!res.data.isMember) {
            self.show = true;
          }
        } else {
          self.$message(res.msg);
          setTimeout(() => {
            self.$router.push("/login");
          }, 3000);
        }
      });
    },
    init() {
      const self = this;
      queryCertList(self.queryParams).then((res) => {
        if (res.code == 200) {
          self.list = res.rows
          self.total = res.total

          this.format()
        } else {
          self.$message(res.msg);
        }
      });

    },
    onSubmit() {
      this.queryParams.userName = this.userName
      this.queryParams.level = this.level
      const self = this;
      if (self.queryParams.userName || self.queryParams.level) {
        queryCertList(self.queryParams).then((res) => {
          if (res.code == 200) {
            self.list = res.rows
            self.total = res.total

            this.format()
          } else {
            self.$message(res.msg);
          }
        });
      }

    },
    resetForm() {
      this.userName = ''
      this.level = ''
      this.queryParams.userName = ''
      this.queryParams.level = ''
      console.log(this.userName)
      console.log(this.level)
      console.log(this.queryParams.userName)
      console.log(this.queryParams.level)
      this.init()
    },
    format() {
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].identityCode = this.IdCard(this.list[i].identityCode, 1)
        if (this.list[i].sex == 1) {
          this.list[i].sex = '男'
        } else {
          this.list[i].sex = '女'
        }
      }
    },

  },

}
</script>

<style lang="scss" scoped>
main {
  width: 1200px;
  margin: 20px auto;
  min-height: 455px;

  .danSearch {
    display: flex;
    height: 42px;
    margin-bottom: 30px;

    .name {
      display: flex;
      padding-right: 16px;

      .nameTitle {
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: start;
        color: rgba(0,0,0,.65);
        font-size: 14px;
      }

      ::v-deep .el-input {
        width: 260px;
        display: flex;
        align-items: center;
      }

      //::v-deep .el-input__inner{
      //  height: 32px;
      //}
    }

    .id {
      display: flex;
      padding-right: 16px;

      .idTitle {
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: start;
        color: rgba(0,0,0,.65);
        font-size: 14px;
      }

      ::v-deep .el-input {
        width: 260px;
        display: flex;
        align-items: center;
      }
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

  .danDetail {
    width: 1200px;
    margin-bottom: 80px;
    min-height: 455px;

    ::v-deep.el-table th {
      width: 60px;
    }

    ::v-deep.el-dialog__header {
      border-bottom: 1px solid #ececec;
    }
  }

  ::v-deep .el-table th > .cell {
    font-weight: normal;
  }

  ::v-deep .el-dialog {
    width: 450px;
  }

  ::v-deep .el-dialog__body {
    padding-left: 30px;
    width: 424px;
  }

  .popTitle {
    //display: flex;
    //justify-content: space-between;

    ::v-deep .el-button {
      width: 100px;
      margin-left: 12px;
    }
  }


  //.form{
  //  display: flex;
  //  justify-content: space-between;
  //
  //}
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

.popContent {

  ::v-deep .el-table {
    width: 361px;
    margin-top: 20px;
  }
}
</style>