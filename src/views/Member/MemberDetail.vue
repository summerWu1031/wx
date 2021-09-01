<template>
  <div>
    <Nav/>
    <Nav2>
      会员风采
    </Nav2>
    <Main>
      <div class="content-title">
        <div class="title">{{title}}</div>
        <div class="source-time">
          <span class="source" v-if="source" >来源:
            <span >{{source}}</span>
          </span>
          <span class="time" v-if="time">发布时间:
            <span>{{time}}</span></span>
        </div>
      </div>
      <div class="memberImg" v-if="!video">
        <img :src="loadUrl(detailImg)" :alt="title">
      </div>
      <div class="memberVideo" v-if="video">
        <video  controls >
          <source :src="loadUrl(video)"
                  type="video/mp4">
        </video>
      </div>
      <div class="content-text" v-html="content" >
      </div>
    </Main>
    <Footer/>
  </div>
</template>

<script >
import { querySysNetMemberSightDetail} from '@/api'

export default {
  props:['id'],
  data(){
    return{
      content:'',
      time:'',
      source:'',
      detailImg:'',
      title:'',
      video:''
    }
  },
  created() {
    querySysNetMemberSightDetail({sign:'wx',id:this.id}).then((res) => {
      console.log(res)
    })
  },
  mounted() {
    this.init()

  },
  methods: {
    init() {
      const self = this;
      querySysNetMemberSightDetail({sign: 'wx',id:this.id}).then((res) => {
        if (res.code == 200) {
          self.content = res.data.remark;
          self.time = res.data.createTime;
          self.detailImg = res.data.logo;
          self.title = res.data.title;
          self.video = res.data.videoUrl;
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
  margin: 20px auto;
  min-height: 455px;
  .content-title{
    justify-content: center;
    color: #1a1613;
    font-size: 18px;
    >.title{
      color: #5C5C5C;
      font-size: 26px;
      text-align: center;
      line-height: 80px;
      padding: 0 60px;
    }
    >.source-time{
      text-align: center;
      border-bottom: 1px solid #d7d7d7;
      padding: 0 20px 20px 20px;
      font-size: 12px;
      margin-bottom: 20px;
      .source{
        text-align: left;
        padding-top: 10px;
        color: #999;
        font-size: 14px;
        padding-right: 20px;
        >span{
          padding-right: 20px;
        }
      }
      .time{
        text-align: left;
        padding-top: 10px;
        color: #999;
        font-size: 14px;
        >span{
          padding-right: 20px;
        }
      }
    }

  }
  .content-text{
    width: 1200px;
    margin: 20px auto;
    line-height: 28px;
    color: #1a1613;
    font-size: 14px;
    img{
      display: block;
      margin: 0 auto;
    }
    .memberVideo{
      display: block;
      margin: 0 auto;
    }
  }
}
</style>