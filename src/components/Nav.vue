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

      <div class="block" v-if="userInfo">
        <el-dropdown>
          <el-avatar :size="50" :src="userInfo.avatar"></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="$router.push('/myuser')">我的信息</el-dropdown-item>
            <el-dropdown-item @click.native="$router.push('/myCourse')">我的课程</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="loginWrapper" v-else>
        <div class="login">
          <router-link to="/login">登录</router-link>
        </div>
        <span>|</span>
        <div class="signup">
          <router-link to="/signup">注册</router-link>
        </div>
      </div>
    </div>
    <slot name="nav"></slot>
    <div class="navBar">
      <ul class="navUl">
        <li v-for="(t,index) in title" :key=index @click="pick(t)"
            :class="{selected: current[0]===t.name,judge:t.name==='考评员'}">
          <a :href="t.link" target="_blank" v-if="t.a">
            {{ t.name }}
          </a>
          <a href="javascript:;" v-else-if="t.rc">
            <div id="components-dropdown-demo-placement" class="dropdownWrapper">
              <Dropdown trigger="hover" style="margin-left: 20px">
                裁判教练
                <Icon type="ios-arrow-down"></Icon>

                <Dropdown-menu slot="list">
                  <Dropdown-item v-for="(item,index) in  rcList" :key="index"
                  >
                    <router-link :to="{path:item.link , query:{crType:item.type}}">{{ item.name }}</router-link>
                  </Dropdown-item>

                </Dropdown-menu>
              </Dropdown>
            </div>
          </a>
          <a href="javascript:;" v-else-if="t.exam" class="judge">
            <div  class="dropdownWrapper">
              <Dropdown trigger="hover" style="margin-left: 20px">
                考评员
                <Icon type="ios-arrow-down"></Icon>

                <Dropdown-menu slot="list">
                  <Dropdown-item v-for="(item,index) in  judgeList" :key="index"
                  >
                    <router-link :to="{path:item.link , query:{crType:item.type}}">{{ item.name }}</router-link>
                  </Dropdown-item>

                </Dropdown-menu>
              </Dropdown>
            </div>
          </a>

          <a href="javascript:;" v-else>
            {{ t.name }}
          </a>
        </li>
      </ul>
    </div>
    <div class="nav2" v-show="!current[0]=='首页'">
      <ul>
        <li>
          <router-link to="/">首页</router-link>
        </li>
        <li>/</li>
        <li class="red">
          <slot name="nav2"></slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {getUserProfile} from "@/api/user";

export default {
  data() {
    return {
      usr: {},
      userInfo: null,
      popShow: 'notShow',
      rcList: [
        {name: '裁判注册', link: '/coachreferee', type: '1'},
        {name: '裁判列表', link: '/crlist', type: '1'},
        {name: '裁判打分', link: '/rc-score-list', type: '1'},
        {name: '教练注册', link: '/coachreferee', type: '0'},
        {name: '教练列表', link: '/crlist', type: '0'},
      ],
      judgeList: [
        {name: '考评员注册', link: '/coachreferee', type: '4'},
        {name: '考评员列表', link: '/crlist', type: '4'},

      ]
    }
  },

  created() {
    this.user = JSON.parse(window.sessionStorage.getItem('user'))
  },

  mounted() {
    if (this.user.userType === 1) {
        this.userInfo = this.user.userInfo
        this.userInfo.avatar = this.loadUrl(this.user.userInfo.avatar)
    } else {
      if (this.user.orgInfo) {
        this.userInfo = this.user.orgInfo
        this.userInfo.avatar = this.loadUrl( this.user.orgInfo.img)
      }
    }

  },
  methods: {
    pick(item) {
      this.$store.commit('updateSelected', item)
      if (item.name === '裁判教练') {
        this.popShow = 'show'
      }
      if(item.name=='考评员' || item.name=='裁判教练'){

      }else {
        let path = item.link
        this.$router.push(path)
      }
    },


    logout() {
      window.sessionStorage.removeItem("token");
      window.sessionStorage.removeItem("user");
      // window.localStorage.removeItem("token");
      // window.localStorage.removeItem("user");
      this.$store.dispatch("saveUserInfo", {});
      this.userInfo = null
      this.user={}
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
    font-size: 14px;
    color: #8e8e8e;

    a {
      color: #8e8e8e;
    }

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
      cursor: pointer;

      ::v-deep .el-avatar {
        width: 40px !important;
        height: 40px !important;
        border: solid 1px #ececec;
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
    //height: 40px;

    .navUl {
      display: flex;
      justify-content: space-between;
      //flex-wrap: wrap;

      > li {
        text-align: center;
        width: 130px;
        height: 40px;
        font-size: 16px;
        padding: 10px 2px;
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

        &.judge {
          width: 100px;
        }

        > a {
          color: #8e8e8e;
        }

      }

      .dropdownWrapper {
        width: 100px;

        a {
          color: #8e8e8e;
        }

        ::v-deep .ivu-dropdown-rel {
          width: 100px;
          margin-left: -20px !important;
          box-sizing: border-box;
        }

        ::v-deep .ivu-dropdown-menu {
          position: absolute;
          background-color: #fff;
          width: 146px;
          left: -84px;
          border-radius: 4px;
          outline: none;
          box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
          -webkit-transform: translate3d(0, 0, 0);
        }

        ::v-deep .ivu-dropdown-item {
          font-size: 14px !important;
          padding: 10px 16px;

          :hover {
            color: #DB261D;
          }
        }
      }

    }

  }
}

.nav2 {
  background-color: #f7f7f7;
  border-bottom: 1px #d2d2d2 solid;
  margin-top: 8px;

  > ul {
    width: 1200px;
    margin: 0 auto;
    height: 40px;
    display: flex;
    //padding-left: 47px;
    > li {
      line-height: 40px;
      font-size: 14px;
      width: 60px;
      height: 40px;

      > a {
        color: #848484;
      }

      &.red {
        color: #DB261D;
      }
    }
  }

}
</style>
<style lang="scss" scoped>
.block {
  ::v-deep .el-menu {
    position: absolute;
    background-color: transparent;
    border: none;

  }

  ::v-deep .el-menu .el-menu--inline {
    border: 1px solid red;
    background-color: #fff;
    position: absolute;
    right: 0;
  }

  ::v-deep .el-submenu__icon-arrow .el-icon-arrow-down {
    display: none;
  }

  ::v-deep .el-icon-arrow-down:before {
    display: none;
  }

  ::v-deep .el-submenu__title {
    padding-right: 0;
  }

  ::v-deep .el-dropdown-menu__item {
    padding: 0 30px;
  }
}

.dropdownWrapper {
  ::v-deep .ant-dropdown-link {
    color: #8e8e8e;
  }
}

::v-deep .ant-dropdown-menu-item {
  width: 146px;
  text-align: center;
  //color:#8e8e8e ;
}

::v-deep .ant-dropdown-menu {
  border: 1px solid red;
}

</style>
