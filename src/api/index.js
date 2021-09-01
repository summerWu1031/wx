import request from '@/util/request'
// 武协首页展示
export const getHome = params => {
    return request({
        url: '/app/orgHome/getOrgHome',
        method: 'get',
        params
    })
}
//友情链接
export const friendLink = params => {
    return request({
        url: '/system/friend/list',
        method: 'get',
        params
    })
}

/**
 * 关于我们：
 *  协会简介， 机构设置， 联系我们
 */
export const getqueryOrgInfo = params => {
    return request({
        url: '/app/orgHome/queryOrgInfo',
        method: 'get',
        params
    })
}

/**
 * 查新闻列表
 * 参数：noticeClass
 * 1通知公告，2政策法规，3新闻
 */
export const getNoticeList = data => {
    return request({
        url: '/app/notice/getNoticeList',
        method: 'post',
        data
    })
}

export const getNoticeDetail = params => {
    return request({
        url: '/app/notice/getNoticeDetail',
        method: 'get',
        params
    })
}

/**
 *会员风采列表
 *参数：memberType（logoType（0图片，1视频））
 *0：明星会员，1：个人会员，2：团体会员
 */
export const querySysNetMemberSightList=data=>{
    return request({
        url: '/system/sight/querySysNetMemberSightList',
        method: 'post',
        data
    })
}

/**
 *会员风采详情{id}
 *id
 */
export const querySysNetMemberSightDetail=data=>{
    return request({
        url:'/system/sight/querySysNetMemberSightDetail',
        method:'post',
        data
    })
}

/**
 * 段位查询 -- 身份证
 * 参数：idCard(身份证)
 */
export const danQuery = params => {
    return request({
        url: 'http://dwht.wushu.com.cn/api/selectByIdCardAndRankNumber',
        method: 'get',
        params
    })
}

/**
 * 段位查询 -- 姓名
 * 参数：userName,identityCode,pageSize,pageNum
 */
export const queryUserRank = params => {
    return request({
        url: '/app/wx/rank/list',
        method: 'get',
        params
    })
}

