<template>
  <div class="coach">
    <div class="content">
      <span class="back"> <router-link to="/">&lt; 返回首页</router-link>   </span>
      <div class="user-head">
        <div class="block">
          <el-avatar :size="50" v-model="userInfo.avatars" :src="userInfo.avatars[0].url"></el-avatar>
        </div>
        <span class="name"> {{ userInfo.userName }}</span>
        <span class="tel">{{ userInfo.phonenumber }}</span>
      </div>
      <div class="wrapper">
        <div class="paycard">
          <h2>{{ userType == 1 ? "个人会员信息" : "协会团体会员信息" }}</h2>
          <span class="pay-item">会员类型：{{ members.memberName }}</span>
          <span class="pay-item">所属单位：{{ members.sourceOrgName }}</span>
          <span class="pay-item">是否缴费：
          <el-tag type="warning" v-if="members.ifFee == 0">未缴费</el-tag>
          <el-tag v-else type="success" size="large">已缴费</el-tag>
        </span>
          <template v-if="members.ifFee==0">
            <span class="pay-item">会员费用：
            <i class="Red" style="font-style: normal"
            >{{ members.goodsPrice }}
            </i>
            元
          </span>
            <span class="pay-item">
            申请时间：{{ formatDateTime(members.createTime) }}
          </span>
          </template>
          <template v-else>
            <span class="pay-item">
            会员编号：{{
                `${members.memberPerfix}${members.memberCodeType}${members.memberCode}`
              }}
          </span>
            <span class="pay-item"> 入会时间：{{ members.initiationTime }} </span>
            <span class="pay-item" v-if="members.dueTime"
            >会员有效期：{{ members.dueTime.slice(0, 10) }}
          </span>
            <span class="pay-item" v-if="userType == 1">
              <div class="card" @click="lookMemberCards">
                <span>我的会员证</span>
                <span class="checkCard">{{ members.codeUrl ? '更新会员证' : '查看会员证 ' }}<i
                    class="el-icon-arrow-right"></i></span>
              </div>
              <!--              <Cell title="我的会员证" :extra="members.codeUrl ? '更新会员证' : '查看会员证 '" />-->
            </span>

          </template>
        </div>
        <div class="paytype" v-if="members.ifFee==0">
          <h2>支付方式</h2>
          <el-radio-group v-model="payType">
            <el-radio :label="2">
              <div class="radio-content">
                <img class="wx" src="../../../src/assets/image/wechat.png" alt="wx">
                <span class="wechat">微信</span>
              </div>
            </el-radio>
            <el-radio :label="1">
              <div class="radio-content">
                <img class="ali" src="../../../src/assets/image/alipay.png" alt="alipay">
                <span class="wechat">支付宝</span>
              </div>
            </el-radio>
          </el-radio-group>
          <span class="pay-item price">
            <span>
               总价：
            <i class="payPrice" style="font-style: normal"
            >{{ members.goodsPrice }}
            </i>
            元
            </span>
            <el-button @click="payOrder">确认支付</el-button>
          </span>
        </div>
        <div class="memberCard" v-if="members.codeUrl && userType == 1">
          <el-image fit="cover" :src="loadUrl(members.codeUrl)">
          </el-image>
        </div>
        <div class="codeUrl" v-if="isShowQrcode">
          <i class="el-icon-circle-close" @click="isShowQrcode=false"></i>
          <VueQr draggable="false"
                 :correctLevel="3"
                 :logoSrc="require('@/assets/image/logo1.png')"
                 backgroundColor="white"
                 :logoScale=".2"
                 :logoMargin="5"
                 logoBackgroundColor="white"
                 :margin="10" :size="190" :text="qrcode"/>
          <h2>请用微信扫码支付</h2>
          <h2 class="payPrice">{{ members.goodsPrice }}元</h2>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {
  checkUserIsOrgMember,
  queryOrgMemberInfo,
  getOrderById,
  wxPay,
  lookMemberCard, getUserProfile, checkUserMember,
} from "@/api/user";
import VueQr from "vue-qr";

export default {
  components: {
    VueQr,
  },
  inject:['reload'],
  data() {
    return {
      payType: 2,
      userType: 1,
      userInfo: {},
      isOrgMember: '',
      members: {},
      id: null,
      makeCard: true,
      qrcode: '',
      isShowQrcode: false,
      websock: undefined
    }
  },
  mounted() {
    let self = this
    checkUserIsOrgMember({sign: "wx"}).then((res) => {
      if (res.code == 200) {
        self.isOrgMember = res.data.isOrgMember;
        self.queryOrgMemberInfos();
      } else {
        self.$message(res.msg);
        setTimeout(() => {
          self.$router.push("login");
        }, 3000);
      }
    })
    getUserProfile().then((res) => {
      let self = this
      if (res.code == 200) {
        window.sessionStorage.setItem("user", JSON.stringify(res.data));
        // window.localStorage.setItem("user", JSON.stringify(res.data));
        if (res.data.userType == 1) {
          self.userInfo = res.data.userInfo
          if (self.userInfo.identityCode == null) {
            self.$message('请先完善个人信息')
            self.$router.push('/myuser')
          } else {
            self.$set(self.userInfo, "avatars", [
              {url: self.loadUrl(self.userInfo.avatar)},
            ]);
          }
        }
      } else {
        self.$message(res.mes)
      }
    })
  },
  destroyed() {
    this.websock.close()//离开路由之后断开websocket连接
  },
  methods: {
    queryOrgMemberInfos() {
      let self = this;
      self.$store.commit("showLoading");
      queryOrgMemberInfo({sign: "wx", isOrgMember: self.isOrgMember}).then(
          (res) => {
            if (res.code == 200) {
              self.members = res.data;
              self.id = res.data.orderId;
              if (res.data.ifFee == 0) {
                self.getOrderByIds(self.id);
              }
            } else {
              self.$message(res.msg);
            }
            self.$store.commit("hideLoading");
          }
      )
      // wxPay({id: self.id}).then((res) => {
      //   self.$store.commit("hideLoading");
      //   self.qrcode = res.data.qrcode
      //
      // })
    },
    getOrderByIds(id) {
      const self = this;
      self.$store.commit("showLoading");
      getOrderById({id}).then((res) => {
        self.$store.commit("hideLoading");
        if (res.code == 200) {
          self.order = res.data;
          self.orderId = res.data.backOrder;
        } else {
          self.$message(res.msg);
        }
      });
    },
    payOrder() {
      const self = this;
      self.$store.commit("showLoading");
      self.initWebSocket()
      wxPay({id: self.id}).then((res) => {
        self.$store.commit("hideLoading");
        self.qrcode = res.data.qrcode

      })
      this.isShowQrcode = true

    },
    // 生成会员证
    lookMemberCards() {
      const self = this;
      self.$store.commit("showLoading");

      lookMemberCard({sign: "wx"}).then((res) => {
        self.$store.commit("hideLoading");
        if (res.code == 200) {
          self.$set(self.members, "codeUrl", res.data);
        } else {
          self.$message(res.msg);
        }
        self.$store.commit("hideLoading");
      });
    },

    //webSocket
    initWebSocket() {
      if (typeof (WebSocket) === "undefined") {
        alert("您的浏览器不支持socket")
      } else {
        const wsurl = 'ws://8.134.12.113:8889/webSocket'
        this.websock = new WebSocket(wsurl)
        this.websock.onmessage = this.onMessage
        this.websock.onopen = this.onOpen
        this.websock.onerror = this.onError
        this.websock.onclose = this.onClose
      }
    },
    onOpen() {//连接建立之后执行send方法发送数据
      let userId = this.userInfo.userId
      let actions = {"uid": userId};
      this.onSend(JSON.stringify(actions));
    },
    onError() {//连接建立失败重连
      this.initWebSocket();
    },
    onMessage(e) {//数据接收
      let self = this
      console.log(e.data)

      if (e.data == '服务器连接成功！' ) {
        console.log(e.data)
      } else {
        let redata = JSON.parse(e.data)
        if (redata.message == '支付成功') {
          self.isShowQrcode = false
          self.$message('支付成功')
          // self.$router.push('/')
          self.reload()
          this.websock.close()
        }
      }
    },


    onSend(Data) {//数据发送
      console.log(Data, 111)
      this.websock.send(Data);
    },
    onClose(e) {//关闭
      console.log('断开连接', e);
    },
  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 1200px;
  margin: 40px auto;
  background-color: #fff;
  padding-bottom: 2px;
  max-height: 1900px;

  .back {
    padding: 20px 0 0 20px;
    display: inline-block;
    color: #555;
    position: relative;

    a {
      font-size: 14px;
      color: #555;
    }
  }

  .user-head {
    text-align: center;
    padding: 16px 0;

    .block {
      ::v-deep .el-avatar {
        width: 100px !important;
        height: 100px !important;
        border: solid 8px #fff;
        box-shadow: -6px 6px 20px #eee;

        img {
          width: 100%;
          object-fit: fill;

        }
      }
    }

    .name {
      padding: 10px 0;
      display: block;
      color: #1a1613;
      font-size: 20px;
    }

    .tel {
      display: block;
      color: #999;
      font-size: 14px;
    }
  }

  .wrapper {
    width: 800px;
    margin: 0 auto;
    margin-bottom: 60px;

    .demo-ruleForm {
      margin: 12px auto 6px auto;
      width: 800px;
      padding-left: 26px;
      margin-left: 66px;

      .el-input {
        position: relative;
        font-size: 14px;
        display: inline-block;
        width: 80%;
      }

      .radio-content {
        display: inline-flex;
        align-items: center;
        width: 78px;
        //float: left;
        img {
          width: 30px;
          height: 30px;
          display: inline-block;

          &.wx {
            margin: 0 4px;
          }
        }

        .wechat {
          height: 30px;
          display: inline-block;
          line-height: 30px;
        }
      }


      ::v-deep .el-radio {
        width: 498px;
        display: flex;
        justify-content: space-between;
        flex-direction: row-reverse;
        align-items: center;
      }

      ::v-deep .el-radio__label {
        width: 100px;
        padding-left: 0;
      }

      ::v-deep .el-radio__input {
        padding-right: 4px;
      }

    }

    .paycard, .paytype {
      margin-top: 16px;
      border-radius: 16px;
      padding: 16px;
      box-shadow: 0 0 16px rgb(0 0 0 / 10%);

      h2 {
        padding-left: 20px;
        margin-bottom: 20px;
      }

      .pay-item {
        display: block;
        padding: 12px 8px;
        background: rgba(0, 0, 0, 0.03);
        font-size: 14px;
        margin: 0 20px 12px 20px;

        &.price {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 4px 0 4px 8px
        }

        .card {
          display: flex;
          justify-content: space-between;

          .checkCard {
            cursor: pointer;
            color: #969799;
          }
        }

        ::v-deep .el-button {
          width: 100px;
          background-color: #DB261D;

          span {
            color: #fff;
          }
        }

        ::v-deep .el-button--primary {
          border-color: unset;
        }

        i {
          font-style: normal;
        }

        .Red {
          color: #db261d;
        }

        .payPrice {
          color: #db261d;
          font-size: 20px;
        }
      }
    }

    .paytype {
      .radio-content {
        display: inline-flex;
        align-items: center;
        width: 78px;
        //float: left;
        img {
          width: 24px;
          height: 24px;
          display: inline-block;

          &.wx {
            margin: 0 6px;
          }
        }

        .wechat {
          height: 30px;
          display: inline-block;
          line-height: 30px;
        }
      }


      ::v-deep .el-radio {
        width: 742px;
        display: flex;
        justify-content: space-between;
        flex-direction: row-reverse;
        align-items: center;
        padding-left: 20px;
        padding-bottom: 6px;
      }

      ::v-deep .el-radio__label {
        width: 100px;
        padding-left: 0;
      }

      ::v-deep .el-radio__input {
        padding-right: 4px;

        :hover {
          border-color: rgb(219, 38, 29);
        }
      }

      ::v-deep .el-radio__input.is-checked .el-radio__inner {
        border-color: rgb(219, 38, 29);
        background-color: #fff;

      }

      ::v-deep .el-radio__inner::after {
        width: 6px;
        height: 6px;
        background-color: rgb(219, 38, 29);
      }

      ::v-deep .el-radio__input.is-checked + .el-radio__label {
        color: #606266;
      }
    }

    .memberCard {

    }

    .codeUrl {
      //margin-top: 20px;
      padding-top: 16px;
      margin: 0 auto;
      width: 250px;
      position: absolute;
      top: 480px;
      left: 634px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

      i {
        position: absolute;
        top: 6px;
        right: 6px;
        font-size: 20px;
        cursor: pointer;
      }

      img {
        padding-left: 30px;
      }

      h2 {
        text-align: center;

        &.payPrice {
          color: #db261d;
          //font-size: 20px;
        }
      }
    }
  }
}


</style>