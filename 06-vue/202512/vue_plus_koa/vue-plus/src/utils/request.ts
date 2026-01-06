// axios二次封装
import axios from 'axios';
import { ElMessage } from 'element-plus';
import config from '@/config';

import storage from "./storage";
import { useRouter } from 'vue-router';

const TOKEN_INVALID = 'Token认证失败，请重新登录'
const NETWORK_ERROR = '网络请求异常，请稍后重试'
const router = useRouter()

// 创建axios实例对象,添加全局配置
const service = axios.create({
    baseURL: '/api',
    timeout: 8000
})

// 请求拦截
service.interceptors.request.use(req => {
    const headers = req.headers;
    const { token = '' } = storage.getItem('userInfo')
    if (!headers.Authorization) {
        headers.Authorization = `Bearer ${token}`
    }

    return req;
})

// 详情拦截
service.interceptors.response.use(res => {
    const { code, data, msg } = res?.data;
    if (code === 200) {
        return data;
    } else if (code === 50001) {
        ElMessage.error(TOKEN_INVALID)
        router.push('/login')

        return Promise.reject(TOKEN_INVALID)
    } else {
        ElMessage.error(msg || NETWORK_ERROR)
        return Promise.reject(msg || NETWORK_ERROR)
    }
})

// 请求核心函数
function request(options) {
    options.method = options.method || 'get'
    if (options.method.toLowerCase() === 'get') {
        options.params = options.data;
    }

    // 判断是否为mock数据
    let isMock = config.mock
    if (typeof options.mock !== 'undefined') {
        isMock = options.mock;
    }
    // 判断是否是生产环境
    if (config.env === 'prod') {
        service.defaults.baseURL = config.baseApi
    } else {
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
    }

    return service(options);
}

const methodList = ['get', 'post', 'put', 'delete', 'patch'];
// 请求方式遍历,将方法挂载在request对象上
methodList.forEach((item) => {
    request[item] = (url, data, options) => {
        return request({
            url,
            data,
            method: item,
            ...options
        })
    }
})

export default request;