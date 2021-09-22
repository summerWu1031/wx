<template>
  <div>
    <Nav/>
    <Nav2>机构设置</Nav2>
    <div class="main">
      <div class="aside">
        <div class="top">
          <span>机构设置</span>
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
        <div class="list_content" v-show="current.index===1">
          <div class="introl">
            <h2>广东省武术协会</h2>
            <div class="intro-content">
              <p>
                <span>广东省武术协会成立至今已有近</span><span>40年历史。在广东省各级领导的关心关怀和国家体育总局、中国武术协会、省体育局的指导支持下，广东省武术协会全体人员坚定信念，牢记使命，团结拼搏、追求卓越，为民服务，为国争光，各项工作扎实推进，成绩斐然。</span>
              </p>
              <p>
                广东武术套路和武术散打项目取得了优异的运动成绩。2人获得北京奥运会、南京青奥会特设项目武术<span>比赛太极拳全能冠军。</span>9人获得全运会竞体项目南拳全能、太极拳全能和散打项目<span>冠军，</span>1人获得全运会群体项目太极拳<span>冠军，</span>30人获得南拳、太极拳类项目和散打项目世界冠军，培养了大批亚洲和全国冠军。<span>受到省政府通报表彰</span>“集体嘉奖”，被授予“广东青年五四奖章集体”和“广东省五一劳动奖状”先进集体。多人代表广东和国家参加奥运会开幕式、央视春晚、中央团拜会等武术表演展示。积极开展国内外武术推广普及工作，充分发挥优秀教练员和冠军运动员的知名度、影响力和标杆榜样作用，组织参与国内外武术专家讲学及国家队教练工作，致力<span>增进各国人民之间的人文、</span>体育<span>交流与文明互鉴，</span>传播中华文化，<span>使武术运动</span>更好的服务于世界人民，为人类的健康造福，为国家赢得了荣誉，作出了卓越贡献。
              </p>
              <p>
                广东省武术协会自觉提高政治站位和勇气担当，切实履行属地责任，织牢管理网络，依法依规加强武术赛事活动监管和服务，受到国家体育总局武术运动管理中心、中国武术协会的通报表扬。
              </p>
              <p>
                广东省武术协会坚持以人民为中心，广泛开展各类武术赛事、培训辅导、展演、扶贫志愿服务等活动，满足人民群众不断增长的体育需求。特别是在抗击新冠肺炎疫情期间，积极编制健身功法，倡导居家锻炼，组织广东演武大会、太极拳网络大赛和各类培训班，免除团体和个人会费，积极推动广东武术活动的开展和武术产业复工复产。
              </p>
              <p>
                广东省武术协会<span>积极开展</span>“武术进校园”工作，组织体育教师培训，体教并举弘扬优秀传统文化，推进学校武术教育，加强武术后备人才培养，促进可持续发展。<span>在鹤山组织了</span>6万中小学生齐学咏春，1万多名中小学生进行咏春拳汇演暨中国武术段位考评。
              </p>
              <p>
                广东省武术协会充分发挥国家武术段位制先行先试创新试点省份优势，组织专家学者、民间拳师，对洪、刘、蔡、李、莫、蔡李佛、咏春等广东南拳、太极拳等拳种进行挖掘整理，编写教程，创新性地开展中国武术段位制工作。
              </p>
              <p>
                在习近平新时代中国特色社会主义思想指引下，广东省武术协会将继续深入学习贯彻党的十九届五中全会精神，进一步弘扬中华优秀武术文化，让广大群众享受武术运动带来的健康快乐和幸福，为贯彻落实全民健身国家战略，助力健康中国建设，加快推进体育强国建设，实现中华民族伟大复兴的中国梦，推动共建人类命运共同体，促进世界和平发展作出独特而积极的贡献。
              </p>
            </div>
          </div>
        </div>
        <div class="list_content" v-show="current.index===0">
          <div class="struct">
            <ul>
              <li v-for="(item,index) in structure" :key="index">
                <span class="grade">{{ item.orgRole }}:</span>
                <span class="uname">{{ item.personnel }}</span>
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
        {name: '机构设置'},
        {name: '广东省武术协会'},

      ],
      current: {index: 0, title: '机构设置'}
    }
  },
  created() {
    getqueryOrgInfo({sign: 'wx'}).then((res) => {
    })
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