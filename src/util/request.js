import axios from 'axios'
// 创建axios对象
let service = axios.create({
    baseURL: '/api',
    timeout: 20000 // 请求的超时
})

// 添加请求拦截器,
service.interceptors.request.use(
    request => {
        let token = window.sessionStorage.getItem('token')

        if (token) {
            // 设置请求的头信息
            request.headers = {
                'token': token, // 请求添加的token
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json;charset=utf-8'
            }
        }
        else {
            request.headers = {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }

        return request
    },
    error => {
        Promise.reject(error)
    }
)

// 添加响应拦截器
service.interceptors.response.use(
    response => {
        return response.data || response.parmas
    },
    error => {
        Promise.reject(error)
    }
)
export default service