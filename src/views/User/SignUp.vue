<template>
  <div>
    <div class="container">
      <div class="login-top">
        <img class="image-round" alt="" src="../../assets/image/home-logo.png" />
<!--        <p>填写详细信息并创建您的帐户</p>-->
      </div>
      <div class="wrapper">
        <div class="loginText"><span>注 册</span></div>
        <div class="signUpForm">
          <el-form :model="personinfo" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                   @submit="onResigter(1)">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="personinfo.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="personinfo.phone"></el-input>
            </el-form-item>
<!--            <el-form-item label="短信验证码" prop="code" class="mes">-->
<!--              <el-input class="mesInput" v-model="personinfo.code"></el-input>-->
<!--              <el-button-->
<!--                  size="small"-->
<!--                  class="btn-send"-->
<!--                  native-type="button"-->
<!--                  @click="getRegisterSmsCode(1)"-->
<!--                  :disabled="!disabledCodeBtn"-->
<!--              >-->
<!--                {{ codeText }}-->
<!--              </el-button>-->
<!--            </el-form-item>-->

            <el-form-item label="用户密码" prop="password">
              <el-input show-password type="password" v-model="personinfo.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="passwordt">
              <el-input type="password" v-model="personinfo.passwordt" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item class="btn">
              <el-button @click="submitForm('ruleForm')" :disabled="!checked">注册</el-button>
<!--              <el-button @click="resetForm('ruleForm')">重置</el-button>-->
            </el-form-item>
          </el-form>
        </div>
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
    let name = (rule, value, callback)=>{
      if (value === '') {
       callback(new Error('姓名不能为空!'))
      }else {
        callback()
      }

    }
    let code = (rule, value, callback)=>{
      if (value === '') {
        callback(new Error('请填写验证码!'))
      }else {
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
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.personinfo.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
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
      personinfo: {
        sign: "mobile",
        registerType: 1,
        name: "",
        // identityCode: "",
        phone: "",
        code: "123",
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
        registerType: 2,
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
          // {required: true, message: '手机号不能为空!', trigger: 'blur'},
          {validator: formatter, trigger: 'blur'}
        ],
        code: [
          {required: true, message: '请输入验证码!', trigger: 'blur'},
          // {validator: code, trigger: 'blur'}
        ],
        password: [
          {validator: validatePass, trigger: 'blur'}
        ],
        passwordt: [
          {validator: validatePass2, trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid)
        if (valid) {
          this.onResigter(1)
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
    onlogin(_type) {
      var self = this;
      let getOpenid = window.sessionStorage.getItem("openid");
      // let getOpenid = window.localStorage.getItem("openid");

      //这里写登录的操作
      let param = {
        loginType: 1,
        sign: "mobile",
        phone: _type == 1 ? self.personinfo.phone : self.orginfo.phone,
        password: _type == 1 ? self.personinfo.password : self.orginfo.password,
        openId: getOpenid,
      };

      login(param).then((res) => {
        if (res.token) {
          window.sessionStorage.setItem("token", res.token);
          // window.localStorage.setItem("token", res.token);
          self.getUserProfiles();

            self.$router.push("/");

        } else {
          this.$message(res.msg);
        }

      });
    },
    getUserProfiles() {
      const self = this;

      getUserProfile().then((res) => {
        if (res.code == 200) {
          // window.sessionStorage.setItem("user", JSON.stringify(res.data));
          window.localStorage.setItem("user", JSON.stringify(res.data));
          self.$store.dispatch("saveUserInfo", res.data);
        } else {
          self.$message("登录失败！");
        }

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
    img{
      padding-top: 26px;
      width: 300px;
    }

  }
  .wrapper{
    //width: 600px;
    width: 480px;
    margin: 0 auto;
    background-color: #fff;
    padding-top: 20px;
    box-shadow: 0 8px 29px 0 #b8b8c4 ;
    border-radius: 10px;
    .loginText{
      text-align: center;
      font-size: 18px;
      padding-bottom: 12px;
      span{
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

        .forget{
          margin-bottom:0;
          margin-top:-16px;
          ::v-deep .el-form-item__content{
            text-align: right;
            margin-right: 74px;
          }
        }
      }

    }
.item-bar-wrapper{
  padding-bottom: 30px;
  margin-top: -8px;
  .item-bar{
    //margin-left: 152px;
    padding-bottom: 12px;
    text-align: center;
    a{
      color: #DB261D;
    }
  }

}

  }

}
</style>
<style lang="scss" scoped>
.signUpForm{
  ::v-deep .el-form-item__content{
    //margin-right: 100px;
  }
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
    span{
      color: #fff;
    }
  }
}
.demo-ruleForm{
  ::v-deep.el-form-item &.forget{
    margin-bottom: 0;
  }
.mes {
  ::v-deep.el-form-item__content{
    display: flex;
  }
  }
.mes{
  ::v-deep .el-input {
    width: 47% !important;
    margin-right: 6px;
  }
}
}


</style>