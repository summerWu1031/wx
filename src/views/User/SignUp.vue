<template>
  <div>
    <div class="container">
      <div class="login-top">
        <router-link class="forgot-password" to="/">
          <img class="image-round" alt="" src="../../assets/image/home-logo1.png"/>
        </router-link>

      </div>
      <div class="wrapper">
        <div class="loginText"><span>注 册</span></div>

        <div class="tabs">
          <div class="tab" @click="registerType=1" :class="{on:registerType===1}">个人注册</div>
          <div class="tab" @click="registerType=2" :class="{on:registerType===2}">单位注册</div>
        </div>
        <div class="signUpForm " v-show="registerType===1">
          <el-form :model="personinfo" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                   @keyup.enter.native="submitForm('ruleForm',1)"
                   :hide-required-asterisk=true

          >
            <el-form-item label="姓名" prop="name">
              <el-input v-model="personinfo.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="personinfo.phone"></el-input>
            </el-form-item>
            <el-form-item label="短信验证码" prop="code" class="mes">
              <el-input class="mesInput" v-model="personinfo.code" placeholder="请输入验证码"></el-input>
              <el-button
                  size="small"
                  class="btn-send"
                  native-type="button"
                  @click="getRegisterSmsCode(1)"
                  :disabled="!disabledCodeBtn"
              >
                {{ codeText }}
              </el-button>
            </el-form-item>

            <el-form-item label="用户密码" prop="password">
              <el-input show-password type="password" v-model="personinfo.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="passwordt">
              <el-input type="password" v-model="personinfo.passwordt" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item class="btn">
              <el-button type="info" @click="submitForm('ruleForm',1)" :disabled="!checked">注册</el-button>
            </el-form-item>
          </el-form>
        </div>

        <div class=" ogrForm" v-show="registerType===2">
          <el-form :model="orginfo" :rules="rules" ref="org" label-width="130px" class="org"
                   @keyup.enter.native="submitForm('org',2)"
                   :hide-required-asterisk="true"
          >
            <el-form-item label="单位名称" prop="name">
              <el-input v-model="orginfo.name"
              ></el-input>
            </el-form-item>
            <el-form-item label="统一社会信用代码" prop="creditCode">
              <el-input v-model="orginfo.creditCode"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系人" prop="principal">
              <el-input v-model="orginfo.principal"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="orginfo.phone"></el-input>
            </el-form-item>
            <el-form-item label="短信验证码" prop="code" class="mes">
              <el-input class="mesInput" v-model="orginfo.code" placeholder="请输入验证码"></el-input>
              <el-button
                  size="small"
                  class="btn-send"
                  native-type="button"
                  @click="getRegisterSmsCode(2)"
                  :disabled="!disabledCodeBtn"
              >
                {{ codeText }}
              </el-button>
            </el-form-item>

            <el-form-item label="用户密码" prop="password">
              <el-input show-password type="password" v-model="orginfo.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="passwordt">
              <el-input type="password" v-model="orginfo.passwordt" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item class="btn">
              <el-button type="info" @click="submitForm('org',2)" :disabled="!checked">注册</el-button>
            </el-form-item>
          </el-form>
        </div>

        <!--        相关服务政策-->
        <div class="item-bar-wrapper">
          <div class="item-bar">
            <el-checkbox v-model="checked" checked-color="#DB261D"
            >我已阅读并同意
            </el-checkbox
            >
            <span class="to-link">
          <router-link to="/agreement">《相关服务条款和隐私政策》</router-link>
        </span>
          </div>
          <div class="item-bar">
          <span class="span-link Black"
          >已经有账号？<router-link to="/login" class="Black"
          >登录</router-link
          ></span
          >
          </div>
        </div>

      </div>


    </div>
  </div>
</template>

<script>
import {register, registerSmsCode, login, getUserProfile} from "@/api/user";

export default {
  data() {
    let name = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('姓名不能为空!'))
      } else {
        callback()
      }

    }
    let code = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请填写验证码!'))
      } else {
        callback()
      }

    }
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.personinfo.passwordt !== '') {
          this.$refs.ruleForm.validateField('passwordt');
        }
        callback();
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (this.registerType === 1) {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.personinfo.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      } else {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.orginfo.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      }

    }
    let formatter = (rule, value, callback) => {
      // const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
      const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
      if (!value) return
      if (!reg.test(value)) {
        callback(new Error('请输入正确的手机号码'));
      } else {
        callback()
      }
    }

    return {
      hideStar:true,
      registerType: 1,
      personinfo: {
        sign: "mobile",
        registerType: this.registerType,
        name: "",
        // identityCode: "",
        phone: "",
        code: "",
        password: "",
        passwordt: "",
        userInfo: {
          identityCode: "",
          password: "",
          phonenumber: "",
          userName: "",
        },
      },
      orginfo: {
        sign: "mobile",
        registerType: this.registerType,
        name: "",
        creditCode: "",
        principal: "",
        phone: "",
        code: "",
        password: "",
        passwordt: "",
        userInfo: {
          userName: " ",
          phonenumber: " ",
          password: " ",
        },
      },
      checked: false,
      errorText: "",
      errorTextid: "",
      show: false,
      errorTextp: "",
      errorTextpt: "",
      codeText: "获取验证码",
      disabledCodeBtn: true,
      user: {},
      rules: {
        name: [
          // {required: true, message: '姓名不能为空!', trigger: 'blur'},
          {validator: name, trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '手机号不能为空!', trigger: 'blur'},
          {validator: formatter, trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请输入验证码!', trigger: 'blur'},
          {validator: code, trigger: 'blur'}
        ],
        password: [
          {validator: validatePass, trigger: 'blur'}
        ],
        passwordt: [
          {validator: validatePass2, trigger: 'blur'}
        ],
        creditCode: [
          {required: true, message: '统一社会信用代码不能为空!', trigger: 'blur'},
          {min: 18, max: 18, message: '请输入正确的统一社会信用代码'}
        ],
        principal: [
          {required: true, message: '联系人不能为空!', trigger: 'blur'},
        ],

      }
    }
  },
  methods: {
    submitForm(formName, registerType) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.onResigter(registerType)
        } else {
          self.$message('请正确填写表格内容');
          return false;
        }
      });
    },
    onResigter(registerType) {
      let self = this;

      if (registerType == 1) {
        self.$set(self.personinfo.userInfo, "userName", self.personinfo.name);
        self.$set(
            self.personinfo.userInfo,
            "phonenumber",
            self.personinfo.phone
        );
        self.$set(
            self.personinfo.userInfo,
            "password",
            self.personinfo.password
        );
        // self.$set(
        //   self.personinfo.userInfo,
        //   "identityCode",
        //   self.personinfo.identityCode
        // );
      } else {
        self.$set(self.orginfo.userInfo, "userName", self.orginfo.name);
        self.$set(self.orginfo.userInfo, "phonenumber", self.orginfo.phone);
        self.$set(self.orginfo.userInfo, "password", self.orginfo.password);
      }
      let param = registerType == 1 ? self.personinfo : self.orginfo;

      register(param).then((res) => {
        if (res.code == 200) {
          // self.onlogin(registerType);
          self.$router.push("/login");
        } else {
          this.$message(res.msg);
        }
      });
    },

    // 注册后自动登录
    onlogin(_type) {
      let self = this;
      let getOpenid = window.sessionStorage.getItem("openid");
      // let getOpenid = window.localStorage.getItem("openid");
      let queryParams = {}
      //这里写登录的操作
      if (self.registerType === 1) {
        queryParams = {
          loginType: 1,
          sign: "mobile",
          phone: _type == 1 ? self.personinfo.phone : self.orginfo.phone,
          password: _type == 1 ? self.personinfo.password : self.orginfo.password,
          openId: getOpenid,
        }
      } else {
        queryParams = {
          loginType: 2,
          sign: "mobile",
          phone: self.orginfo.phone,
          password: self.orginfo.password,
          openId: getOpenid,
        }
      }

      self.$store.commit("showLoading");
      login(queryParams).then((res) => {
        if (res.token) {
          window.sessionStorage.setItem("token", res.token);
          // window.localStorage.setItem("token", res.token);
          self.getUserProfiles();

          self.$router.push("/");

        } else {
          this.$message(res.msg);
        }
        self.$store.commit("hideLoading");
      });
    },

    getUserProfiles() {
      const self = this;

      getUserProfile().then((res) => {
        self.$store.commit("showLoading");

        if (res.code == 200) {
          window.sessionStorage.setItem("user", JSON.stringify(res.data));
          // window.localStorage.setItem("user", JSON.stringify(res.data));
          //self.$store.dispatch("saveUserInfo", res.data);
        } else {
          self.$message("登录失败！");
        }
        self.$store.commit("hideLoading");

      });
    },

    getRegisterSmsCode(uType) {
      const self = this;
      let regs = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
      let phone = uType == 1 ? self.personinfo.phone : self.orginfo.phone;
      if (phone.length == 0) {
        self.$message("手机号码不能为空!");
        return false;
      } else {
        if (!regs.test(phone)) {
          self.$message("请输入正确的手机号码!");
          return false;
        } else {
          self.$message("获取验证码中。。。");
        }
      }
      registerSmsCode({phone}).then((res) => {
        if (res.code == 200) {
          self.countDown(60);
        } else {
          self.$message(res.msg);
        }
      });
    },
    // 倒计时方法
    countDown(time) {
      if (time === 0) {
        this.disabledCodeBtn = true;
        this.codeText = "获取验证码";
        return;
      } else {
        this.disabledCodeBtn = false;
        this.codeText = "重新发送(" + time + ")";
        time--;
      }
      setTimeout(() => {
        this.countDown(time);
      }, 1000);
    }

  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 600px;
  margin: 30px auto;
  //background-color: #fff;
  .login-top {
    margin: 20px 0;

    img {
      padding-top: 26px;
      width: 300px;
    }

  }

  .tabs {
    display: flex;
    border-radius: 25px;
    background: #f7f8fc;
    width: 62%;
    padding-bottom: 0;
    box-shadow: -10px 6px 16px #f1f2f4;
    margin-left: 104px;
    margin-bottom: 20px;
    margin-top: 12px;

    .tab {
      width: 100%;
      border-radius: 25px;
      padding: 8px 14px;
      color: #444;
      text-align: center;
      font-size: 14px;
      cursor: pointer;

      &.on {
        background: #fff;
        color: #1a1613;
        border: 2px solid #f1f2f4;
        box-shadow: 0 0 6px #f1f2f4;
      }
    }
  }

  .wrapper {
    //width: 600px;
    width: 480px;
    margin: 0 auto;
    background-color: #fff;
    padding-top: 34px;
    box-shadow: 0 8px 29px 0 #ececec;
    border-radius: 10px;

    .loginText {
      text-align: center;
      font-size: 18px;
      padding-bottom: 12px;

      span {
        color: #555;
      }
    }

    .signUpForm {
      margin: 12px auto 6px auto;
      width: 426px;
      padding-left: 26px;

      .demo-ruleForm {
        margin: 0 auto;

        .el-input {
          position: relative;
          font-size: 14px;
          display: inline-block;
          width: 80%;
        }

        .forget {
          margin-bottom: 0;
          margin-top: -16px;

          ::v-deep .el-form-item__content {
            text-align: right;
            margin-right: 74px;
          }
        }
      }

    }

    .ogrForm {
      padding-left: 0;

      .org {
        .el-input {
          width: 90%;
        }

        ::v-deep.el-button--small {
          padding: 13px 15px;
        }
      }

    }

    .item-bar-wrapper {
      padding-bottom: 30px;
      margin-top: -8px;

      .item-bar {
        //margin-left: 152px;
        padding-bottom: 12px;
        text-align: center;

        a {
          color: #DB261D;
        }
      }

    }

  }

}
</style>
<style lang="scss" scoped>
.signUpForm {
  ::v-deep .el-form-item__content {
    //margin-right: 100px;
  }

  .btn {
    margin-top: 8px;

    ::v-deep .el-form-item__content {
      margin-right: 59px;
      margin-left: 32px !important;
    }

    ::v-deep .el-button {
      width: 100%;
      background-color: #DB261D;

      span {
        color: #fff;
      }
    }

    ::v-deep .el-button--info.is-disabled, .el-button--info.is-disabled:active, .el-button--info.is-disabled:focus, .el-button--info.is-disabled:hover {
      //color: #fff;
      border-color: #fcb6b6;
      background-color: #fcb6b6;
    }
  }
}

.org {
  ::v-deep .el-form-item__content {
    //margin-right: 100px;
  }

  .btn {
    margin-top: 8px;

    ::v-deep .el-form-item__content {
      margin-right: 36px;
      margin-left: 63px !important;
    }

    ::v-deep .el-button {
      width: 100%;
      background-color: #DB261D;

      span {
        color: #fff;
      }
    }

    ::v-deep .el-button--info.is-disabled, .el-button--info.is-disabled:active, .el-button--info.is-disabled:focus, .el-button--info.is-disabled:hover {
      //color: #fff;
      border-color: #fcb6b6;
      background-color: #fcb6b6;
    }
  }
}

.demo-ruleForm {
  ::v-deep.el-form-item &.forget {
    margin-bottom: 0;
  }

  .mes {
    ::v-deep.el-form-item__content {
      display: flex;
    }
  }

  .mes {
    ::v-deep .el-input {
      width: 47% !important;
      margin-right: 6px;
    }
  }
}

.org {
  .mes {
    ::v-deep .el-input {
      width: 62% !important;
      margin-right: 6px;
    }
  }
}


</style>
