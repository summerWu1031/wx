<template>
  <div class="main">
    <div class="aside">
      <div class="top">
        <span>相关资讯</span>
      </div>
      <div class="aside-menu">
        <ul>
          <li v-for="(t,index) in title" :key=index @click="pick(t)">
            <router-link :to="t.link" :class="{selected: current[0]===t.name}">
              {{ t.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <slot/>
  </div>
</template>

<script >

export default {

  methods: {
    pick(t) {
      this.$store.commit('updateSelected', t)
    },

  },
  computed: {
    title() {
      return this.$store.state.title.slice(2,5)
    },
    current() {
      return this.$store.state.current
    }
  },



}
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
        text-indent: 0;
      }
    }

    > .list_content {
      padding: 20px;

      > ul {
        border-bottom: 1px #d7d7d7 solid;
        padding-bottom: 10px;

        > li {
          display: flex;
          justify-content: space-between;
          align-items: center;
         .left{
           :hover{
             color: #DB261D;
           }
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

          .right{
            padding-bottom: 4px;
          }
        }
      }


    }
  }

}

</style>
<style lang="scss" scoped>
.page {
  display:flex;
  border:1px solid #dddddd;
  float: right;
  margin-right: 20px;
  ::v-deep.el-input{
    width: 40px;
    padding: 0;
    border: none;
  }
  ::v-deep .el-input__inner{
    border-radius: 0;
    padding: 0 6px;
  }
  .pageTotal{
    border-right: 1px solid #dddddd;
    padding: 6px 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    &:hover{
      background-color: #fff;
    }
  }
  .jumper,.per,.next,.firstPage,.lastPage{
    border-right: 1px solid #dddddd;
    padding: 6px 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    cursor: pointer;
    &:hover{
      background-color: #fff;
    }
  }
  ::v-deep .el-pagination{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #DB261D;
    color: #fff;
  }

}
</style>