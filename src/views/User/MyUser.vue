<template>
  <div class="myuser">
    <div class="content">
      <div class="user-head">
        <div class="block">
          <el-avatar :size="50" :src="loadUrl(userInfo.avatar)"></el-avatar>
        </div>
        <span class="name"> {{ userInfo.userName }}</span>
        <span class="tel">{{ userInfo.phonenumber }}</span>
      </div>
      <div class="wrapper">
        <el-form :model="basic" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="真实姓名" prop="userName">
            <el-input v-model="basic.userName" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证" prop="identityCode">
            <el-input v-model="basic.identityCode" placeholder="请输入身份证"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="basic.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机号码" prop="phonenumber">
            <el-input v-model="basic.phonenumber" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="会员类型" prop="memberName">
            <el-radio-group v-model="basic.memberName">
              <el-radio label="普通会员"></el-radio>
              <el-radio label="学生会员"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="所在区域" prop="province">
            <el-cascader
                size="large"
                :options="options"
                v-model="selectedOptions"
                @change="handleChange">
            </el-cascader>
          </el-form-item>
          <el-form-item label="入会类型" prop="sourceOrgType">
            <el-radio-group v-model="basic.sourceOrgType">
              <el-radio label="0">自主入会</el-radio>
              <el-radio label="1">推荐入会</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="推荐单位" v-show="basic.sourceOrgType=='1'">
            <el-select v-model="basic.sourceOrgName" placeholder="请选择活动区域">
              <el-option label="穗体信息科技" value="穗体"></el-option>
              <el-option label="韶关市武术协会" value="韶关武协"></el-option>
              <el-option label="广东武术协会" value="wx"></el-option>
              <el-option label="2021年羊城运动汇" value="羊城"></el-option>
              <el-option label="广东省体育基金会" value="体育基金会"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件照" prop="avatar" class="upload">
            <el-upload
                @click="getType('basic')"
                v-model="basic.avatar"
                class="avatar-uploader"
                action="http://wushu.sportsit.cn:8080/upload/uploadImage"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
              <img v-if="basic.avatar" :src="imageUrl" class="avatar">
              <img v-else src="../../assets/image/upload.png" alt="" class="uploadIcon">
<!--              <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
              <div slot="tip" class="el-upload__tip">(本照片将用于制作证件300*420 px)</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input v-model="basic.area" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <el-input v-model="basic.email" placeholder="请输入电子邮箱"></el-input>
          </el-form-item>
          <el-form-item label="民族">
            <el-select v-model="basic.nation" placeholder="选择您民族">
              <el-option
                  v-for="item in nationActions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="武术专长">
            <el-input v-model="basic.speciality" placeholder="请输入武术专长"></el-input>
          </el-form-item>
          <el-form-item label="文化程度">
            <el-select v-model="basic.culture" placeholder="选择您民族">
              <el-option
                  v-for="item in cultureActions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          </el-form-item>
        </el-form>

      </div>
    </div>
  </div>
</template>

<script>
import {regionData, CodeToText} from 'element-china-area-data'
import {updUserInfo, uploadImage, getSourceOrgName, login} from "@/api/user";

export default {
  data() {
    let formatter = (rule, value, callback) => {
      // const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
      const reg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
      if (!value) return "";
      if (!reg.test(value)) {
        callback(new Error('请输入正确的手机号码'));
      } else {
        callback()
      }
    }
    return {
      options: regionData,
      selectedOptions: [],
      userInfo: {},
      cType: "",
      imageUrl: "",
      basic: {
        playerLv: "",
        nickName: "",
        userName: "",
        sex: "1",
        phonenumber: "",
        email: "",
        identityCode: "",
        birthday: "",
        province: "",
        city: "",
        county: "",
        street: "",
        area: "",
        avatars: [],
        avatar: "",

        // 会员申请元素
        sourceOrgType: "0",
        memberName: "",
        memberId: 0,
        goodsPrice: "",
        sourceOrgName: "",
        searchSourceOrgName: "",
        sourceOrgId: 0,
        nation: "",
        speciality: "",
        culture: "",
        memberApply: {
          sourceOrgType: "0",
          sign: "wx",
          memberName: "",
          memberId: 0,
          goodsPrice: "",
          sourceOrgName: "",
          searchSourceOrgName: "",
          sourceOrgId: 0,
          nation: "",
          speciality: "",
          culture: "",
        },
      },
      rules: {
        userName: [
          {required: true, message: '请填写真实姓名!', trigger: 'blur'},
        ],
        identityCode: [
          {required: true, message: '身份证不能为空！'},
          {min: 18, max: 18, message: '请输入正确的身份证号码'}
        ],
        sex: [
          {required: true, message: '请选择性别!', trigger: 'blur'},
        ],
        memberName: [
          {required: true, message: '请选择会员类型!', trigger: 'blur'},
        ],
        sourceOrgType: [
          {required: true, message: '请选择入会类型!', trigger: 'blur'},
        ],
        phonenumber: [
          {required: true, message: '手机号码不能为空！'},
          {validator: formatter, trigger: 'blur'}
        ],
        province: [
          {required: true, message: '所在区域不能为空！'},
        ],
        avatar: [
          {required: true, message: '证件照不能为空！'}
        ]
      },
      nationActions: [
        {label: "汉族", value: "01"},
        {label: "蒙古族", value: "02"},
        {label: "回族", value: "03"},
        {label: "藏族", value: "04"},
        {label: "维吾尔族", value: "05"},
        {label: "苗族", value: "06"},
        {label: "彝族", value: "07"},
        {label: "壮族", value: "08"},
        {label: "布依族", value: "09"},
        {label: "朝鲜族", value: "10"},
        {label: "满族", value: "11"},
        {label: "侗族", value: "12"},
        {label: "瑶族", value: "13"},
        {label: "白族", value: "14"},
        {label: "土家族", value: "15"},
        {label: "哈尼族", value: "16"},
        {label: "哈萨克族", value: "17"},
        {label: "傣族", value: "18"},
        {label: "黎族", value: "19"},
        {label: "傈僳族", value: "20"},
        {label: "佤族", value: "21"},
        {label: "畲族", value: "22"},
        {label: "高山族", value: "23"},
        {label: "拉祜族", value: "24"},
        {label: "水族", value: "25"},
        {label: "东乡族", value: "26"},
        {label: "纳西族", value: "27"},
        {label: "景颇族", value: "28"},
        {label: "柯尔克孜族", value: "29"},
        {label: "土族", value: "30"},
        {label: "达斡尔族", value: "31"},
        {label: "仫佬族", value: "32"},
        {label: "羌族", value: "33"},
        {label: "布朗族", value: "34"},
        {label: "毛难族", value: "36"},
        {label: "仡佬族", value: "37"},
        {label: "锡伯族", value: "38"},
        {label: "阿昌族", value: "39"},
        {label: "普米族", value: "40"},
        {label: "塔吉克族", value: "41"},
        {label: "怒族", value: "42"},
        {label: "乌孜别克族", value: "43"},
        {label: "俄罗斯族", value: "44"},
        {label: "鄂温克族", value: "45"},
        {label: "崩龙族", value: "46"},
        {label: "保安族", value: "47"},
        {label: "裕固族", value: "48"},
        {label: "京族", value: "49"},
        {label: "塔塔尔族", value: "50"},
        {label: "独龙族", value: "51"},
        {label: "鄂伦春族", value: "52"},
        {label: "赫哲族", value: "53"},
        {label: "门巴族", value: "54"},
        {label: "珞巴族", value: "55"},
        {label: "基诺族", value: "56"},
        {label: "其他", value: "57"},
        {label: "外国血统中国人士", value: "58"},
      ],
      cultureActions: [
        {label: "博士", value: "01"},
        {label: "硕士", value: "02"},
        {label: "本科", value: "03"},
        {label: "大专", value: "04"},
        {label: "高中", value: "05"},
        {label: "初中", value: "06"},
        {label: "小学", value: "07"},
      ]
    }
  },
  computed: {
    userinfo() {
      return this.$store.state.userinfo;
    }
  },
  mounted() {
    // let self = this;
    this.userInfo = JSON.parse(window.sessionStorage.getItem('user')).userInfo

    console.log(this.userInfo)
    // console.log(this.userinfo)
    // if (!self.userInfo.updateTime) {
    //   self.basic.userName = self.userInfo.userName;
    //   self.basic.phonenumber = self.userInfo.phonenumber;
    //   self.basic.identityCode = self.userInfo.identityCode;
    //   self.basic.sex = self.userInfo.sex;
    //   self.$set(self.basic, "avatars", [
    //     { url: self.loadUrl(self.userInfo.avatar) },
    //   ]);
    //
    //   self.$set(self.basic, "memberName", self.userInfo.memberName);
    //   self.$set(self.basic, "sourceOrgType", self.userInfo.sourceOrgType);
    //
    // } else {
    //   self.basic = self.userInfo;
    //   self.$set(
    //       self.basic,
    //       "memberApply",
    //       Object.assign(
    //           {},
    //           {
    //             sign: "wx",
    //             memberName: "",
    //             memberId: 0,
    //             goodsPrice: "",
    //             sourceOrgName: "",
    //             searchSourceOrgName: "",
    //             sourceOrgId: 0,
    //             nation: "",
    //             speciality: "",
    //             culture: "",
    //           }
    //       )
    //   );
    //   self.$set(self.basic, "avatars", [
    //     {url: self.loadUrl(self.basic.avatar)},
    //   ]);
    // }
  },
  methods: {
    getType(type) {
      this.cType = type;
    },
    //选择地区
    handleChange(value) {
      let self = this;
      let provinceCode = self.selectedOptions[0];
      let cityCode = self.selectedOptions[1];
      let countyCode = self.selectedOptions[2]
      // CodeToText属性是区域码，属性值是汉字 CodeToText['110000']输出北京市
      self.basic.province = CodeToText[provinceCode];
      self.basic.city = CodeToText[cityCode];
      self.basic.county = CodeToText[countyCode];
    },

    // 上传头像
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      let self = this
      let formData = new FormData()
      formData.append('file', file.raw)
      uploadImage(formData).then((res) => {
        if (res.code == 200) {
          console.log(res)
          setTimeout(() => {
            let str = res.fileName
            file.name = str
            self.basic.avatar = str;
            self.basic.avatars[0] = {url: self.loadUrl(str)};
            file.status = "done";
            file.message = "上传成功";
          }, 1000)
        } else {
          self.$message(res.msg);
        }
      })

    },
    beforeAvatarUpload(file) {
      const isSize = new Promise(function (resolve, reject) {
        let width = 300
        let height = 420
        let _URL = window.URL || window.webkitURL
        let img = new Image()
        img.onload = function () {
          let valid = img.width == width && img.height == height;
          valid ? resolve() : reject();
        }
        img.src = _URL.createObjectURL(file);
      })
          .then(
              () => {
                return file;
              },
              () => {
                this.$message({
                  message: '图片尺寸只能是300*420px!请重新选择!',
                  type: 'warning'
                })
                return Promise.reject()
                return false
              })
      return isSize
    },

    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let self = this
          let param = self.basic
          // 会员申请元素
          self.basic.memberApply.memberName = self.basic.memberName;
          self.basic.memberApply.memberId = self.basic.memberId;
          self.basic.memberApply.goodsPrice = self.basic.goodsPrice;
          self.basic.memberApply.nation = self.basic.nation;
          self.basic.memberApply.speciality = self.basic.speciality;
          self.basic.memberApply.culture = self.basic.culture;
          self.basic.memberApply.sourceOrgType = self.basic.sourceOrgType;

          if (self.basic.sourceOrgType == "0") {
            self.basic.memberApply.sourceOrgName = null;
            self.basic.memberApply.sourceOrgId = null;
          } else {
            self.basic.memberApply.sourceOrgName = self.basic.sourceOrgName;
            self.basic.memberApply.sourceOrgId = self.basic.sourceOrgId;
          }
          param.sign = "wx";
          console.log(param)
          updUserInfo(param).then((res) => {
            if (res.code === 200) {
              self.$message(res.msg)
              self.$router.push('/helloworld')
            } else {
              self.$message(res.msg)
            }
          })

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
  box-shadow: 0 8px 29px 0 #b8b8c4;
  border-radius: 10px;
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
    width: 674px;
    margin: 0 auto;

    .demo-ruleForm {
      margin: 12px auto 6px auto;
      width: 600px;
      padding-left: 26px;
      margin-left: 66px;
      .el-input {
        position: relative;
        font-size: 14px;
        display: inline-block;
        width: 80%;
      }
    }
  }
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
    span{
      color: #fff;
    }
  }
  ::v-deep .el-button--primary{
    border-color: unset;
  }
}
.upload{
  ::v-deep .el-upload__tip{
    margin-top: -12px;
  }
  img{
    width: 60px;
    height: 60px;
    object-fit: cover;
  }
}
</style>