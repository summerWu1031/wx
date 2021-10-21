<template>
  <div class="wrapper">
      <el-form :model="basic" ref="exam" label-width="100px" class="form">
        <el-form-item label="考试名称：" >
          <el-input v-model="basic.trainName" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="考试类型：" >
          <el-input v-model="basic.trainType" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="考试等级：" >
          <el-input v-model="basic.trainLv" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="考试作品：" class="upload" prop="certImg">
          <el-upload
              v-model="basic.videoUrls"
              class="avatar-uploader"
              action="http://wushu.sportsit.cn:8080/upload/uploadVideo"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              v-loading="loading"
          >
            <img v-if="basic.coverUrl.length>0" :src="basic.coverUrl[0].url" class="avatar" >
            <img v-else src="../../assets/image/upload.png" alt="" class="uploadIcon">
            <div slot="tip" class="el-upload__tip">(请上传视频文件，且不超过500m)</div>
          </el-upload>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="onSubmit('exam')" :disabled="!checked"> 提 交</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import { getPaperId, uploadVideo, uploadVideoAssess } from "@/api/training";


export default {
  props:['detail'],
  data() {
    return {
      basic: {
        coverUrl: [],
        videoUrl: "",
        trainName: "",
        trainType: "",
        trainLv: "",
      },
      parms: {
        coverUrl: "",
        paperId: "",
        trainId: "",
        userId: "",
        videoUrl: "",
      },
      checked: false,
      pDetail: {},
      user: {},
      loading:false,
    }
  },
  created() {
    // this.pDetail = JSON.parse(this.$route.query._detail);
    // console.log(this.pDetail)
    this.pDetail = this.detail
  },
  mounted() {
    this.$set(this.basic, "trainName", this.pDetail.trainName);
    this.$set(this.basic, "trainType", this.pDetail.trainType);
    this.$set(this.basic, "trainLv", this.pDetail.trainLv);
    this.getPaperIds();
    this.user = JSON.parse(window.sessionStorage.getItem('user'));
    if (this.user.userType == 1) {
      this.parms.userId = this.user.userInfo.userId;
    }
  },
  methods:{
    getPaperIds() {
      const self = this;
      let trainId = self.pDetail.id;
      self.parms.trainId = trainId;
      getPaperId({ trainId }).then((res) => {
        if (res.code == 200) {
          self.parms.paperId = res.data.paperId;
        } else {
          self.$message(res.msg);
        }
      });
    },
    //上传视频
    handleAvatarSuccess(res, file) {
      this.basic.videoUrl = URL.createObjectURL(file.raw);
      let self = this
      let formData = new FormData()
      formData.append('file', file.raw)
      self.loading=true
      uploadVideo(formData).then((res) => {
        if (res.code == 200) {
          setTimeout(() => {
            let str = res.fileName
            file.name = str
            self.basic.videoUrl = str;
            self.parms.videoUrl = str;
            self.basic.coverUrl[0] = {url: self.loadUrl(res.targetUrl)};
            self.parms.coverUrl=res.targetUrl
            file.status = "done";
            file.message = "上传成功";
            self.checked = true;
          }, 1000)
        } else {
          self.$message(res.msg);
        }
        self.loading=false
      })
    },
    //视频限制
    beforeAvatarUpload(file) {

      const isLt500M = file.size / 1024 / 1024 < 500;

      if (!isLt500M) {
        this.$message.error('文件大小不能超过500M');
      }
      return  isLt500M;
    },
    //上传表单
    onSubmit(){
      let self = this;
      if (self.parms.videoUrl.length == 0) {
        self.$message("作品不能为空！");
        return false;
      }
      uploadVideoAssess(self.parms).then((res) => {
        if (res.code == 200) {
          self.$message('上传成功');
          self.$router.push("/exam-list");
        } else {
          self.$message(res.msg);
          // setTimeout(() => {
          //   this.$router.push("/login");
          // }, 1500);
        }
      });
    },

  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 600px;
  margin: 0 auto;

  .form {
    width: 500px;
    padding-left: 24px;
    margin: 0 auto;
    //margin-left: 66px;

    .el-input {
      position: relative;
      font-size: 14px;
      display: inline-block;
      width: 80%;
    }

    .el-textarea {
      position: relative;
      display: inline-block;
      width: 80%;
      vertical-align: bottom;
      font-size: 14px;
    }

    ::v-deep .el-radio__input {
      :hover {
        border-color: rgb(219, 38, 29);
      }
    }

    ::v-deep .el-radio__input.is-checked .el-radio__inner {
      border-color: rgb(219, 38, 29);
      background-color: #fff;

    }

    ::v-deep .el-radio__inner::after {
      width: 6px;
      height: 6px;
      background-color: rgb(219, 38, 29);
    }

    ::v-deep .el-radio__input.is-checked + .el-radio__label {
      color: #606266;
    }
  }

  ::v-deep .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    color: #DB261D;
  }

  ::v-deep .el-tabs__item:hover {
    color: #DB261D;
  }
}


</style>
<style lang="scss" scoped>
.btn {
  margin-top: 8px;
  //padding-bottom: 34px;

  ::v-deep .el-form-item__content {
    //margin-right: 89px;
    //margin-left: 31px !important;
  }

  ::v-deep .el-button {
    width: 100px;
    background-color: #DB261D;

    span {
      color: #fff;
    }
  }

  ::v-deep .el-button--primary {
    border-color: unset;
  }

  ::v-deep  .el-button--primary.is-disabled, .el-button--info.is-disabled:active, .el-button--info.is-disabled:focus, .el-button--info.is-disabled:hover {
    //color: #fff;
    border-color: #fcb6b6;
    background-color: #fcb6b6;
  }
}

.upload {
  ::v-deep .el-upload__tip {
    margin-top: -12px;
  }

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
  }
}

.formTab {
  ::v-deep .el-tabs__header {
    padding: 0;
    position: relative;
    margin: 0 0 15px 110px;
    width: 621px;
  }
}

//::v-deep.el-popper .el-cascader__dropdown{
//
//}
</style>
