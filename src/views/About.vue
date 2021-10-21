<template>
  <div>
    <Nav/>
    <Nav2>联系我们</Nav2>
    <AsideMenu name="联系我们" :current.sync="this.current" :title="this.title">
      <template v-slot:0>
        <div class="introl">
          <h2>广东省武术协会</h2>
          <p v-html="introduction"></p>
        </div>
      </template>
      <template v-slot:1>
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
      </template>
    </AsideMenu>
    <Footer/>
  </div>
</template>

<script>
import {getqueryOrgInfo} from '@/api/index.js'
import AsideMenu from "@/components/AsideMenu";

export default {
  components: {AsideMenu},
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

  > .list_box {

    > .list_content {
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

      .introl {
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
