<template>
  <div>
    <Nav/>
    <div class="raceListDetail">
      <div class="topBanner">
        <router-link to="/" class="tabs">首页 ></router-link>
        <span @click="back" class="tabs"> 赛事报名信息 ></span>
        <span class="tabs">{{ applyInfo.itemName }} ></span>
      </div>
      <div class="contentWrapper">
        <div class="introWrapper">
          <div class="courseIntro">
            <div class="left">
              <img :src="loadUrl(applyInfo.imgUrl)" alt="">
            </div>
            <div class="right">
              <div class="item-name">
                <h2 class="item-title">{{ applyInfo.itemName }}</h2>
              </div>

              <div class="items">
                <ul>
                  <li>比赛时间：{{ applyInfo.competitionMatchBeginDate }} 至 {{ applyInfo.competitionMatchEndDate }}</li>
                  <li>比赛地点：{{ applyInfo.address }}</li>
                  <li>主办单位：{{ applyInfo.organizerName }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="courseDetail">
          <div class="courseMenu">
            <div class="tabs">
              <div class="tab" :class="{on: selected==index}" @click="select(index)" v-for="(item,index) in tabs"
                   :key="index">
                {{ item }}
              </div>
            </div>
            <!--          参赛人员-->
            <div class="content" v-show="selected==0">
              <ul class="list" v-if="userList.length>0">
                <li v-for="(item,index) in userList" :key="index" class="listItem" @click="show(item.userId)">
                  <div class="userName">
                    {{ item.userName }}
                  </div>
                  <div class="itemDetail">
                    <span>查看详细信息 <i class="el-icon-arrow-right"></i></span>
                  </div>
                </li>
              </ul>
              <el-empty description="暂无参赛人员" v-else></el-empty>

            </div>
            <!--          比赛规则-->
            <div class="content" v-show="selected==1">
              <p>{{ applyInfo.itemRules }}</p>
            </div>
            <!--          比赛须知-->
            <div class="content" v-show="selected===2">
              <p>{{ applyInfo.itemKnow }}</p>
            </div>


            <el-dialog
                :visible.sync="showDetail"
                v-for="(item,index) in userList" :key="index"
                title='详细信息'
            >
              <ul>
                <li>
                  <span class="label">姓名：</span>
                  <span>{{ item.userName }}</span>
                </li>
                <li>
                  <span class="label">性别：</span>
                  <span>{{ item.sex === 1 ? '男' : '女' }}</span>
                </li>
                <li>
                  <span class="label">手机号码：</span>
                  <span>{{ item.phonenumber }}</span>
                </li>
                <li>
                  <span class="label">证件号码：</span>
                  <span>{{ item.identityCode }}</span>
                </li>
                <li>
                  <span class="label">是否会员：</span>
                  <span>{{ item.isMember === 1 ? '否' : '是' }}</span>
                </li>
                <li>
                  <span class="label">是否晋段：</span>
                  <span>{{ item.isUpgrade === 1 ? '是' : '否' }}</span>
                </li>
                <li>
                  <span class="label">身份：</span>
                  <span>
                        {{ item.leader === 1 ? '领队' : '' }}
                        {{ item.docter === 1 ? '医生' : '' }}
                        {{ item.coach === 1 ? '教练' : '' }}
                        {{ item.worker === 1 ? '工作人员' : '' }}
                      </span>
                </li>
                <li>
                  <span class="label">支付状态：</span>
                  <span v-if="item.orderSatus==1"><el-tag type="warning">待支付</el-tag></span>
                  <span v-if="item.orderSatus==2"><el-tag type="success">已支付</el-tag></span>
                  <span v-if="item.orderSatus==3"><el-tag type="info">已取消</el-tag></span>
                </li>
                <li>
                  <span class="label">已报小项：</span>
                  <span v-for="(item,index) in itemList" :key="index">
                        <span class="span-item">{{ item.itemGroupName }}-{{ item.itemMinName }}</span>
                      </span>
                </li>
              </ul>
            </el-dialog>

          </div>
        </div>
      </div>
    </div>

    <Footer/>
  </div>
</template>

<script>
import {queryMyJoinCompetitionInfo, queryMyJoinItemMinInfo} from '@/api/user'
import '@/assets/topBanner.scss'
export default {
  data() {
    return {
      id: this.$route.query.id,
      applyInfo: {},
      tabs: ['参赛人员', '比赛规则', '比赛须知'],
      selected: 0,
      userList: [],
      showDetail: false,
      itemList: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      queryMyJoinCompetitionInfo({id: this.id}).then((res) => {
        if (res.code === 200) {
          this.applyInfo = res.data
          this.userList = res.data.users
        } else {
          this.$message(res.msg)
        }
      })
    },
    select(index) {
      this.selected = index
    },
    show(userId) {
      this.showDetail = true
      let params = {itemId: this.id, userId: userId}
      queryMyJoinItemMinInfo(params).then((res) => {
        if (res.code === 200) {
          this.itemList = res.data
        } else {
          this.$message(res.msg)
        }
      })
    },
    back() {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.raceListDetail{
  width: 1200px;
  margin: 0 auto;
  .el-dialog {
    ul {
      li {
        display: flex;
        align-items: center;
        padding-bottom: 10px;

        .label {
          display: block;
          width: 90px;
        }

        .span-item {
          background: #ffffff;
          box-shadow: 0px 0px 18px 0px rgb(75 75 75 / 14%);
          border-radius: 4px;
          margin: 0 5px 5px 0;
          padding: 6px 10px;
          display: inline-block;
        }
      }
    }
  }

  ::v-deep .el-dialog {
    width: 600px;
    border-radius: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }

  ::v-deep.el-dialog__header {
    border-bottom: 1px solid #ebedf0;
  }

  ::v-deep .el-dialog__body {
    padding: 15px 20px 20px 20px;
  }
}
.contentWrapper {
  padding: 12px 10px;
  background-color: #fff;
  width: 1200px;
  margin: 0 auto;
  .introWrapper {
    //padding-bottom: 46px;
    background-color: #fff;

    .courseIntro {
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;


      .left {
        width: 320px;
        margin-right: 16px;

        &.exam {
          height: 192px;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .right {
        width: 856px;
        display: flex;
        flex-direction: column;
        //justify-content: space-between;

        .item-name {
          display: flex;

          .item-title {
            padding-right: 8px;
            padding-top: 4px;
          }
        }

        .items {
          display: flex;
          justify-content: space-between;

          ul {
            li {
              color: #666;
              font-size: 14px;
              padding: 10px 0 0 0;

              .price {
                color: #F01414;
              }
            }

            .btn {
              text-align: center;
              width: 130px;
              height: 36px;
              line-height: 36px;
              border-radius: 4px;
              background-color: #db261d;
              color: #FFFFFF;
              cursor: pointer;
              font-size: 14px;
              display: inline-block;
            }

          }

          .buy {
            display: flex;
            align-items: end;
            margin-right: 20px;
            flex-direction: column-reverse;

            .price {
              font-size: 26px;
              padding-right: 24px;
              color: #F01414;

              i {
                font-size: 22px;
                color: #F01414;
              }
            }

            .btn {
              text-align: center;
              width: 150px;
              height: 45px;
              line-height: 45px;
              border-radius: 25px;
              background-color: #db261d;
              color: #FFFFFF;
              cursor: pointer;
              font-size: 16px;
              display: inline-block;
            }
          }
        }
      }
    }
  }

  .courseDetail {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding-top: 20px;
    //padding-left: 10px;
    //padding-right: 10px;
    padding-bottom: 20px;

    .courseMenu {
      //width: 900px;
      width: 1200px;

      .tabs {
        height: 52px;
        border-bottom: 1px solid #eee;
        font-size: 18px;
        line-height: 52px;
        display: flex;

        .tab {
          margin-right: 100px;
          padding-right: 2px;
          color: #999;
          cursor: pointer;

          &.on {
            border-bottom: 2px solid #ee0a24;
            color: #ee0a24;
          }
        }
      }

      .content {
        min-height: 294px;

        p {
          padding: 12px 4px;
        }

        .rules {
          padding-top: 20px;
        }

        .video {
          width: 800px;
          height: 400px;
          margin: 12px 0;
        }

        .word {
          font-size: 14px;
          margin: 12px 0;

          a {
            color: #2d8cf0;

          }
        }

        .list {
          cursor: pointer;

          .listItem {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 50px;
            border-bottom: 1px solid #eee;
            font-size: 14px;

            .exam {
              .times {
                padding-right: 6px;
                font-size: 13px;
              }
            }

            .score {
              cursor: pointer;
              font-size: 13px;
            }
          }
        }
      }


    }

    .courseTeacher {
      width: 250px;

      h3 {
        height: 52px;
        border-bottom: 1px solid #eee;
        font-size: 18px;
        line-height: 52px;
      }

      p {
        font-size: 14px;
        line-height: 30px;
        padding: 20px 0;
        color: #666;
        text-indent: 28px;
      }
    }
  }



}

</style>
