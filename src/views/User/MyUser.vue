<template>
  <div class="myuser">
    <div class="content">
      <span class="back"> <router-link to="/">&lt; 返回首页</router-link>   </span>
      <div class="user-head">
        <div class="block">
          <el-avatar :size="50" v-model="userInfo.avatars" :src="userInfo.avatars[0].url"></el-avatar>
        </div>
        <span class="name"> {{ userInfo.userName }}</span>
        <span class="tel">{{ userInfo.phonenumber }}</span>
      </div>
      <div class="wrapper">
        <!--        个人-->
        <el-tabs type="card" v-model="activeName" class="formTab" v-if="userType===1">
          <el-tab-pane label="基本信息" name="1">
            <el-form :model="basic" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                     @keyup.enter.native="submitForm('ruleForm',1)">
              <el-form-item label="真实姓名" prop="userName">
                <el-input v-model="basic.userName" placeholder="请输入真实姓名"></el-input>
              </el-form-item>
              <el-form-item label="身份证" prop="identityCode">
                <el-input :disabled="isState !== 0" v-model="basic.identityCode" placeholder="请输入身份证"></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="basic.sex" :disabled="isState !== 0">
                  <el-radio label="1">男</el-radio>
                  <el-radio label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="手机号码" prop="phonenumber">
                <el-input v-model="basic.phonenumber" placeholder="请输入手机号码"></el-input>
              </el-form-item>
              <el-form-item label="会员类型" prop="memberName">
                <el-radio-group v-model="basic.memberName" @change="onMemType">
                  <!--              <el-radio label="普通会员">普通会员</el-radio>-->
                  <!--              <el-radio label="学生会员">学生会员</el-radio>-->
                  <el-radio v-for="(item,index) in MemTypeColumns" :label="item" :key="index">{{ item }}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="所在区域" prop="province">
                <el-cascader
                    size="large"
                    :placeholder="selectedOptions.length==0? '请选择所在区域':selectedOptions"
                    :options="options"
                    v-model="selectedOptions"
                    @change="handleChange()">
                </el-cascader>
              </el-form-item>
              <el-form-item label="入会类型" prop="sourceOrgType">
                <el-radio-group v-model="basic.sourceOrgType" :disabled="isState !== 0">
                  <el-radio label="0">自主入会</el-radio>
                  <el-radio label="1">推荐入会</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="推荐单位" v-show="basic.sourceOrgType=='1'">
                <el-select v-model="basic.sourceOrgName"
                           :placeholder="basic.sourceOrgName==''? '请选择推荐单位':basic.sourceOrgName"
                           :disabled="isState !== 0">
                  <el-option v-for="(item,index) in filterAssociationList" :key="index" :label="item.name"
                             :value="item.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="证件照" prop="avatar" class="upload">
                <el-upload
                    @click="getType('basic')"
                    v-model="basic.avatars"
                    class="avatar-uploader"
                    action="http://wushu.sportsit.cn:8080/upload/uploadImage"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                  <img v-if="basic.avatar" :src="basic.avatars[0].url" class="avatar">
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
                <el-select v-model="basic.nation" placeholder="选择您的民族">
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
                <el-select v-model="basic.culture" placeholder="请选择">
                  <el-option
                      v-for="item in cultureActions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item class="btn">
                <el-button type="primary" @click="submitForm('ruleForm',1)">保存</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="段位信息" name="2">
            <el-form :model="dan" :rules="rules" ref="dan" label-width="100px" class="demo-ruleForm"
                     @keyup.enter.native="onSubmitCert('dan','dan')">
              <el-form-item label="考试项目" prop="item">
                <el-select v-model="dan.item" placeholder="请输入考试项目">
                  <el-option v-for="(item,index) in danItemColumns" :key="index" :label="item"
                             :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="考试点" prop="value">
                <el-select v-model="dan.value" placeholder="请输入考评点">
                  <el-option v-for="(item,index) in filteredAssociationList" :key="index" :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="等级" prop="level">
                <el-select v-model="dan.level" placeholder="请选择您的级别">
                  <el-option v-for="(item,index) in danGradeColumns" :key="index" :label="item"
                             :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="段位编号" prop="certCode">
                <el-input v-model="dan.certCode" placeholder="请输入段位编号"></el-input>
              </el-form-item>
              <el-form-item label="履历">
                <el-input type="textarea" v-model="dan.certResume" placeholder="请输履历"></el-input>
              </el-form-item>
              <el-form-item label="证书上传" class="upload">
                <el-upload
                    @click="getType('dan')"
                    v-model="dan.certImg"
                    class="avatar-uploader"
                    action="http://wushu.sportsit.cn:8080/upload/uploadImage"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccessDan"
                    :before-upload="beforeAvatarUpload">
                  <img v-if="dan.certImg" :src="dan.certImgs[0].url" class="avatar">
                  <img v-else src="../../assets/image/upload.png" alt="" class="uploadIcon">
                  <!--              <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                  <!--                  <div slot="tip" class="el-upload__tip">(本照片将用于制作证件300*420 px)</div>-->
                </el-upload>
              </el-form-item>
              <el-form-item class="btn">
                <el-button type="primary" @click="onSubmitCert('dan','dan')">保存</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="运动员等级信息" name="3">
            <el-form :model="player" :rules="rules" ref="player" label-width="100px" class="demo-ruleForm"
                     @keyup.enter.native="onSubmitCert('player','player')">
              <el-form-item label="运动员等级" prop="playerLv">
                <el-select v-model="player.playerLv" placeholder="请选择您的级别" @change="selectedPlayerLevel">
                  <el-option v-for="(item,index) in athletesGradeColumns" :key="index" :label="item"
                             :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="审批单位" prop="certSource">
                <el-input v-model="player.certSource" placeholder="请输入审批单位"></el-input>
              </el-form-item>
              <el-form-item label="审批日期" prop="certTime">
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="选择审批日期" v-model="player.certTime" style="width: 100%;"
                                  format="yyyy 年 MM 月 dd 日"
                                  value-format="yyyy-MM-dd"></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="履历">
                <el-input type="textarea" v-model="player.certResume" placeholder="请输履历"></el-input>
              </el-form-item>
              <el-form-item label="证书上传" class="upload" prop="certImg">
                <el-upload
                    @click="getType('player')"
                    v-model="player.certImg"
                    class="avatar-uploader"
                    action="http://wushu.sportsit.cn:8080/upload/uploadImage"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccessPlayer"
                    :before-upload="beforeAvatarUpload">
                  <img v-if="player.certImg" :src="player.certImgs[0].url" class="avatar">
                  <img v-else src="../../assets/image/upload.png" alt="" class="uploadIcon">
                  <!--              <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                  <!--                  <div slot="tip" class="el-upload__tip">(本照片将用于制作证件300*420 px)</div>-->
                </el-upload>
              </el-form-item>
              <el-form-item class="btn">
                <el-button type="primary" @click="onSubmitCert('player','player')">保存</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>

        </el-tabs>
        <!--团体-->
        <el-form v-else :model="unitBasic" :rules="rules" ref="unit" label-width="100px" class="demo-ruleForm"
                 @keyup.enter.native="submitForm('unit',2)">
          <el-form-item label="单位名称" prop="userName">
            <el-input v-model="unitBasic.name" placeholder="请输入单位名称"></el-input>
          </el-form-item>
          <el-form-item label="联系人" prop="principal">
            <el-input v-model="unitBasic.principal" placeholder="请输入联系人"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="unitBasic.phone" placeholder="请输入联系电话"></el-input>
          </el-form-item>
          <el-form-item label="统一社会信用代码" prop="creditCode">
            <el-input v-model="unitBasic.creditCode" placeholder="请输入统一社会信用代码"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <el-input v-model="unitBasic.email" placeholder="请输入电子邮箱"></el-input>
          </el-form-item>
          <el-form-item label="所在区域" prop="province">
            <el-cascader
                size="large"
                :placeholder="selectedOptions.length==0? '请选择所在区域':selectedOptions"
                :options="options"
                v-model="selectedOptions"
                @change="handleChange()">
            </el-cascader>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input v-model="unitBasic.area" placeholder="请输入详细地址"></el-input>
          </el-form-item>
          <el-form-item label="介绍" >
            <el-input type="textarea" class="intro" v-model="unitBasic.introduction" placeholder="请输入介绍"></el-input>
          </el-form-item>
          <el-form-item label="章程" >
            <el-input type="textarea" v-model="unitBasic.constitution" placeholder="请输入章程"></el-input>
          </el-form-item>
          <el-form-item label="营业执照上传" prop="licenses" class="upload">
            <el-upload
                @click="getType('licenses')"
                v-model="unitBasic.licenses"
                class="avatar-uploader"
                action="http://wushu.sportsit.cn:8080/upload/uploadImage"
                :show-file-list="false"
                :on-success="handleAvatarSuccessLicenses"
                :before-upload="beforeAvatarUpload">
              <img v-if="unitBasic.licenses" :src="unitBasic.licenses[0].url" class="avatar">
              <img v-else src="../../assets/image/upload.png" alt="" class="uploadIcon">
              <!--              <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
            </el-upload>
          </el-form-item>
          <el-form-item label="证件照" prop="img" class="upload">
            <el-upload
                @click="getType('unitBasic')"
                v-model="unitBasic.img"
                class="avatar-uploader"
                action="http://wushu.sportsit.cn:8080/upload/uploadImage"
                :show-file-list="false"
                :on-success="handleAvatarSuccessUnit"
                :before-upload="beforeAvatarUpload">
              <img v-if="unitBasic.img" :src="unitBasic.avatars[0].url" class="avatar">
              <img v-else src="../../assets/image/upload.png" alt="" class="uploadIcon">
              <!--              <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
            </el-upload>
          </el-form-item>
          <el-form-item class="btn">
            <el-button type="primary" @click="submitForm('unit',2)">保存</el-button>
          </el-form-item>
        </el-form>

      </div>
    </div>
  </div>
</template>

<script>
import {regionData, CodeToText} from 'element-china-area-data'

import {
  updUserInfo,
  uploadImage,
  getUserProfile,
  addOrUpdUserCert,
  checkUserIsOrgMember,
  queryCenterApplyMemberList,
  queryAssociationList,
} from "@/api/user";
import {queryDictListByTypeList} from "@/api/dict";

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
      userType: null,
      activeName: '1',
      options: regionData,
      selectedOptions: [],
      user: {},
      userInfo: {},
      cId: 0,
      cType: "",
      unitBasic: {
        name: "",
        principal: "",
        phone: "",
        email: "",
        creditCode: "",
        province: "",
        city: "",
        county: "",
        area: "",
        introduction: "",
        constitution: "",
        license: "",
        licenses: [],
        img: "",
        avatars: [],
      },
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
        sourceOrgType: null,
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
        ],
        item: [
          {required: true, message: '考试项目不能为空！'}
        ],
        value: [
          {required: true, message: '考试点不能为空！'}
        ],
        level: [
          {required: true, message: '等级不能为空！'}
        ],
        certCode: [
          {required: true, message: '段位编号不能为空！'}
        ],
        certImg: [
          {required: true, message: '请上传证书！'}
        ],
        certSource: [
          {required: true, message: '审批单位不能为空！'}
        ],
        certTime: [
          {required: true, message: '审批时间不能为空！'}
        ],
        playerLv: [
          {required: true, message: '等级不能为空！'}
        ],
        name: [
          {required: true, message: '请填写单位名称!', trigger: 'blur'},
        ],
        principal: [
          {required: true, message: '请填写联系人'}
        ],
        phone: [
          {required: true, message: '请填写联系电话'}
        ],
        introduction: [
          {required: true, message: '请填写介绍'},
          {required: true, max: 600, message: '字数限制为600字'}
        ],
        constitution: [
          {required: true, message: '请填写章程'},
          {required: true, max: 500, message: '字数限制为500字'}
        ]
      },
      nationActions: [
        {label: "汉族", value: "汉族"},
        {label: "蒙古族", value: "蒙古族"},
        {label: "回族", value: "回族"},
        {label: "藏族", value: "藏族"},
        {label: "维吾尔族", value: "维吾尔族"},
        {label: "苗族", value: "苗族"},
        {label: "彝族", value: "彝族"},
        {label: "壮族", value: "壮族"},
        {label: "布依族", value: "布依族"},
        {label: "朝鲜族", value: "朝鲜族"},
        {label: "满族", value: "满族"},
        {label: "侗族", value: "侗族"},
        {label: "瑶族", value: "瑶族"},
        {label: "白族", value: "白族"},
        {label: "土家族", value: "土家族"},
        {label: "哈尼族", value: "哈尼族"},
        {label: "哈萨克族", value: "哈萨克族"},
        {label: "傣族", value: "傣族"},
        {label: "黎族", value: "黎族"},
        {label: "傈僳族", value: "傈僳族"},
        {label: "佤族", value: "佤族"},
        {label: "畲族", value: "畲族"},
        {label: "高山族", value: "高山族"},
        {label: "拉祜族", value: "拉祜族"},
        {label: "水族", value: "水族"},
        {label: "东乡族", value: "东乡族"},
        {label: "纳西族", value: "纳西族"},
        {label: "景颇族", value: "景颇族"},
        {label: "柯尔克孜族", value: "柯尔克孜族"},
        {label: "土族", value: "土族"},
        {label: "达斡尔族", value: "达斡尔族"},
        {label: "仫佬族", value: "仫佬族"},
        {label: "羌族", value: "羌族"},
        {label: "布朗族", value: "布朗族"},
        {label: "毛难族", value: "毛难族"},
        {label: "仡佬族", value: "仡佬族"},
        {label: "锡伯族", value: "锡伯族"},
        {label: "阿昌族", value: "阿昌族"},
        {label: "普米族", value: "普米族"},
        {label: "塔吉克族", value: "塔吉克族"},
        {label: "怒族", value: "怒族"},
        {label: "乌孜别克族", value: "乌孜别克族"},
        {label: "俄罗斯族", value: "俄罗斯族"},
        {label: "鄂温克族", value: "鄂温克族"},
        {label: "崩龙族", value: "崩龙族"},
        {label: "保安族", value: "保安族"},
        {label: "裕固族", value: "裕固族"},
        {label: "京族", value: "京族"},
        {label: "塔塔尔族", value: "塔塔尔族"},
        {label: "独龙族", value: "独龙族"},
        {label: "鄂伦春族", value: "鄂伦春族"},
        {label: "赫哲族", value: "赫哲族"},
        {label: "门巴族", value: "门巴族"},
        {label: "珞巴族", value: "珞巴族"},
        {label: "基诺族", value: "基诺族"},
        {label: "其他", value: "其他"},
        {label: "外国血统中国人士", value: "外国血统中国人士"},
      ],
      cultureActions: [
        {label: "博士", value: "博士"},
        {label: "硕士", value: "硕士"},
        {label: "本科", value: "本科"},
        {label: "大专", value: "大专"},
        {label: "高中", value: "高中"},
        {label: "初中", value: "初中"},
        {label: "小学", value: "小学"},
      ],
      // 会员申请元素
      MemTypeShow: false,
      MemTypeColumns: [],
      MemberList: [],
      MemPrice: 0,
      MemParms: {
        sign: "wx",
        memberId: 0,
        type: 1,
      },
      state: "",
      isState: 0,
      associationList: [],
      showUnit: false,
      showculture: false,
      // cultureActions: [],

      //段位信息
      dan: {
        type: 2,
        id: "",
        item: "",
        level: "",
        certCode: "",
        certSource: "",
        certTime: "",
        certResume: "",
        certImg: "",
        certImgs: [],
        name: "",
        value: "",
        searchEvalValue: "",
      },
      danShowItem: false,
      danItemColumns: [
        "陈式太极拳",
        "杨式太极拳",
        "吴式太极拳",
        "武式太极拳",
        "孙式太极拳",
        "长拳",
        "南拳",
        "咏春拳",
        "少林拳",
        "形意拳",
        "八卦拳",
        "通臂拳",
        "翻子拳",
        "八极拳",
        "螳螂拳",
        "五祖拳",
        "自卫防身术",
        "趣味武术",
        "散打",
      ],

      danShowGrade: false,
      danGradeColumns: [
        "段前一段",
        "段前二段",
        "段前三段",
        "段前四段",
        "段前五段",
        "段前六段",
        "段前七段",
        "段前八段",
        "段前九段",
        "一段",
        "二段",
        "三段",
        "四段",
        "五段",
        "六段",
        "七段",
        "八段",
        "九段",
      ],
      showDan: false,
      danAppraisal: [],
      showAppraisal: false,
      errorTextid: "",

      checkbox: true,
      // 考评点
      itemValue: "",
      itemName: "",

      // 运动员信息
      player: {
        type: 3,
        id: "",
        item: "",
        playerLv: "",
        level: "",
        certSource: "",
        certTime: "",
        certResume: "",
        certImg: "",
        certImgs: [],
      },
      athletesGradeColumns: [
        "国际级运动健将",
        "运动健将",
        "一级",
        "二级",
        "三级",
      ],

      //注册教练信息
      coach: {
        type: 0,
        id: "",
        item: "",
        level: "",
        certCode: "",
        certSource: "",
        certTime: "",
        certResume: "",
        certImg: "",
        certImgs: [],
      },
      coachGradeColumns: ["国家级", "高级", "一级", "二级", "三级"],
    }
  },
  created() {
    this.user =JSON.parse(window.sessionStorage.getItem('user'))
  },
  computed: {

    // 计算数学，匹配搜索
    filteredAssociationList() {
      const self = this;
      let searchString = self.dan.searchEvalValue;
      let association_array = self.danAppraisal;
      if (!searchString) {
        return association_array;
      }
      searchString = searchString.trim().toLowerCase();
      association_array = association_array.filter((item) => {
        if (item.name.toLowerCase().indexOf(searchString) !== -1) {
          return item;
        }
      });
      // 返回过来后的数组
      return association_array;
    },

    // hysq
    // 计算数学，匹配搜索
    filteredUnitList() {
      const self = this;
      let searchStringUnit = self.basic.searchSourceOrgName;
      let association_arrayUnit = self.associationList;
      if (!searchStringUnit) {
        return association_arrayUnit;
      }
      searchStringUnit = searchStringUnit.trim().toLowerCase();
      association_arrayUnit = association_arrayUnit.filter((itemUnit) => {
        if (itemUnit.name.toLowerCase().indexOf(searchStringUnit) !== -1) {
          return itemUnit;
        }
      });
      // 返回过来后的数组
      return association_arrayUnit;
    },
    filterAssociationList() {
      const self = this
      let newAssociationList = self.associationList.filter((item) => {
        return item.name
      })
      return newAssociationList
    }
  },

  mounted() {
    let self = this;
    self.userType = self.user.userType
    self.$store.commit("showLoading");
    if (self.userType == 1) {
      self.userInfo = self.user.userInfo
      console.log(self.userInfo)
      if (!self.userInfo.updateTime) {
        self.basic.userName = self.userInfo.userName;
        self.basic.phonenumber = self.userInfo.phonenumber;
        self.basic.identityCode = self.userInfo.identityCode;
        self.basic.sex = self.userInfo.sex;
        self.basic.avatar = self.userInfo.avatar;
        self.$set(self.basic, "avatars", [
          {url: self.loadUrl(self.userInfo.avatar)},
        ]);
        self.$set(self.basic, "memberName", self.userInfo.memberName);
        self.$set(self.basic, "sourceOrgType", self.userInfo.sourceOrgType.toString());
        if (self.basic.province && self.basic.city && self.basic.county) {
          self.selectedOptions = self.basic.province.concat('/', self.basic.city, '/', self.basic.county)
        }
      } else {
        self.basic = self.userInfo;
        if (self.basic.province && self.basic.city && self.basic.county) {
          self.selectedOptions = self.basic.province.concat('/', self.basic.city, '/', self.basic.county)
        }
        self.$set(
            self.basic,
            "memberApply",
            Object.assign(
                {},
                {
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
                }
            )
        );
        self.$set(self.basic, "sourceOrgType", self.userInfo.sourceOrgType.toString());
        self.$set(self.basic, "avatars", [
          {url: self.loadUrl(self.basic.avatar)},
        ]);
      }
      if (self.user.rankInfo.length > 0) {
        self.dan = self.user.rankInfo[0];
        self.itemValue = self.dan.value;
        self.$set(self.dan, "certImgs", [
          {url: self.loadUrl(self.dan.certImg)},
        ]);


      }
      if (self.user.playerInfo.length > 0) {
        self.player = self.user.playerInfo[0];
        self.player.playerLv = self.player.level
        self.$set(self.player, "certImgs", [
          {url: self.loadUrl(self.player.certImg)},
        ]);

      }
    } else {
      self.userInfo = self.user.orgInfo
      let orgInfo = self.userInfo;
      if (!orgInfo.updateTime) {
        self.unitBasic.name = orgInfo.name;
        self.unitBasic.principal = orgInfo.principal;
        self.unitBasic.phone = orgInfo.phone;
        self.unitBasic.creditCode = orgInfo.creditCode;
        if (self.unitBasic.province && self.unitBasic.city && self.unitBasic.county) {
          self.selectedOptions = self.unitBasic.province.concat('/', self.unitBasic.city, '/', self.unitBasic.county)
        }
      } else {
        self.unitBasic = orgInfo;
        self.userInfo.avatar = self.unitBasic.img;
        self.$set(self.unitBasic, "avatars", [
          {url: self.loadUrl(self.unitBasic.img)},
        ]);
        self.$set(self.unitBasic, "licenses", [
          {url: self.loadUrl(self.unitBasic.license)},
        ]);
        if (self.unitBasic.province && self.unitBasic.city && self.unitBasic.county) {
          self.selectedOptions = self.unitBasic.province.concat('/', self.unitBasic.city, '/', self.unitBasic.county)
        }
      }
    }
    this.queryDictListByTypeLists();


    // getUserProfile().then((res) => {
    //   if (res.code == 200) {
    //     window.sessionStorage.setItem("user", JSON.stringify(res.data));
    //     // window.localStorage.setItem("user", JSON.stringify(res.data));
    //
    //     // self.$store.dispatch("saveUserInfo", res.data);
    //
    //     if (res.data.userType == 1) {
    //       self.userInfo = res.data.userInfo
    //       if (!self.userInfo.updateTime) {
    //         self.basic.userName = self.userInfo.userName;
    //         self.basic.phonenumber = self.userInfo.phonenumber;
    //         self.basic.identityCode = self.userInfo.identityCode;
    //         self.basic.sex = self.userInfo.sex;
    //         self.basic.avatar = self.userInfo.avatar;
    //         self.$set(self.basic, "avatars", [
    //           {url: self.loadUrl(self.userInfo.avatar)},
    //         ]);
    //         self.$set(self.basic, "memberName", self.userInfo.memberName);
    //         self.$set(self.basic, "sourceOrgType", self.userInfo.sourceOrgType.toString());
    //         if (self.basic.province && self.basic.city && self.basic.county) {
    //           self.selectedOptions = self.basic.province.concat('/', self.basic.city, '/', self.basic.county)
    //         }
    //       } else {
    //         self.basic = self.userInfo;
    //         if (self.basic.province && self.basic.city && self.basic.county) {
    //           self.selectedOptions = self.basic.province.concat('/', self.basic.city, '/', self.basic.county)
    //         }
    //         self.$set(
    //             self.basic,
    //             "memberApply",
    //             Object.assign(
    //                 {},
    //                 {
    //                   sign: "wx",
    //                   memberName: "",
    //                   memberId: 0,
    //                   goodsPrice: "",
    //                   sourceOrgName: "",
    //                   searchSourceOrgName: "",
    //                   sourceOrgId: 0,
    //                   nation: "",
    //                   speciality: "",
    //                   culture: "",
    //                 }
    //             )
    //         );
    //         self.$set(self.basic, "sourceOrgType", self.userInfo.sourceOrgType.toString());
    //         self.$set(self.basic, "avatars", [
    //           {url: self.loadUrl(self.basic.avatar)},
    //         ]);
    //       }
    //       if (res.data.rankInfo.length > 0) {
    //         self.dan = res.data.rankInfo[0];
    //         self.itemValue = self.dan.value;
    //         self.$set(self.dan, "certImgs", [
    //           {url: self.loadUrl(self.dan.certImg)},
    //         ]);
    //
    //
    //       }
    //       if (res.data.playerInfo.length > 0) {
    //         self.player = res.data.playerInfo[0];
    //         self.player.playerLv = self.player.level
    //         self.$set(self.player, "certImgs", [
    //           {url: self.loadUrl(self.player.certImg)},
    //         ]);
    //
    //       }
    //     } else {
    //       self.userInfo = res.data.orgInfo
    //       let orgInfo = self.userInfo;
    //       if (!orgInfo.updateTime) {
    //         self.unitBasic.name = orgInfo.name;
    //         self.unitBasic.principal = orgInfo.principal;
    //         self.unitBasic.phone = orgInfo.phone;
    //         self.unitBasic.creditCode = orgInfo.creditCode;
    //         if (self.unitBasic.province && self.unitBasic.city && self.unitBasic.county) {
    //           self.selectedOptions = self.unitBasic.province.concat('/', self.unitBasic.city, '/', self.unitBasic.county)
    //         }
    //       } else {
    //         self.unitBasic = orgInfo;
    //         self.userInfo.avatar = self.unitBasic.img;
    //         self.$set(self.unitBasic, "avatars", [
    //           {url: self.loadUrl(self.unitBasic.img)},
    //         ]);
    //         self.$set(self.unitBasic, "licenses", [
    //           {url: self.loadUrl(self.unitBasic.license)},
    //         ]);
    //         if (self.unitBasic.province && self.unitBasic.city && self.unitBasic.county) {
    //           self.selectedOptions = self.unitBasic.province.concat('/', self.unitBasic.city, '/', self.unitBasic.county)
    //         }
    //       }
    //     }
    //   } else {
    //     self.$message(res.mes)
    //   }
    //   this.queryDictListByTypeLists();
    // })
    // this.queryDictListByTypeLists();

    // hysq
    checkUserIsOrgMember({sign: "wx"}).then((res) => {
      if (res.code == 200) {
        const isStaute = (self.state = res.data.isOrgMember);
        self.isState = isStaute;
        // if (isStaute == 0) {
        //   self.getMembershipFee();
        //   self.queryAssociationLists();
        // } else {
        //   // console.log(2);
        // }
        self.getMembershipFee();
        self.queryAssociationLists();
      } else {
        self.$message(res.msg);
        setTimeout(() => {
          self.$router.push("/login");
        }, 3000);
      }
      self.$store.commit("hideLoading");
    });
    //  文化程度
    // this.queryDictListByGrade();
  },
  methods: {
    getType(type) {
      this.cType = type;
    },
    selectedPlayerLevel(value) {
      this.player.level = value
    },
    //选择地区
    handleChange(value) {
      let self = this;

      // CodeToText属性是区域码，属性值是汉字 CodeToText['110000']输出北京市
      if (self.userType === 1) {
        self.basic.province = CodeToText[self.selectedOptions[0]]
        self.basic.city = CodeToText[self.selectedOptions[1]]
        self.basic.county = CodeToText[self.selectedOptions[2]];
      } else {
        self.unitBasic.province = CodeToText[self.selectedOptions[0]]
        self.unitBasic.city = CodeToText[self.selectedOptions[1]]
        self.unitBasic.county = CodeToText[self.selectedOptions[2]];
      }
    },

    // 上传头像
    handleAvatarSuccess(res, file) {
      this.basic.avatar = URL.createObjectURL(file.raw);
      let self = this
      let formData = new FormData()
      formData.append('file', file.raw)
      uploadImage(formData).then((res) => {
        if (res.code == 200) {
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
    handleAvatarSuccessDan(res, file) {
      this.dan.certImg = URL.createObjectURL(file.raw);
      let self = this
      let formData = new FormData()
      formData.append('file', file.raw)
      uploadImage(formData).then((res) => {
        if (res.code == 200) {
          setTimeout(() => {
            let str = res.fileName
            file.name = str
            self.dan.certImg = str;
            self.dan.certImgs[0] = {url: self.loadUrl(str)};
            file.status = "done";
            file.message = "上传成功";
          }, 1000)
        } else {
          self.$message(res.msg);
        }
      })

    },
    handleAvatarSuccessPlayer(res, file) {
      this.player.certImg = URL.createObjectURL(file.raw);
      let self = this
      let formData = new FormData()
      formData.append('file', file.raw)
      uploadImage(formData).then((res) => {
        if (res.code == 200) {
          setTimeout(() => {
            let str = res.fileName
            file.name = str
            self.player.certImg = str;
            self.player.certImgs[0] = {url: self.loadUrl(str)};
            file.status = "done";
            file.message = "上传成功";
          }, 1000)
        } else {
          self.$message(res.msg);
        }
      })
    },
    handleAvatarSuccessLicenses(res, file) {
      this.unitBasic.license = URL.createObjectURL(file.raw);
      let self = this
      let formData = new FormData()
      formData.append('file', file.raw)
      uploadImage(formData).then((res) => {
        if (res.code == 200) {
          setTimeout(() => {
            let str = res.fileName
            file.name = str
            self.unitBasic.license = str;
            self.unitBasic.licenses[0] = {url: self.loadUrl(str)};
            file.status = "done";
            file.message = "上传成功";
          }, 1000)
        } else {
          self.$message(res.msg);
        }
      })
    },
    handleAvatarSuccessUnit(res, file) {
      this.unitBasic.img = URL.createObjectURL(file.raw);
      let self = this
      let formData = new FormData()
      formData.append('file', file.raw)
      uploadImage(formData).then((res) => {
        if (res.code == 200) {
          setTimeout(() => {
            let str = res.fileName
            file.name = str
            self.unitBasic.img = str;
            self.unitBasic.avatars[0] = {url: self.loadUrl(str)};
            file.status = "done";
            file.message = "上传成功";
          }, 1000)
        } else {
          self.$message(res.msg);
        }
      })
    },
    beforeAvatarUpload(file) {
      // const isSize = new Promise(function (resolve, reject) {
      //   let width = 300
      //   let height = 420
      //   let _URL = window.URL || window.webkitURL
      //   let img = new Image()
      //   img.onload = function () {
      //     let valid = img.width == width && img.height == height;
      //     valid ? resolve() : reject();
      //   }
      //   img.src = _URL.createObjectURL(file);
      // })
      //     .then(
      //         () => {
      //           return file;
      //         },
      //         () => {
      //           this.$message({
      //             message: '图片尺寸只能是300*420px!请重新选择!',
      //             type: 'warning'
      //           })
      //           return Promise.reject()
      //           return false
      //         })
      // return isSize
    },

    // 提交表单
    submitForm(formName, type) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let self = this
          let param = type === 1 ? self.basic : self.unitBasic
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

          updUserInfo(param).then((res) => {
            if (res.code === 200) {
              self.$message(res.msg)
              self.$router.push('/')
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
    onSubmitCert(formName, strType) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let self = this;

          let parms = strType == "dan" ? self.dan : self.player;
          if (parms === self.dan) {
            setTimeout(() => {
              if (parms.certImgs.length == 0) {
                self.$message("证书不能为空！");
                return false;
              } else if (parms.item == '') {
                self.$message("考试项目不能为空！");
                return false
              } else if (parms.name == '') {
                self.$message("考评点不能为空！");
                return false
              } else if (parms.level == '') {
                self.$message("等级不能为空！");
                return false
              } else if (parms.certCode == '') {
                self.$message("段位编号不能为空！");
                return false
              }
            }, 30);
          } else if (parms === self.player) {
            setTimeout(() => {
              if (parms.certImgs.length == 0) {
                self.$message("证书不能为空！");
                return false;
              } else if (parms.certSource == '') {
                self.$message("审批单位不能为空！");
                return false
              } else if (parms.certTime == '') {
                self.$message("审批日期不能为空！");
                return false
              } else if (parms.level == '') {
                self.$message("等级不能为空！");
                return false
              }
            }, 30);
          }


          addOrUpdUserCert(parms).then((res) => {
            // parms = "";
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
    // 会员申请部分
    getMembershipFee() {
      let self = this;
      console.log(self.userType)
      if (self.userType === 1) {
        queryCenterApplyMemberList({sign: "wx"}).then((res) => {
          if (res.code == 200) {
            self.MemberList = res.data;
            res.data.map((item) => {
              self.MemTypeColumns.push(item.memberName);
            });
            // self.MemParms.memberId = res.data[0].id
            // self.getCustomForms();
          } else {
            self.$message(res.msg);
          }
        });
      }
    },
    // 会员类别
    onMemType(value) {
      let self = this;
      let cItem = self.MemberList.filter((item) => item.memberName == value);
      if (cItem[0].goodsPrice) {
        self.MemPrice = self.float_calculator(
            "add",
            cItem[0].goodsPrice,
            self.float_calculator(
                "add",
                cItem[0].makePrice || 0,
                cItem[0].rebatePrice || 0
            )
        );
      }
      self.$set(self.basic, "memberName", value);
      self.$set(self.basic, "memberId", cItem[0].id);
      self.$set(self.basic, "goodsPrice", self.MemPrice);
      self.MemTypeShow = false;
    },
    onSelectUnit(item) {
      let self = this;
      self.basic.sourceOrgName = item.name;
      self.basic.sourceOrgId = item.id;
      self.showUnit = false;
    },
    queryAssociationLists() {
      let self = this;
      queryAssociationList({}).then((res) => {
        if (res.code == 200) {
          self.associationList = res.data;
        } else {
          self.$message(res.msg);
        }
      });
    },

    // 段位信息-- 考评点
    queryDictListByTypeLists() {
      let self = this;
      queryDictListByTypeList([{type: "rankEval"}]).then((res) => {
        self.$nextTick(() => {

        });
        if (res.code == 200) {
          let _rankEvalList = res.data.rankEvalList;
          _rankEvalList.map((item) => {

            if (item.value === self.itemValue) {
              self.dan.name = item.label;
            }

            self.danAppraisal.push(
                Object.assign({}, item, {name: item.label})
            );

          });
        } else {
          self.$message(res.msg);
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

    a {
      color: #555;
      font-size: 14px;
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
        width: 80%;
        vertical-align: bottom;
        font-size: 14px;
      }

      .intro {
        ::v-deep.el-textarea__inner {
          height: 200px;
        }
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
