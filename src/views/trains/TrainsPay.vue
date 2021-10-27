<template>
  <div class="coach">
    <div class="payContent">
      <span class="back" @click="back">&lt; 返回课程列表 </span>
      <div class="user-head">
        <div class="block">
          <el-avatar :size="50" v-model="userInfo.avatars" :src="userInfo.avatars[0].url"></el-avatar>
        </div>
        <span class="name"> {{ userInfo.userName }}</span>
        <span class="tel">{{ userInfo.phonenumber }}</span>
      </div>
      <div class="wrapper">
        <div class="paycard">
          <h2>课程详情</h2>
          <span class="pay-item">课程名称：{{ detail.name }}</span>
          <span class="pay-item">课时：{{ detail.orgWxTrainExaminations.length }}课时 </span>
          <span class="pay-item">创建时间：{{ payInfo.createTime.split('T')[0] }}</span>
          <span class="pay-item">订单金额：
            <i class="Red" style="font-style: normal"
            >{{ payInfo.price }}
            </i>
            元
          </span>
        </div>
        <div class="paytype">
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
            >{{ payInfo.price }}
            </i>
            元
            </span>
            <el-button @click="payOrder">确认支付</el-button>
          </span>
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
          <h2 class="payPrice">{{ payInfo.price }}元</h2>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {
  wxPay,
  getUserProfile, checkUserMember
} from "@/api/user";
import VueQr from "vue-qr";
import {confirmationTrain} from "@/api/training";
import "@/assets/pay.scss"

export default {
  components: {
    VueQr,
  },
  inject: ['reload'],
  props: ['detail'],
  data() {
    return {
      detailShow: false,
      payInfo: {},
      payType: 2, //支付宝:1 微信:2
      userInfo: {},
      qrcode: '',
      isShowQrcode: false,
      websock: undefined,
      order: {},
      orderId: null
    }
  },
  mounted() {
    let self = this

    self.checkUserMembers()
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
    this.confirmationTrains()

  },

  methods: {
    confirmationTrains() {
      const self = this;
      let id = self.detail.id;
      confirmationTrain({id}).then((res) => {
        if (res.code == 2) {
          self.payInfo = res.data
          self.orderId= self.payInfo.orderNumber
        } else {
          self.$message(res.msg);
        }
      });
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
    back() {
      this.$router.back()
    },
    payOrder() {
      const self = this;
      self.$store.commit("showLoading");
      self.initWebSocket()
      wxPay({id: self.orderId, orderType:5}).then((res) => {
        self.$store.commit("hideLoading");
        self.qrcode = res.data.qrcode

      })
      this.isShowQrcode = true

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

      if (e.data == '服务器连接成功！') {
        console.log(e.data)
      } else {
        let redata = JSON.parse(e.data)
        if (redata.message == '支付成功') {
          self.isShowQrcode = false
          self.$message('支付成功')
          // self.$router.push('/')
          self.$router.push({name: 'course-detail', params: {id: self.id}})
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
.payContent {
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

  .demo-ruleForm {
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

  }

  .paytype {

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
}


</style>

