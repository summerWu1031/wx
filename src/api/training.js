import request from '@/util/request'

/**
 * 培训报名 -- 列表
 * 参数： sign: "wx", pageNum ,pageSize
 */
export const queryOrgTrainList = data => {
    return request({
        url: '/app/orgTrain/queryOrgTrainList',
        method: 'post',
        data
    })
}

/**
 * 培训报名 -- 详情
 * 参数 ： id
 */
export const queryOrgTrainDetail = data => {
    return request({
        url: '/app/orgTrain/queryOrgTrainDetail',
        method: 'post',
        data
    })
}


/**
 * 培训报名 -- 确认
 * 参数 ：
 */
export const sureTrainApply = data => {
    return request({
        url: '/app/orgTrain/sureTrainApply',
        method: 'post',
        data
    })
}

/**
 * 培训课程 -- 列表
 * 参数 ：{
 *  pageNum	页数
    pageSize	页导航数
    trainLv	    等级
    querytype   查询类型（0.所有，1.我的考试，2.收藏）
    trainName	标题搜索（查询）
    trainType	培训类型(1.段位培训，2.教练员培训,3.裁判员培训,4.考评员培训)
}
 *
 */
export const getTrainList = params => {
    return request({
        url: '/app/orgTrain/getTrainList',
        method: 'get',
        params
    })
}
/**
 * 培训课程 -- 详情
 * 参数 ： id
 */
export const getTrainInfo = (params) => {
    return request({
        url: '/app/orgTrain/getTrainInfo',
        method: 'get',
        params
    })
}

/**
 * 培训课程 -- 详情(参加培训) 判断是否预览过
 * 参数 ： trainId ：(id)  培训活动的id
 */
export const join = data => {
    return request({
        url: '/app/orgTrain/join',
        method: 'post',
        data
    })
}
/**
 * 培训课程 -- 答题(提交答案)
 * 参数 ： {
       isFinish	是否完成(0否，1是)
       paperId	试卷id
       score 得分
       userAnswer 填写的答案
 * }
 */
export const answer = data => {
    return request({
        url: '/app/orgTrain/answer',
        method: 'post',
        data
    })
}
/**
 * 培训课程 -- 交卷（结束考试）
 * 参数 ： paperid
 */
export const finishPaper = data => {
    return request({
        url: '/app/orgTrain/finishPaper',
        method: 'post',
        data
    })
}
/**
 * 培训课程 -- 考试的试卷id（PaperId）   获取支付时需：  orderNumber
 * 参数 ： trainId ：(id)
 */
export const getPaperId = (params) => {
    return request({
        url: '/app/orgTrain/getPaperId',
        method: 'get',
        params
    })
}

/**
 * 培训课程 -- 试卷的题目
 * 参数 ： trainId ：(PaperId)
 */
export const getSubject = (params) => {
    return request({
        url: '/app/orgTrain/getSubject',
        method: 'get',
        params
    })
}
/**
 * 培训课程 -- 考试时间
 * 参数 ： paperid
 */
export const getExamExpireTime = (params) => {
    return request({
        url: '/app/orgTrain/getExamExpireTime',
        method: 'get',
        params
    })
}

/**
 * 培训课程 -- 考试视频上传
 * 参数 ：
 */
export const uploadVideo = data => {
    return request({
        url: 'http://wushu.sportsit.cn:8080/upload/uploadVideo',
        method: 'post',
        data,
        timeout: 10 * 60 * 1000,
    })
}
/**
 * 培训课程 -- 考试视频上传(提交))
 * 参数 ： {
 *  coverUrl	封面地址
    paperId	试卷id
    trainId	培训活动的id
    userId	用户id
    videoUrl	视频地址
}
 */
export const uploadVideoAssess = data => {
    return request({
        url: '/app/orgTrain/assess',
        method: 'post',
        data
    })
}

/**
 * 培训课程 -- 根据id获得该培训最新一次考试的成绩
 * 参数 ： trainId 培训活动的id
 */
export const getscore = params => {
    return request({
        url: '/app/orgTrain/getscore',
        method: 'get',
        params
    })
}

/**
 * 培训课程 -- (裁判 )根据id获得该培训最新一次考试的成绩
 * 参数 ： trainId 培训活动的id
 */
export const reffgetscore = params => {
    return request({
        url: '/app/orgTrain/reffgetscore',
        method: 'get',
        params
    })
}


/**
 * 培训课程 -- 裁判查询视频列表
 * 参数 ：querytype(查询类型(0.全部 1.未评分 2.已评分))
 */
export const refereeList = params => {
    return request({
        url: '/app/orgTrain/refereeList',
        method: 'get',
        params
    })
}
/**
 * 培训课程 -- 裁判评分
 * 参数 ：id    评分id    ;score    分数
 */
export const Scoring = data => {
    return request({
        url: '/app/orgTrain/Scoring',
        method: 'post',
        data
    })
}

/**
 * 培训课程 -- 裁判评分数量
 * 参数 ：
 */
export const reffgetcount = params => {
    return request({
        url: '/app/orgTrain/reffgetcount',
        method: 'get',
        params
    })
}


/**
 * 培训课程 -- 根据培训id用户id查询改用户在改培训的所有考试记录
 * 参数 ： {
 * pageNum	页数
   pageSize	页长度
   trainId	培训id
}
 */
export const getPaperHistoryBytrainId = params => {
    return request({
        url: '/app/orgTrain/getPaperHistoryBytrainId',
        method: 'get',
        params
    })
}

/**
 * 培训课程 -- 根据试卷id获得答题信息(考试记录)
 * 参数 ： paperId
 */
export const getPaperInfoByPaperId = params => {
    return request({
        url: '/app/orgTrain/getPaperInfoByPaperId',
        method: 'get',
        params
    })
}

/**
 * 培训课程 -- 根据培训id获得考试信息(试卷整体信息)
 * 参数 ： trainId
 */
export const getExamInfoByTrainId = params => {
    return request({
        url: '/app/orgTrain/getExamInfoByTrainId',
        method: 'get',
        params
    })
}

/**
 * 培训课程 -- 获得培训包的列表(报名列表)
 * 参数 ： pageNum,    pageSize
 */
export const getApplyTrainList = params => {
    return request({
        url: '/app/orgTrain/apply/getList',
        method: 'get',
        params
    })
}
/**
 * 培训课程 -- 根据id获得培训包详情(报名详情)
 * 参数 ： id
 */
export const getApplyTrainDetail = params => {
    return request({
        url: '/app/orgTrain/apply/getOne',
        method: 'get',
        params
    })
}
/**
 * 培训课程 -- 报名培训包(确认报名)
 * 参数 ： id
 */
export const confirmationTrain = data => {
    return request({
        url: '/app/orgTrain/apply/apply',
        method: 'post',
        data
    })
}

/**
 * 培训课程 -- 报名培训包(确认报名)
 * 参数 ：{
 * pageNum
 * pageSize
 * needPay //筛选条件 0.无需支付 1.需要支付
 * }
 */
export const myCourse = params=>{
    return request({
        url:'/app/orgTrain/apply/getApplyInfoByUserId',
        method: 'get',
        params
    })
}
