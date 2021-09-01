<template>
  <div class="nav">
    <div class="logoWrapper">
      <div class="logo">
        <a href="">
          <img src="../assets/image/home-logo1.png"  alt="广东省武术协会" >
        </a>
      </div>
<!--        <div class="search">-->
<!--          <input class="input_1" id="keyword" type="text" placeholder="请输入您想查找的内容" autocomplete="off">-->
<!--          <input type="button" id="" class="input_2" >-->
<!--        </div>-->
    </div>
    <slot/>
    <div class="navBar">
      <ul>
        <li v-for="(t,index) in title" :key=index @click="pick(t)" :class="{selected: current[0]===t.name}">
          <a :href="t.link" target="_blank" v-if="t.a" >
            {{ t.name }}
          </a>
          <router-link :to="t.link" v-else >
            {{ t.name }}
          </router-link>
        </li>
      </ul>
      </div>
    </div>
</template>

<script >

export default {
  methods:{
    pick(t){
      this.$store.commit('updateSelected',t)
    },
  },
  computed:{
    title(){
      return this.$store.state.title
    },
    current(){
      return this.$store.state.current
    }
  }
}
</script>

<style lang="scss" scoped>
.nav{
  width: 1200px;
  margin: 0 auto;
  >.logoWrapper{
    display: flex;
    justify-content: space-between;
    flex-wrap:nowrap;
    align-items: start;
    .logo{
      img{
        width: 295px;
        height: 80px;
      }
    }
    .search{
      width: 202px;
      border: 1px #eee solid;
      padding: 4px 8px 3px 7px;
      margin-top: 16px;
      border-radius: 15px;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      .input_1{
        border: 0;
        height: 18px;
        width: 180px;
        margin-right: 4px;
      }
      .input_2{
        background-image: url("../assets/image/search.png");
        background-repeat: no-repeat;
        background-color: #ffffff;
        border: none;
        width: 18px;
        height: 18px;
      }
    }
  }
  >.navImg{
    width: 1200px;
    height: 130px;
  }
  >.navBar{
    width: 1200px;
    height: 40px;
    ul{
      display: flex;
      justify-content: space-between;
      >li{
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
        &.selected{
          border-bottom: 2px solid #DB261D;
          >a{
            color: #DB261D;
          }
        }
        >a{
          color:#8e8e8e;
        }
      }
    }
  }
}
</style>