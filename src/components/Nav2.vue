<template>
  <div class="nav2">
    <ul>
      <li>
        <router-link to="/">首页</router-link>
      </li>
      <li>/</li>
      <li class="red">
        <slot/>
      </li>
    </ul>
  </div>
</template>

<script lang="js">
export default {

}

</script>

<style lang="scss" scoped>
.nav2{
  background-color: #f7f7f7;
  border-bottom: 1px #d2d2d2 solid;
  margin-top: 8px;
  >ul{
    width: 1200px;
    margin: 0 auto;
    height: 40px;
    display: flex;
    //padding-left: 47px;
    >li{
      line-height: 40px;
      font-size: 14px;
      width: 60px;
      height: 40px;
      >a{
        color: #848484;
      }
      &.red{
        color: #DB261D;
        width: 100%;
      }
    }
  }

}
</style>
