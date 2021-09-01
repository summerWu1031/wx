<template>
  <div class="footer">
    <div class="contentWrapper">
      <div class="footer-content">
        <p>GUANGDONG WUSHU ASSOCIATION. 广东省武术协会版权所有</p>
        <p>技术支持：广州松冬体育信息咨询有限公司 &nbsp;&nbsp;&nbsp;&nbsp;备案号：
          <a href="javascript:;" target="_blank">粤ICP备170XXXXX号</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script >
export default {};
</script>

<style lang="scss" scoped>
.footer{
  background-image: url("../assets/image/foot_bg.png");
  width: 100%;
  >.contentWrapper{
    width: 600px;
    height: 120px;
    margin: 0 auto;

    >.footer-content{
      width: 100%;
      margin: 0 auto;
      p{
        line-height: 40px;
        color: #d2d2d2;
        font-size: 12px;
        a{
          color: #d2d2d2;
        }
      }
    }
  }

}
</style>