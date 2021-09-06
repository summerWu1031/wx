<template>
  <div>
    <Nav/>
    <Nav2>
      资料下载
    </Nav2>
    <div class="main">
      <div class="aside">
        <div class="top">
          <span>资料下载</span>
        </div>
        <div class="aside-menu">
          <ul>
            <li>
              <a href="javascript:;" class="selected">文件下载</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="list_box">
        <div class="title">
          <p>
            资料
          </p>
        </div>
        <div class="list_content">
          <el-empty description="暂无数据" ></el-empty>
<!--          <ul>-->
<!--            <li>-->
<!--              <div class="left">-->
<!--                <i>•</i>-->
<!--                <a href="2021311.html?117">广东武术进校园树标杆</a>-->
<!--              </div>-->
<!--              <div class="right">-->
<!--                <input type="button" class="dl_botton" id="" name="" title="" value="点击下载">-->
<!--                <span>2021/03/01</span>-->
<!--              </div>-->
<!--            </li>-->
<!--            <li>-->
<!--              <div class="left">-->
<!--                <i>•</i>-->
<!--                <a href="2021311.html?117">广东武术进校园树标杆</a>-->
<!--              </div>-->
<!--              <div class="right">-->
<!--                <input type="button" class="dl_botton" id="" name="" title="" value="点击下载">-->
<!--                <span>2021/03/01</span>-->
<!--              </div>-->
<!--            </li>-->
<!--            <li>-->
<!--              <div class="left">-->
<!--                <i>•</i>-->
<!--                <a href="2021311.html?117">广东武术进校园树标杆</a>-->
<!--              </div>-->
<!--              <div class="right">-->
<!--                <input type="button" class="dl_botton" id="" name="" title="" value="点击下载">-->
<!--                <span>2021/03/01</span>-->
<!--              </div>-->
<!--            </li>-->

<!--          </ul>-->
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script >
export default {}
</script>

<style lang="scss" scoped>
.main {
  width: 1200px;
  margin: 20px auto;
  min-height: 455px;
  display: flex;
  justify-content: space-between;

  > .aside {
    width: 275px;
    height: 248px;

    > .top {
      width: 275px;
      background-color: #DB261D;
      height: 40px;

      > span {
        color: #fff;
        font-size: 16px;
        line-height: 40px;
        padding: 0 16px;
      }
    }

    > .aside-menu {
      width: 275px;
      border: 1px #DB261D solid;
      padding: 0 20px 20px 20px;
      background-color: #fff;

      > ul {
        margin: 0 auto;

        > li {
          width: 224px;
          margin-top: 20px;
          height: 38px;

          a {
            display: inline-block;
            width: 224px;
            line-height: 40px;
            color: #DB261D;
            font-size: 14px;
            border: 1px #dddddd solid;
            padding: 0 16px;

            &.selected {
              border-left: 5px solid #DB261D;
              background-color: #f5f5f5;
            }
          }

        }
      }
    }
  }

  > .list_box {
    width: 905px;
    margin-left: 20px;

    > .title {
      border-bottom: 1px #d7d7d7 solid;
      height: 40px;

      p {
        float: left;
        border-bottom: 1px #DB261D solid;
        padding: 0 16px;
        line-height: 39px;
        font-size: 16px;
        color: #DB261D;
      }
    }

    > .list_content {
      padding: 20px;

      > ul {
        //border-bottom: 1px #d7d7d7 solid;
        padding-bottom: 10px;

        > li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2px;
          >.left{
            i {
              font-size: 18px;
              color: #DB261D;
              padding: 0 5px;
            }

            a {
              color: #545454;
              font-size: 14px;
              line-height: 30px;
            }
          }
          >.right{
            display: flex;
            justify-content: space-between;
            .dl_botton{
              margin-right: 20px;
              margin-top: 2px;
              border: 0;
              background: #A64E48;
              border-radius: 2px;
              padding: 3px 10px;
              font-size: 12px;
              color: #fff;
              cursor: pointer;
            }
            span {
              display: block;
              color: #545454;
              padding-top: 6px;
            }
          }


        }
      }


    }
  }
}
</style>