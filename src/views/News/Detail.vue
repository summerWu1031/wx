<template>
  <div>
    <Nav/>
    <Nav2>
      新闻公告
    </Nav2>
    <Main>
      <div class="content-title">
        <div class="title">{{title}}</div>
        <div class="source-time">
          <span class="source" v-if="source" >来源:
            <span >{{source}}</span>
          </span>
          <span class="time" v-if="time">发布时间:
            <span>{{time}}</span>
          </span>
        </div>
        <div class="trainLink" v-if="trainId" @click="golink">
          培训链接
        </div>
      </div>
      <div class="content-text" v-html="content" >
          <div>{{content}}</div>
      </div>
    </Main>
    <Footer/>
  </div>
</template>

<script >
import { getNoticeDetail} from '@/api'

export default {
  props:['id'],
  data(){
    return{
      content:'',
      time:'',
      source:'',
      detailImg:'',
      title:'',
      trainId:null
    }
  },

  mounted() {
    this.init()

  },
  methods: {
    init() {
      const self = this;
      getNoticeDetail({sign: 'wx',id:this.id}).then((res) => {
        if (res.code == 200) {
          self.content = res.data.noticeContent;
          self.time = res.data.releaseTime;
          self.source = res.data.noticeSource;
          self.title = res.data.noticeTitle;
          self.trainId = res.data.trainId
        } else {
          self.$message(res.msg);
        }
      });
    },
    golink() {
      // this.$router.push(`/apply-detail/${id}`);
      this.$router.push({path:'/apply-detail',query:{id:this.trainId}})
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
    .trainLink{
      text-align: center;
    }
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
    //img{
    //  display: block;
    //  margin: 0 auto;
    //  max-width: 1200px;
    //}
    //p{
    //  text-indent: 2pt;
    //}
  }
}
</style>
