<template>
  <div>
    <Nav/>
    <Nav2>联系我们</Nav2>
    <div class="main">
      <div class="aside">
        <div class="top">
          <span>联系我们</span>
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
        <div class="list_content" v-show="current.index===0">
          <div class="introl">
            <h2>广东省武术协会</h2>
            <p>{{ introduction }}</p>
          </div>
        </div>
        <div class="list_content" v-show="current.index===1">
          <div class="link">
            <ul>
              <li>
                <span class="grade">联系人：</span>
                <span class="uname">{{ contact.person }}</span>
              </li>
              <li>
                <span class="grade">电话：</span>
                <span class="uname">{{ contact.phone }}</span>
              </li>
              <li>
                <span class="grade">邮件：</span>
                <span class="uname">{{ contact.email }}</span>
              </li>
              <li>
                <span class="grade">地址：</span>
                <span class="uname">{{ contact.adress }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import {getqueryOrgInfo} from '@/api/index.js'

export default {
  data() {
    return {
      introduction: '',
      contact: {
        person: '',
        phone: '',
        email: '',
        adress: ''
      },
      structure: [],
      title: [
        {name: '协会介绍'},
        {name: '联系我们'},

      ],
      current: {index: 0, title: '协会介绍'}
    }
  },

  mounted() {
    this.init()
  },
  methods: {
    change(index, name) {
      this.current.index = index
      this.current.title = name
    },
    init() {
      const self = this;
      getqueryOrgInfo({sign: 'wx'}).then((res) => {
        if (res.code == 200) {
          self.introduction = res.data.introduction
          self.contact.person = res.data.principal;
          self.contact.phone = res.data.phone;
          self.contact.email = res.data.email;
          self.contact.adress = res.data.province;
          self.structure = res.data.structure;
        } else {
          self.$message(res.msg);
        }
      });
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

      ul {
        border-bottom: 1px #d7d7d7 solid;
        padding-bottom: 10px;

        > li {
          height: 40px;

          span {
            color: #545454;
            font-size: 14px;
            line-height: 30px;

            &.uname {
              padding-left: 20px;
            }
          }
        }
      }
      .introl{
        border-bottom: 1px #d7d7d7 solid;
        padding-bottom: 10px;
        h2 {
          text-align: center;
          margin-bottom: .5em;
        }

        p {
          line-height: 26px;
        }
      }

    }
  }

}
</style>
