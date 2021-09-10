<template>
  <div class="nav">
    <div class="logoWrapper">
      <div class="logo">
        <a href="">
          <img src="../assets/image/home-logo1.png" alt="广东省武术协会">
        </a>
      </div>
      <!--        <div class="search">-->
      <!--          <input class="input_1" id="keyword" type="text" placeholder="请输入您想查找的内容" autocomplete="off">-->
      <!--          <input type="button" id="" class="input_2" >-->
      <!--        </div>-->
      <div class="loginWrapper" v-if="!userInfo.userName">
        <div class="login">
          <router-link to="/login">登录</router-link>
        </div>
        <span>|</span>
        <div class="signup">
          <router-link to="/signup">注册</router-link>
        </div>
      </div>

      <div class="block" v-else>
        <el-dropdown  trigger="click">
          <el-avatar :size="50" :src="userInfo.avatar"></el-avatar>
          <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item @click.native="$router.push('/myuser')">我的信息</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

<!--        <el-menu-->
<!--            class="el-menu-vertical-demo"-->
<!--            @open="handleOpen"-->
<!--            @close="handleClose">-->
<!--          <el-submenu index="1">-->
<!--            <template slot="title">-->
<!--              <el-avatar :size="50" :src="userInfo.avatar"></el-avatar>-->
<!--            </template>-->
<!--            <el-menu-item-group>-->
<!--              <el-menu-item index="1-1">选项1</el-menu-item>-->
<!--              <el-menu-item index="1-2">选项2</el-menu-item>-->
<!--            </el-menu-item-group>-->
<!--          </el-submenu>-->
<!--        </el-menu>-->
      </div>

    </div>
    <slot/>
    <div class="navBar">
      <ul>
        <li v-for="(t,index) in title" :key=index @click="pick(t)" :class="{selected: current[0]===t.name}">
          <a :href="t.link" target="_blank" v-if="t.a">
            {{ t.name }}
          </a>
          <router-link :to="t.link" v-else>
            {{ t.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {getUserProfile} from "@/api/user";
export default {
  data(){
    return{
      userInfo:{}
    }
  },
  mounted() {
    getUserProfile().then((res)=>{
      const self = this
      if (res.code == 200) {
        window.sessionStorage.setItem("user", JSON.stringify(res.data));
        self.$store.dispatch("saveUserInfo", res.data);
        self.userInfo = res.data.userInfo
        self.userInfo.avatar = self.loadUrl(self.userInfo.avatar)
        console.log(self.userInfo+'userInfo')
      }else {
        console.log(res.mes)
      }
    })
  },
  methods: {
    pick(t) {
      this.$store.commit('updateSelected', t)
    },
    logout() {
      window.sessionStorage.removeItem("token");
      window.sessionStorage.removeItem("user");
      // window.localStorage.removeItem("token");
      // window.localStorage.removeItem("user");
      this.$store.dispatch("saveUserInfo", {});
      this.userInfo={}
      console.log(this.userInfo)
    },
  },
  computed: {
    title() {
      return this.$store.state.title
    },
    current() {
      return this.$store.state.current
    }
  },
}
</script>

<style lang="scss" scoped>
.nav {
  width: 1200px;
  margin: 0 auto;

  > .logoWrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    align-items: center;

    .logo {
      img {
        width: 295px;
        height: 80px;
      }
    }

    .loginWrapper {
      display: flex;
      width: 100px;
      height: 40px;
      justify-content: space-between;
      align-items: center;
    }
    .block {
      display: flex;
      width: 100px;
      height: 100px;
      justify-content: right;
      align-items: center;
      ::v-deep .el-avatar {
        width: 60px !important;
        height: 60px !important;
        //border: solid 8px #fff;
        //box-shadow: -6px 6px 20px #eee;

        img {
          width: 100%;
          object-fit: fill;

        }
      }
    }
    //.search{
    //  width: 202px;
    //  border: 1px #eee solid;
    //  padding: 4px 8px 3px 7px;
    //  margin-top: 16px;
    //  border-radius: 15px;
    //  background-color: #fff;
    //  display: flex;
    //  justify-content: space-between;
    //  .input_1{
    //    border: 0;
    //    height: 18px;
    //    width: 180px;
    //    margin-right: 4px;
    //  }
    //  .input_2{
    //    background-image: url("../assets/image/search.png");
    //    background-repeat: no-repeat;
    //    background-color: #ffffff;
    //    border: none;
    //    width: 18px;
    //    height: 18px;
    //  }
    //}
  }

  > .navImg {
    width: 1200px;
    height: 130px;
  }

  > .navBar {
    width: 1200px;
    height: 40px;

    ul {
      display: flex;
      justify-content: space-between;

      > li {
        text-align: center;
        width: 130px;
        height: 40px;
        font-size: 16px;
        padding: 10px 6px;
        //&:hover{
        //  border-bottom: 2px solid #DB261D;
        //  >a{
        //    color: #DB261D;
        //  }
        //}
        &.selected {
          border-bottom: 2px solid #DB261D;

          > a {
            color: #DB261D;
          }
        }

        > a {
          color: #8e8e8e;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.block{
  ::v-deep .el-menu{
    position: absolute;
    background-color:transparent ;
    border: none;

  }
  ::v-deep .el-menu .el-menu--inline{
    border: 1px solid red;
    background-color: #fff;
    position: absolute;
    right: 0;
  }
  ::v-deep .el-submenu__icon-arrow .el-icon-arrow-down{
    display: none;
  }
  ::v-deep .el-icon-arrow-down:before{
    display: none;
  }
  ::v-deep .el-submenu__title{
    padding-right: 0;
  }
}
::v-deep .el-dropdown-menu__item{
  padding: 0 30px;
}
</style>