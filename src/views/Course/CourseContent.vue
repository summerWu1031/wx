<template>
  <div>
    <Nav/>
    <div class="course">
      <div class="sideBar">
        <el-menu :default-active="activeIndex" class="el-menu-vertical-demo"
                 :collapse="isCollapse" @select="handleSelect">
          <div @click="toggle(false)" v-if="isCollapse==true" class="barIcon">
            <i class="el-icon-s-unfold" @click="isCollapse==false"></i>
          </div>
          <div @click="toggle(true)" v-else class="barIcon">
            <i class="el-icon-s-fold"></i>
          </div>
          <!--          :index=id-->
          <el-menu-item :index="item.id" v-show="isCollapse==false" v-for="(item) in detail.orgWxTrainExaminations" :key="item.id">
            <div class="type" v-if="item.lookType==1">
              <i class="el-icon-video-camera"></i>
              <span>视频</span>
            </div>
            <div class="type" v-else-if="item.lookType==2">
              <i class="el-icon-document"></i>
              <span>文章</span>
            </div>
            <div class="courseTitle">{{ item.trainName }}</div>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="course-video" v-if="videoUrl">
        <h2 class="nav">{{ courseName }}</h2>
        <video controls  class="video">
          <source :src="loadUrl(videoUrl)" type="video/mp4" >
        </video>
<!--        <pdf v-else ref="pdf" :src="loadUrl(wordUrl)"></pdf>-->
      </div>
      <div class="course-video" v-else>
        <h2 class="nav">{{ courseName }}</h2>
        <span class="download">点击下载讲义：</span>
        <a :href="loadUrl(wordUrl)" target="_blank">{{ courseName }}</a>
      </div>

    </div>

    <Footer/>
  </div>
</template>

<script>
import {getApplyTrainDetail, getTrainInfo} from '@/api/training'
export default {
  data() {
    return {
      detail:'',
      isCollapse: false,
      courseName: '',
      videoUrl: '',
      wordUrl:'',
      id:this.$route.params.id,
      activeIndex:this.$route.params.selected.toString(),  //selected:item.id
      selected:this.$route.params.selected,
    }
  },
  mounted() {
    const self = this
    getApplyTrainDetail({id:self.id}).then((res) => {
      if (res.code == 200) {
        self.detail = res.data;
      } else {
        self.$message(res.msg);
        setTimeout(() => {
          self.$router.push("/login");
        }, 1000);
      }
      self.$store.commit("hideLoading");
    });
   self.init()
  },
  methods: {
    toggle(bool) {
      this.isCollapse = bool
    },
    init(){
      this.wordUrl=''
      this.videoUrl=''
      getTrainInfo({id:this.selected}).then((res) => {
        if (res.code == 200) {
          this.courseName = res.data.trainName
          this.wordUrl= res.data.wordUrl
          if(res.data.videoUrl){
            this.videoUrl = res.data.videoUrl
          }
        } else {
          console.log(res.msg)
        }
      })

    },
    handleSelect(key, keyPath) {
      console.log(key)
     this.selected=key
      this.init()
    }
  }
}
</script>

<style lang="scss" scoped>
.course {
  margin-top: 12px;
  margin-bottom: 30px;
  display: flex;

  .sideBar {
    padding-top: 12px;

    .barIcon {
      padding: 4px 2px;

    }

    i {
      font-size: 20px;
      cursor: pointer;
    }
    .el-menu-item:hover{
      background-color: #fff;
    }
    ::v-deep.is-active {
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      color: #db261d;
      background-color: #fff;
      :hover{
        background-color: #fff;
      }
    }
  }

  .course-video {
    //margin-left: 124px;
    margin: 0 auto;
    width: 882px;
    .nav {
      border-bottom: 1px solid #c1c1c1;
      margin-bottom: 16px;
      padding: 12px 0;
      color: #333;
      font-size: 22px;
    }

    .video {
      height: 500px;
      width: 882px;
    }
   .download{
     font-size: 14px;

   }
    a{
      font-size: 14px;
      //font-weight: 600;
      color: #2d8cf0;
    }
  }
}


.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 280px;
  min-height: 558px;
}

.el-menu--collapse {
  width: 36px;
}

.el-menu {
  background-color: #f3f3f3;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}



.el-menu-item {
  line-height: 24px;
  border-radius: 4px;
  background-color: #fff;
  margin: 12px 8px;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .type {
    display: flex;
    font-size: 13px;
    color: #999;
    align-items: center;
    margin-bottom: 4px;
    box-shadow:none;
    i {
      font-size: 18px;
    }
  }

  .courseTitle {
    display: inline-block;
    height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 4px;
    box-shadow:none;
  }
}
</style>
