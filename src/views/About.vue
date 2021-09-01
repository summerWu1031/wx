<template>
  <div>
    <Nav/>
    <Nav2>关于我们</Nav2>
    <main>
      <div class="introl">
        <h2>广东省武术协会</h2>
        <p>{{introduction}}</p>
      </div>
      <div class="company-intro">
        <div class="struct">
            <div class="title">
              <span>机构设置：</span>
            </div>
          <ul>
            <li v-for="(item,index) in structure" :key="index">
              <span class="grade">{{item.orgRole}}:</span>
              <span class="uname">{{item.personnel}}</span>
            </li>
          </ul>
        </div>
        <div class="about-us">
            <div class="title">
              <span>联系我们：</span>
            </div>
          <ul>
            <li>
              <span class="grade" >联系人：</span>
              <span class="uname">{{contact.person}}</span>
            </li>
            <li>
              <span class="grade" >电话：</span>
              <span class="uname">{{contact.phone}}</span>
            </li>
            <li>
              <span class="grade" >邮件：</span>
              <span class="uname">{{contact.email}}</span>
            </li>
            <li>
              <span class="grade" >地址：</span>
              <span class="uname">{{contact.adress}}</span>
            </li>
          </ul>
        </div>
      </div>
    </main>
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
      structure:[]
    }
  },
  created() {
    getqueryOrgInfo({sign: 'wx'}).then((res) => {
      console.log(res);
    })
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
main{
  width: 1200px;
  margin: 0 auto;
  .introl{

    margin-bottom: 20px;
  }
  h2 {
    font-weight: normal;
    height: 80px;
    color: #5C5C5C;
    font-size: 26px;
    text-align: center;
    line-height: 80px;
    padding: 0 60px;
  }
  p{
    font-size: 14px;
    text-align:left;
    text-indent:32pt;
    margin-bottom: 16px;
    line-height: 24px;
  }
  .company-intro{
    display: flex;
    margin-top: 12px;
    border-top: 1px solid #d2d2d2;
    >.struct{
      margin-right: 36px;
      width: 600px;
      .title{
        margin: 20px 0 14px 0;
        span{
          background-color: #DB261D;
          color: #fff;
          display: flex;
          width: 80px;
          height: 30px;
          align-items: center;
          padding-left: 4px;
        }
      }
      ul{
        margin-left: 4px;
      }
      li{
        display: flex;
        margin-bottom: 16px;
        font-size: 14px;
        .grade{
          display: inline-block;
          padding-right: 16px;
        }
        .uname{
          display: inline-block;
          -webkit-box-flex: 1;
          flex: 1;
          //color: #999;
        }
      }
    }
    >.about-us{
      width: 600px;
      .title{
        margin: 20px 0 14px 0;
        span{
          background-color: #DB261D;
          color: #fff;
          display: flex;
          width: 80px;
          height: 30px;
          align-items: center;
          padding-left: 4px;
        }
      }
      ul{
        margin-left: 4px;
      }
      li{
        display: flex;
        margin-bottom: 16px;
        font-size: 14px;
        .grade{
          display: inline-block;
          padding-right: 16px;
        }
        .uname{
          display: inline-block;
          -webkit-box-flex: 1;
          flex: 1;
          //color: #999;
        }
      }
    }
  }
}
</style>