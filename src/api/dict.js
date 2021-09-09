import request from '@/util/request'
/**
 * 字典查询 
 * 参数 ：
 */
export const queryDictListByTypeList = data => {
    return request({
        url: '/system/dict/queryDictListByTypeList',
        method: 'post',
        data
    })
}
