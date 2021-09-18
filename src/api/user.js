import request from '@/util/request'

/**
 * 用户登录
 * @param
 * 参数： {手机号：phone，密码：password， sign： mobile}
 */
export const login = data => {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}

/**
 * 忘记密码/密码重置
 * @param
 * 参数： {手机号：phone，密码：password， sign： mobile}
 */
export const forgetPassword = data => {
    return request({
        url: '/app/userInfo/forgetPassword',
        method: 'post',
        data
    })
}

/**
 * 用户注册
 * @param
 * 参数：
 *  personinfo: {
        sign: "mobile",
        registerType: 1,
        name: "",
        identityCode: "",
        phone: "",
        code: "",
        password: "",
        passwordt: "",
        userInfo: {
          identityCode: "",
          password: "",
          phonenumber: "",
          userName: "",
        },
      },
 orginfo: {
        sign: "mobile",
        registerType: 2,
        name: "",
        creditCode: "",
        principal: "",
        phone: "",
        code: "",
        password: "",
        passwordt: "",
        userInfo: {
          userName: " ",
          phonenumber: " ",
          password: " ",
        },
      },
 */
export const register = data => {
    return request({
        url: '/system/register/registerUser',
        method: 'post',
        data
    });
}
/**
 * 获取注册验证码
 * @param
 * 参数： phone
 */
export const getRegisterSmsCode = data => {
    return request({
        url: '/system/register/registerSmsCode',
        method: 'post',
        data
    });
}

/**
 * 获取当前用户信息
 * @param
 * 参数：  request.headers = {'Authorization': `Bearer ${token}`}
 */
export const getUserProfile = params => {
    return request({
        url: '/app/userInfo/queryUserInfo',
        method: 'get',
        params
    });
}

/**
 * 完善当前用户基本信息/修改资料信息
 * @param
 * 参数： {
 * 地址：area，
 * 生日：birthday，
 * 邮箱：email,
 * 手机号：phonenumber，
 * 昵称：nickName，
 * 运动员等级：playerLv，
 * 身份证类型：identityType，
 * 身份证号码：identityCode,
 * 省：province，
 * 市：city,
 * 县：county,
 * 区：street
 *
 * org{
 * 单位名称 name
联系人 principal
联系电话 phone
统一社会信用代码 creditCode
邮箱 email
省 province
市 city
区 county
地址 area
介绍 introduction
营业执照 license
近照 avatar}
 * }
 */
export const updUserInfo = data => {
    return request({
        url: '/app/personCenter/updUserInfo',
        method: 'post',
        // header:{'token':localStorage.setItem('token')},
        data
    });
}

/**
 * 完善当前用户基本信息/修改资料信息 --文件上传/ 头像/
 * @param
 * 参数：
 */
export const uploadImage = data => {
    return request({
        url: 'http://wushu.sportsit.cn:8080/upload/uploadImage',
        method: 'post',
        data
    });
}


/**
 * 添加教练/裁判信息  -修改
 * @param
 *  * 参数：{
 *类型：type (0教练，1裁判),
 *项目：item ,
 *等级：level ,
 *证书编号：certCode ,
 *核发机构：certSource ,
 *证书时间：certTime ,
 *履历：resumes [certResumeTime:'', certResumeName:''] }
 *
 *  若新增裁判则多增加参数：一级类别categoryOne二级类别categoryTwo,三级类别categoryThree
 */

export const addOrUpdUserCert = data => {
    return request({
        url: '/app/cert/addOrUpdUserCert',
        method: 'post',
        data
    });
}

/**
 * 查询协会会员费用
 * @param
 *  参数： id => sgin: 'wx'
 */

export const queryCenterApplyMemberList = data => {
    return request({
        url: '/app/associationCenter/queryCenterApplyMemberList',
        method: 'post',
        data
    });
}

/**
 * 获取申请加入协会表单
 * @param {*} data
 * orgId
 * type
 * memberId
 */
export const getCustomForm = data => {
    return request({
        url: '/app/findCode',
        method: 'post',
        data
    });
}

/**
 * 会员申请来源单位列表/直属关系
 * @param {*} data
 * 参数JSON：{name:"",province:"",city:"",county:""}
 */
export const queryAssociationList = data => {
    return request({
        url: '/app/associationCenter/queryAssociationList',
        method: 'post',
        data
    });
}

// 会员申请加入协会
export const centerApplyJoinOrg = data => {
    return request({
        url: '/app/associationCenter/centerApplyJoinOrg',
        method: 'post',
        data
    })
}


/**
 * 我的会员信息展示
 * @param {*} params
 * 参数JSON：{sgin:'wx}
 */
export const queryOrgMemberInfo = params => {
    return request({
        url: '/app/orgHome/queryOrgMemberInfo',
        method: 'get',
        params
    })
}

/**
 * 生成会员证件信息
 * @param {*} params
 * 参数JSON：{sgin:'wx}
 */
export const mobileCreateCredentials = params => {
    return request({
        url: '/app/orgHome/mobileCreateCredentials',
        method: 'get',
        params
    });
}
/**
 * 生成会员证件信息-- 图片
 * 参数JSON  name:index.ftl
 */
export const lookMemberCard = params => {
    return request({
        url: '/app/member/lookMemberCard',
        method: 'get',
        // responseType: 'blob',
        // responseType: 'arraybuffer',
        params
    });
}


/**
 * 查询当前用户是否是会员
 * @param {*} params
 * 参数JSON：{sgin:'wx}
 * res: isOrgMember（0未申请，1已申请未审核，2.已审核,3.已加入）
 */
export const checkUserIsOrgMember = params => {
    return request({
        url: '/app/orgHome/checkUserIsOrgMember',
        method: 'get',
        params
    });
}

/**
 * 获取申请会员后数据（修改/查看）
 * @param {*} params
 * 参数JSON：{sgin:'wx}
 */
export const queryJoinOrgApplyDetail = params => {
    return request({
        url: '/app/orgHome/queryJoinOrgApplyDetail',
        method: 'get',
        params
    });
}

/**
 * 获取订单详情
 * @param {*} params
 * 参数JSON：{id:订单id}
 */
export const getOrderById = data => {
    return request({
        url: '/app/order/queryOrderById',
        method: 'post',
        data
    })
}

/**
 * 支付宝支付：
 * @param {*} params
 * 参数JSON：{id:订单id}
 */
export const mobileAlipay = data => {
    return request({
        url: '/app/pay/mobileAlipay',
        method: 'post',
        data
    })
}

/**
 * 微信支付：
 * @param {*} params
 * 参数JSON：{id:订单id}
 */
export const mobileWxpay = data => {
    return request({
        url: '/app/wxpay/mobileWxpay',
        method: 'post',
        data
    })
}

/**
 * 微信支付：
 * @param {*} params
 * 参数JSON：{id:订单id}
 */
export const wxJSpay = data => {
    return request({
        url: '/app/wxpay/wxJSpay',
        method: 'post',
        data
    })
}
/**
 * 手机验证码-忘记密码
 * @param {*}
 * 参数JSON：{ phone：num }
 */
export const forgetSmsCode = params => {
    return request({
        url: '/app/userInfo/forgetSmsCode',
        method: 'get',
        params
    })
}

/**
 * 手机验证码-注册
 * @param {*}
 * 参数JSON：{ phone：num }
 */
export const registerSmsCode = params => {
    return request({
        url: '/system/register/registerSmsCode',
        method: 'get',
        params
    })
}
/**
 * 我的参赛信息--赛事报名信息
 * 参数JSON：{sgin:'wx'}
 */
export const queryMyJoinCompetitionList = data => {
    return request({
        url: '/app/competition/wx/queryMyJoinCompetitionList',
        method: 'post',
        data
    })
}

/**
 * 我的参赛详情 -- 人员
 * 参数JSON：{申请id}
 */
export const queryMyJoinCompetitionInfo = data => {
    return request({
        url: '/app/competition/wx//queryMyJoinCompetitionInfo',
        method: 'post',
        data
    })
}

/**
 * 我的参赛详情 -- 小项
 * 参数JSON：{itemId， userId}
 */
export const queryMyJoinItemMinInfo = data => {
    return request({
        url: '/app/competition/wx/queryMyJoinItemMinInfo',
        method: 'post',
        data
    })
}

/**
 * 教练员、裁判员注册 -- 检测是否未会员
 * 参数JSON：sign:'wx'
 */
export const checkUserMember = data => {
    return request({
        url: '/app/cert/checkUserMember',
        method: 'post',
        data
    })
}

/**
 * 教练员、裁判员 -- 列表
 * 参数JSON：pageNum,pageSize,userName, level,type(0教练1裁判)
 */
export const queryCertList = params => {
    return request({
        url: '/app/cert/queryCertList',
        method: 'get',
        params
    })
}

/**
 * 教练员、裁判员 -- 详情
 * 参数JSON：id, year
 */
export const queryUserCertDetailList = data => {
    return request({
        url: '/app/cert/queryUserCertDetailList',
        method: 'post',
        data
    })
}

//  export const checkUserIsOrgMember = data => {
//   return request({
//     url: '/app/orgHome/checkUserIsOrgMember',
//     method: 'post',
//     data
//   });
//  }

// export const getHome = params => {
//   return request ({
//       url:'/app/orgHome/getOrgHome',
//       method: 'get',
//       params
//   })
// }
