<template>
  <div>
    <div class="container">
      <div class="login-top">
        <img class="image-round" alt="" src="../../assets/image/home-logo.png"/>
        <!--        <p>填写详细信息并创建您的帐户</p>-->
      </div>
      <div class="wrapper">
        <div class="loginText"><span>找回密码</span></div>
        <div class="signUpForm">
          <el-form :model="params" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                   @submit="onResigter(1)">
            <el-form-item label="手机号码" prop="phonenumber">
              <el-input v-model="params.phonenumber" placeholder="请输入手机号码（账号）"></el-input>
            </el-form-item>
            <el-form-item label="用户新密码" prop="password">
              <el-input show-password type="password" v-model="params.password" autocomplete="off" placeholder="请输入用户新登录密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="passwordt">
              <el-input type="password" v-model="params.passwordt" autocomplete="off" placeholder="请再次确认密码"></el-input>
            </el-form-item>
            <el-form-item label="短信验证码" prop="sms" class="mes">
              <el-input class="mesInput" v-model="params.sms"></el-input>
              <el-button
                  size="small"
                  class="btn-send"
                  native-type="button"
                  @click="getForgetSms"
                  :disabled="!disabledCodeBtn"
              >
                {{ codeText }}
              </el-button>
            </el-form-item>

            <el-form-item class="btn">
              <el-button @click="submitForm('ruleForm')" >修改</el-button>
              <!--              <el-button @click="resetForm('ruleForm')">重置</el-button>-->
            </el-form-item>
          </el-form>
        </div>
        <div class="item-bar-wrapper">
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
import { forgetPassword, forgetSmsCode } from "@/api/user";
export default {
  data(){
    let sms = (rule, value, callback)=>{
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
        if (this.params.passwordt !== '') {
          this.$refs.ruleForm.validateField('passwordt');
        }
        callback();
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.params.password) {
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
      params:{
        phonenumber: "",
        password: "",
        passwordt: "",
        sms: "",
        sign:'mobile'
      },
      codeText: "获取验证码",
      disabledCodeBtn: true,
      rules: {
        phonenumber: [
          {validator: formatter, trigger: 'blur'}
        ],
        sms: [
          {validator: sms, trigger: 'blur'}
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
  methods:{
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.params)
          forgetPassword(this.params).then((res) => {
            console.log(res);
          });
        } else {
         self.$message('请正确填写表格内容');
          return false;
        }
      });
    },
    getForgetSms(){
      const self = this;
      if (self.params.phonenumber == "") {
        self.$message("手机号码不能为空!");
        return false;
      }
      forgetSmsCode({ phone: self.params.phonenumber }).then((res) => {
        if (res.code == 200) {
          self.countDown(60);
        } else {
          self.$message(res.msg);
        }
      })
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
    },
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
    margin-right: 58px;
    margin-left: 18px !important;
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