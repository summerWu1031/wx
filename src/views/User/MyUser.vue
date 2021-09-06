<template>
  <div class="login">
    <div class="content">
      <div class="user-head">
        <div class="block">
          <el-avatar :size="50" :src="loadUrl(userInfo.avatar)"></el-avatar>
        </div>
        <span class="name"> {{ userInfo.userName }}</span>
        <span class="tel">{{ userInfo.phonenumber }}</span>
      </div>
      <template >
            <el-form :model="basic" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="真实姓名" prop="name">
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
                  <el-radio label="0"  >自主入会</el-radio>
                  <el-radio label="1" >推荐入会</el-radio>
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
              <el-form-item label="证件照" prop="avatar">
                <el-upload
                    v-model="basic.avatar"
                    class="avatar-uploader"
                    :action="imgUrl"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                  <img v-if="basic.avatar" :src="basic.avatar" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  <div slot="tip" class="el-upload__tip">(本照片将用于制作证件300*420 px)</div>
                </el-upload>
              </el-form-item>
              <el-form-item label="详细地址" >
                <el-input v-model="basic.area" placeholder="请输入详细地址"></el-input>
              </el-form-item>
              <el-form-item label="电子邮箱" >
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
              <el-form-item label="武术专长" >
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
            </el-form>

      </template>
    </div>
  </div>
</template>

<script >
import { regionData,CodeToText } from 'element-china-area-data'
import {updUserInfo, uploadImage, getSourceOrgName, login} from "@/api/user";
export default {
 data(){
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
     imgUrl:'',
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
       sourceOrgType:'0',
       sourceOrgName:'',
       nation: "",
       speciality: "",
       culture: ""
     },
     rules: {
       name: [
         {required: true, message: '请填写真实姓名!', trigger: 'blur'},
       ],
       identityCode: [
         { required: true, message: '身份证不能为空！' },
         {min:18,max:18,message: '请输入正确的身份证号码'}
       ],
       sex: [
         {required: true, message: '请选择性别!', trigger: 'blur'},
       ],
       memberName:[
         {required: true, message: '请选择会员类型!', trigger: 'blur'},
       ],
       sourceOrgType:[
         {required: true, message: '请选择入会类型!', trigger: 'blur'},
       ],
       phonenumber: [
         {required: true, message: '手机号码不能为空！'},
         {validator: formatter, trigger: 'blur'}
       ],
       province: [
         { required: true, message: '所在区域不能为空！' },
       ],
       avatar:[
         { required: true, message: '证件照不能为空！' }
       ]
     },
     nationActions: [
       { label: "汉族", value: "01" },
       { label: "蒙古族", value: "02" },
       { label: "回族", value: "03" },
       { label: "藏族", value: "04" },
       { label: "维吾尔族", value: "05" },
       { label: "苗族", value: "06" },
       { label: "彝族", value: "07" },
       { label: "壮族", value: "08" },
       { label: "布依族", value: "09" },
       { label: "朝鲜族", value: "10" },
       { label: "满族", value: "11" },
       { label: "侗族", value: "12" },
       { label: "瑶族", value: "13" },
       { label: "白族", value: "14" },
       { label: "土家族", value: "15" },
       { label: "哈尼族", value: "16" },
       { label: "哈萨克族", value: "17" },
       { label: "傣族", value: "18" },
       { label: "黎族", value: "19" },
       { label: "傈僳族", value: "20" },
       { label: "佤族", value: "21" },
       { label: "畲族", value: "22" },
       { label: "高山族", value: "23" },
       { label: "拉祜族", value: "24" },
       { label: "水族", value: "25" },
       { label: "东乡族", value: "26" },
       { label: "纳西族", value: "27" },
       { label: "景颇族", value: "28" },
       { label: "柯尔克孜族", value: "29" },
       { label: "土族", value: "30" },
       { label: "达斡尔族", value: "31" },
       { label: "仫佬族", value: "32" },
       { label: "羌族", value: "33" },
       { label: "布朗族", value: "34" },
       { label: "毛难族", value: "36" },
       { label: "仡佬族", value: "37" },
       { label: "锡伯族", value: "38" },
       { label: "阿昌族", value: "39" },
       { label: "普米族", value: "40" },
       { label: "塔吉克族", value: "41" },
       { label: "怒族", value: "42" },
       { label: "乌孜别克族", value: "43" },
       { label: "俄罗斯族", value: "44" },
       { label: "鄂温克族", value: "45" },
       { label: "崩龙族", value: "46" },
       { label: "保安族", value: "47" },
       { label: "裕固族", value: "48" },
       { label: "京族", value: "49" },
       { label: "塔塔尔族", value: "50" },
       { label: "独龙族", value: "51" },
       { label: "鄂伦春族", value: "52" },
       { label: "赫哲族", value: "53" },
       { label: "门巴族", value: "54" },
       { label: "珞巴族", value: "55" },
       { label: "基诺族", value: "56" },
       { label: "其他", value: "57" },
       { label: "外国血统中国人士", value: "58" },
     ],
     cultureActions:[
       { label: "博士", value: "01" },
       { label: "硕士", value: "02" },
       { label: "本科", value: "03" },
       { label: "大专", value: "04" },
       { label: "高中", value: "05" },
       { label: "初中", value: "06" },
       { label: "小学", value: "07" },
     ]
   }
 },
  computed: {
    userinfo() {
      return this.$store.state.userinfo;
    }
  },
  methods:{
   //选择地区
    handleChange (value) {
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
    upLoadUrl(){

    },
    handleAvatarSuccess(res, file) {
      this.basic.avatar = URL.createObjectURL(file.raw);
      console.log(this.basic.avatar)

    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG && !isPNG) {
      //   this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      let self = this;
      let formData = new FormData(); //构造一个 FormData，把后台需要发送的参数添加
      formData.append("file", file); //接口需要传的参数
      console.log(formData)
      uploadImage(formData).then((res) => {
        if (res.code == 200) {
          console.log(res)
             self.imgUrl = res.url
        } else {
          self.$message(res.msg);
        }

      })

    }
  }

}
</script>

<style lang="scss" scoped>

</style>