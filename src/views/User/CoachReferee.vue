<template>
  <div class="coach">
    <div class="content">
      <span class="back"> <router-link to="/">&lt; 返回首页</router-link>   </span>
      <div class="user-head">
        <div class="block">
          <el-avatar  :size="50" v-model="userInfo.avatars" :src="userInfo.avatars[0].url"></el-avatar>

        </div>
        <span class="name"> {{ userInfo.userName }}</span>
        <span class="tel">{{ userInfo.phonenumber }}</span>
      </div>
      <div class="wrapper">
        <el-form :model="queryParams" :rules="rules" ref="coach" label-width="100px" class="demo-ruleForm"
                 @keyup.enter.native="onSubmitCert('coach')">
          <el-form-item label="项目名称" prop="item">
            <el-input v-model="queryParams.item" placeholder="请输入项目名称"></el-input>
          </el-form-item>
          <el-form-item label="等级" prop="level" v-if="queryParams.type===0">
            <el-select v-model="queryParams.level" placeholder="请选择您的级别">
              <el-option v-for="(item,index) in coachGradeColumns" :key="index" :label="item"
                         :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="等级" prop="level" v-else>
            <el-select v-model="queryParams.level" placeholder="请选择您的级别">
              <el-option v-for="(item,index) in refereeGradeColumns" :key="index" :label="item"
                         :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证书编号" prop="certCode">
            <el-input v-model="queryParams.certCode" placeholder="请输入证书编号"></el-input>
          </el-form-item>
          <el-form-item label="核发机构" prop="certSource">
            <el-input v-model="queryParams.certSource" placeholder="请输入核发机构"></el-input>
          </el-form-item>
          <el-form-item label="证书日期" prop="certTime">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择证书日期" v-model="queryParams.certTime" style="width: 100%;"
                              format="yyyy 年 MM 月 dd 日"
                              value-format="yyyy-MM-dd"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="地区" prop="province">
            <el-cascader
                size="large"
                :options="options"
                v-model="selectedOptions"
                @change="handleChange">
            </el-cascader>
          </el-form-item>
          <el-form-item label="履历" class='resume'>
            <img src="../../assets/image/addResume.png" alt="" class="uploadIcon" @click="addItem">
          </el-form-item>
          <div class="resumeWrapper">
            <div v-for="(item,index) in certResumeList" :key="index">
              <el-form-item label="时间"

              >
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="选择时间" style="width: 100%;"
                                  format="yyyy 年 MM 月 dd 日"
                                  value-format="yyyy-MM-dd"
                                  v-model="item.time"
                  ></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="内容">
                <el-input type="textarea" placeholder="请输入内容" v-model="item.content"></el-input>
                <i class="el-icon-delete" @click="deleteItem(item, index)"></i>
              </el-form-item>
            </div>
          </div>
          <el-form-item label="证书上传" class="upload" prop="certImg">
            <el-upload
                v-model="queryParams.certImg"
                class="avatar-uploader"
                action="http://wushu.sportsit.cn:8080/upload/uploadImage"
                :show-file-list="false"
                :on-success="handleAvatarSuccessCoach"
            >
              <img v-if="queryParams.certImg" :src="queryParams.certImgs[0].url" class="avatar">
              <img v-else src="../../assets/image/upload.png" alt="" class="uploadIcon">
              <!--              <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
              <!--                  <div slot="tip" class="el-upload__tip">(本照片将用于制作证件300*420 px)</div>-->
            </el-upload>
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" @click="onSubmitCert('coach')">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {regionData, CodeToText} from 'element-china-area-data'
import {uploadImage, addOrUpdUserCert, checkUserMember, getUserProfile} from "@/api/user";

export default {

  data() {
    return {
      options: regionData,
      selectedOptions: [],
      userInfo: {},
      //注册教练信息
      certResumeList: [],
      queryParams: {
        type: null,
        id: "",
        item: "",
        level: "",
        certCode: "",
        certSource: "",
        certTime: "",
        certResume: '',
        certImg: "",
        certImgs: [],
        province: '',
        resumes: [],
      },
      coachGradeColumns: ["国家级", "高级", "一级", "二级", "三级"],
      refereeGradeColumns: ["国际级", "国家级", "一级", "二级", "三级"],
      rules: {
        item: [
          {required: true, message: '请填写项目名称！', trigger: 'blur'},
        ],
        level: [
          {required: true, message: '等级不能为空！', trigger: 'blur'},
        ],
        certCode: [
          {required: true, message: '请填写证书编号！', trigger: 'blur'},
        ],
        certTime: [
          {required: true, message: '请选择证书日期', trigger: 'blur'},
        ],
        certSource: [
          {required: true, message: '请填写核发机构', trigger: 'blur'},
        ],
        province: [
          {required: true, message: '地区不能为空', trigger: 'blur'},
        ],
        certImg: [
          {required: true, message: '请上传证书', trigger: 'blur'},
        ]
      }
    }
  },
  created() {
    this.queryParams.type = this.$route.query.crType
  },
  // watch: {
  //   $route() {
  //     this.queryParams.type = this.$route.query.crType
  //     if (this.queryParams.type == 0 || this.queryParams.type == 1) {
  //       this.init()
  //     }
  //   }
  // },
  mounted() {
    this.checkUserMembers()
    getUserProfile().then((res) => {
      let self = this
      if (res.code == 200) {
        window.sessionStorage.setItem("user", JSON.stringify(res.data));
        if (res.data.userType == 1) {
          self.userInfo = res.data.userInfo
          if (self.userInfo.identityCode == null) {
            self.$message('请先完善个人信息')
            self.$router.push('/myuser')
          } else {
            self.$set(self.userInfo, "avatars", [
              {url: self.loadUrl(self.userInfo.avatar)},
            ]);
          }

          if (self.queryParams.type === '0') {
            if (res.data.coachInfo.length > 0) {
              self.queryParams = res.data.coachInfo[res.data.coachInfo.length - 1];
              self.$set(self.queryParams, "certImgs", [
                {url: self.loadUrl(self.queryParams.certImg)},
              ]);
            }
          }else if(self.queryParams.type === '1'){
            if (res.data.refereeInfo.length > 0) {
              self.queryParams = res.data.refereeInfo[res.data.refereeInfo.length - 1];
              self.$set(self.queryParams, "certImgs", [
                {url: self.loadUrl(self.queryParams.certImg)},
              ]);
            }
          }
        }
      } else {
        self.$message(res.mes)
      }
    })


  },

  methods: {
    checkUserMembers() {
      const self = this;
      checkUserMember({sign: "wx"}).then((res) => {
        if (res.code == 200) {
          if (!res.data.isMember) {
            self.show = true;
          }
        } else {
          self.$message(res.msg);
          setTimeout(() => {
            self.$router.push("/login");
          }, 3000);
        }
      });
    },
    //履历新增删除
    addItem() {
      this.certResumeList.push({
        certResumeTime: '',
        certResumeName: ''
      })
    },
    deleteItem(item, index) {
      this.certResumeList.splice(index, 1)
    },
    //选择地区
    handleChange(value) {
      let self = this;
      let provinceCode = CodeToText[self.selectedOptions[0]].concat('/');
      let cityCode = CodeToText[self.selectedOptions[1]].concat('/');
      let countyCode = CodeToText[self.selectedOptions[2]];

      // CodeToText属性是区域码，属性值是汉字 CodeToText['110000']输出北京市
      self.queryParams.province = provinceCode.concat(cityCode, countyCode)
      // self.coach.city = cityCode
      // self.coach.county = countyCode
    },
    //上传头像
    handleAvatarSuccessCoach(res, file) {
      this.queryParams.certImg = URL.createObjectURL(file.raw);
      let self = this
      let formData = new FormData()
      formData.append('file', file.raw)
      uploadImage(formData).then((res) => {
        if (res.code == 200) {
          setTimeout(() => {
            let str = res.fileName
            file.name = str
            self.queryParams.certImg = str;
            self.queryParams.certImgs[0] = {url: self.loadUrl(str)};
            file.status = "done";
            file.message = "上传成功";
          }, 1000)
        } else {
          self.$message(res.msg);
        }
      })
    },

    //上传表单
    onSubmitCert(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let self = this;
          self.queryParams.resumes = self.certResumeList
          let parms = self.queryParams

          setTimeout(() => {
            if (parms.certImgs.length == 0) {
              self.$message("证书不能为空！");
              return false;
            }
          }, 30);

          addOrUpdUserCert(parms).then((res) => {
            parms = "";
            if (res.code == 200) {
              self.$message(res.msg);
              self.$router.push("/");
            } else {
              self.$message(res.msg);
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },


  }
}
</script>

<style lang="scss" scoped>
.content {
  width: 1200px;
  margin: 40px auto;
  background-color: #fff;
  //padding-top: 20px;
  //box-shadow: 0 8px 29px 0 #b8b8c4;
  //border-radius: 10px;
  .back {
    padding: 20px 0 0 20px;
    display: inline-block;
    color: #555;
    a{
      font-size: 14px;
      color: #555;
    }
  }

  .user-head {
    text-align: center;
    padding: 16px 0;

    .block {
      ::v-deep .el-avatar {
        width: 100px !important;
        height: 100px !important;
        border: solid 8px #fff;
        box-shadow: -6px 6px 20px #eee;

        img {
          width: 100%;
          object-fit: fill;

        }
      }
    }

    .name {
      padding: 10px 0;
      display: block;
      color: #1a1613;
      font-size: 20px;
    }

    .tel {
      display: block;
      color: #999;
      font-size: 14px;
    }
  }

  .wrapper {
    width: 800px;
    margin: 0 auto;

    .demo-ruleForm {
      margin: 12px auto 6px auto;
      width: 800px;
      padding-left: 26px;
      margin-left: 66px;

      .el-input {
        position: relative;
        font-size: 14px;
        display: inline-block;
        width: 80%;
      }

      .el-textarea {
        position: relative;
        display: inline-block;
        width: 290px;
        vertical-align: bottom;
        font-size: 14px;
      }
      .el-icon-delete{
        padding-left: 6px;
      }
    }
  }
}
.resume {

  img {
    width: 30px;
    height: 30px;
    object-fit: cover;
    margin-left: 6px;
    margin-top: 8px;
  }

}

.resumeWrapper {
  margin-left: 43px;
}
</style>
<style lang="scss" scoped>
.btn {
  margin-top: 8px;
  padding-bottom: 34px;

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