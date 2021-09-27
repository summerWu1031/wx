<template>
  <div class="main">
    <div class="aside">
      <div class="top">
        <span>{{ name }}</span>
      </div>
      <div class="aside-menu">
        <ul>
          <li v-for="(t,index) in title" :key=index @click="change(index,t.name)">
            <span :class="{selected: current.title===t.name}">{{ t.name }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="list_box">
      <div class="title">
        <p>
          {{ current.title }}
        </p>
      </div>
<!--      <div class="list_content" v-show="current.index===0">-->
<!--       <slot name="0"></slot>-->
<!--      </div>-->
<!--      <div class="list_content" v-show="current.index===1">-->
<!--        <slot name="1"></slot>-->
<!--      </div>-->
      <div class="list_content" v-for="(item,index) in title" :key="index" v-show="current.index==index">
        <slot :name="index"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import {getqueryOrgInfo} from "@/api";

export default {
  props:['current','name','title'],

  methods: {
    change(index, name) {
      this.current.index = index
      this.current.title = name
    },
  }
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

          span {
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
    }
  }

}
</style>