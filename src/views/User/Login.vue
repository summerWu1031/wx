<template>
  <div class="login">
    <div class="container">
      <div class="login-top">
        <router-link class="forgot-password" to="/"
        ><img class="image-round" alt="" src="../../assets/image/home-logo1.png"
        /></router-link>
      </div>
      <div class="wrapper">
        <div class="loginText"><span>登 录</span></div>
        <div class="loginForm">
          <el-form :model="personinfo"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" @keyup.enter.native="submitForm('ruleForm')">
            <el-form-item label="账号" prop="username">
              <el-input v-model="personinfo.username" placeholder="请输入账号（手机号码）"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input show-password type="password" v-model="personinfo.password" autocomplete="off" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item class="forget">
              <router-link class="forgot-password" to="/forgot-password"
              >忘记密码？
              </router-link
              >
            </el-form-item>
            <el-form-item class="btn">
              <el-button @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>

          </el-form>

        </div>
        <div class="item-bar">
          <span class="span-link">还没有账号？
            <router-link to="/signup" class="Black">注册</router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {login, getUserProfile} from "@/api/user";

export default {
  name: "login",
  data() {
    let formatter = (rule, value, callback) => {
      // const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
      const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
      if (!value) {
        callback(new Error('手机号码不能为空!'))
      }else {
        callback()
      }
      if (!reg.test(value)) {
        callback(new Error('请输入正确的手机号码'));
      } else {
        callback()
      }
    }
    let password = (rule, value, callback)=>{
      if (!value) {
        callback(new Error('密码不能为空！'))
      }else {
        callback()
      }
    }
    return {
      personinfo: {
        user: {},
        username: "",
        password: "",
        sms: "",
        userId: "",
        checked: false
      },
      rules: {
        username: [
          // {required: true, message: '手机号不能为空!', trigger: 'blur'},
          {validator: formatter, trigger: 'blur'}
        ],
        password: [
          {validator: password, trigger: 'blur'}
        ],

      }
    }
  },
  mounted() {
    // let token = window.sessionStorage.getItem("token");
    let token = window.localStorage.getItem("token");
    if (token) {
      this.$router.push("/");
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.onSubmit()
        } else {
          this.$message('请正确填写表格内容');
          return false;
        }
      })
    },
    onSubmit() {
      var self = this;
      //  let getOpenid = window.sessionStorage.getItem("openid");
      // let getOpenid = window.localStorage.getItem("openid");
      // console.log(getOpenid+'getOpenid')
      //这里写登录的操作
      let param = {
        loginType: 1,
        sign: "mobile",
        phone: self.personinfo.username,
        password: self.personinfo.password,
      };
      self.$store.commit("showLoading");
      login(param).then((res) => {
        if (res.token) {
          // window.sessionStorage.setItem("token", res.token);
          window.localStorage.setItem("token", res.token);
          self.getUserProfiles();
          // self.$router.push("/helloworld");
        } else {
          this.$message(res.msg);
        }
        self.$store.commit("hideLoading");

      })
    },
    getUserProfiles() {
      const self = this;
      self.$store.commit("showLoading");

      getUserProfile().then((res) => {
        if (res.code == 200) {
          // window.sessionStorage.setItem("user", JSON.stringify(res.data));
          window.localStorage.setItem("user", JSON.stringify(res.data));
          //self.$store.dispatch("saveUserInfo", res.data);
          self.personinfo.user = res.data.userInfo;
          if (res.data.userType == 1) {
            self.personinfo.user = res.data.userInfo;
          } else {
            // self.personinfo.user = res.data.userInfo;
            // self.personinfo.user.avatar = res.data.orgInfo.img;
            // self.personinfo.user.updateTime = res.data.orgInfo.updateTime;
          }
          if (!self.personinfo.user.updateTime) {
            self.$message("请先完善用户基本信息！");
            self.$router.push("/myuser");
          }else {
            self.$router.push("/");
          }
        } else {
          self.$message("登录失败！");
        }
        self.$store.commit("hideLoading");

      });
    },
  },
  computed: {
    userinfo() {
      return this.$store.state.userinfo;

    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 600px;
  margin: 60px auto;

  .login-top {
    margin: 22px auto;
    img{
      padding-top: 26px;
      width: 280px;
    }

  }
.wrapper{
  width: 426px;
  margin: 0 auto;
  background-color: #fff;
  padding-top: 34px;
  //box-shadow: -6px 6px 10px #b8b8c4;
  box-shadow: 0 8px 29px 0 #ececec ;
  border-radius: 10px;
  .loginText{
    text-align: center;
    font-size: 18px;
    padding-bottom: 12px;
    span{
      color: #555;
    }
  }
  .loginForm {
    margin: 12px auto;
    width: 426px;
    .demo-ruleForm {
      .el-input {
        position: relative;
        font-size: 14px;
        display: inline-block;
        width: 80%;
      }

      .forget{
        margin-bottom:0;
        margin-top:-24px;
        ::v-deep .el-form-item__content{
          text-align: right;
          margin-right: 64px;
        }
      }
    }

    .item-bar{
      float: right;
      margin-right: 100px;
      margin-top: -12px;
    }
  }

  .item-bar{
    //margin-left: 152px;
    padding-bottom: 40px;
    text-align: center;
    a{
      color: #DB261D;
    }
  }
}

}
</style>
<style lang="scss" scoped>
.btn {
  margin-top: 8px;
  ::v-deep .el-form-item__content {
    margin-right: 64px;
    margin-left: 58px !important;
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
}

</style>