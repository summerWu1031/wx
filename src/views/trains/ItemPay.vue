<template>
  <div class="coach">
    <div class="content">
      <span class="back" @click="back">&lt; 返回培训列表 </span>
      <div class="user-head">
        <div class="block">
          <el-avatar :size="50" v-model="userInfo.avatars" :src="userInfo.avatars[0].url"></el-avatar>
        </div>
        <span class="name"> {{ userInfo.userName }}</span>
        <span class="tel">{{ userInfo.phonenumber }}</span>
      </div>
      <div class="wrapper">
        <div class="paycard">
          <h2>{{ pDetail.trainName }}</h2>
          <!--          <span class="pay-item">课程名称：{{ pDetail.trainName }}</span>-->
          <span class="pay-item">
        培训类型：{{
              pDetail.trainType == 1 ? "段位考评" : pDetail.trainType == 2
                  ? "教练员培训" : pDetail.trainType == 3
                      ? "裁判员培训" : "考评员培训"
            }}</span
          >
          <span class="pay-item">等级：{{ pDetail.trainLv }}</span>
          <span class="pay-item"
          >考试类型：{{ pDetail.examType == 1 ? "在线答题" : "上传视频" }}</span
          >
          <span class="pay-item" v-if="order.createTime"
          >创建时间：{{ order.createTime.slice(0, 10) }}</span
          >
          <span class="pay-item">订单金额：
            <i class="Red" style="font-style: normal"
            >{{ order.orderPrices }}
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
            >{{ order.orderPrices }}
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
          <h2 class="payPrice">{{ order.orderPrices }}元</h2>
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
import {getPaperId} from "@/api/training";


export default {
  components: {
    VueQr,
  },
  inject: ['reload'],

  data() {
    return {
      order: {},
      payDate: {},
      pDetail: {},
      orderId: "",
      payType: 2, //支付宝:1 微信:2
      userInfo: {},
      qrcode: '',
      isShowQrcode: false,
      websock: undefined,
    }
  },
  destroyed() {
    this.websock.close()
  },
  mounted() {
    let self = this
    this.pDetail = JSON.parse(this.$route.query.IPdetail);
    this.getPaperIds();
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

  methods: {
    getPaperIds() {
      const self = this;
      let trainId = this.pDetail.id;

      self.$store.commit("showLoading");
      getPaperId({trainId}).then((res) => {
        self.$store.commit("hideLoading");
        if (res.code == 200) {

          self.order = res.data.orderInfo;
          //  console.log("order", self.order.trainId);
          self.orderId = self.order.orderNumber;
        } else {
          self.$message(res.msg);
          // setTimeout(() => {
          //   self.$router.push("/login");
          // }, 3000);
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
      wxPay({id: self.orderId}).then((res) => {
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
    cursor: pointer;
    font-size: 14px;
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
