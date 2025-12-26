import axios from "axios";
import { ElMessage, ElLoading } from "element-plus";
import config from "@/config";

// 创建axios实例
const axiosInstance = axios.create({
    baseURL: config.baseApi,
    timeout: 10000, // 添加超时时间
});

// 存储请求的取消令牌
const pendingRequests = new Map();

// 生成请求的唯一标识
const generateRequestKey = (config) => {
    const { method, url, params, data } = config;
    return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&');
};

// 取消重复请求
const handleDuplicateRequest = (config) => {
    const requestKey = generateRequestKey(config);

    // 取消之前的重复请求
    if (pendingRequests.has(requestKey)) {
        const cancel = pendingRequests.get(requestKey);
        cancel(`重复请求被取消: ${requestKey}`);
        pendingRequests.delete(requestKey);
    }

    // 添加当前请求到待处理列表
    config.cancelToken = new axios.CancelToken((cancel) => {
        pendingRequests.set(requestKey, cancel);
    });
};

// 移除待处理的请求
const removePendingRequest = (config) => {
    const requestKey = generateRequestKey(config);
    if (pendingRequests.has(requestKey)) {
        pendingRequests.delete(requestKey);
    }
};

// 请求重试次数
const MAX_RETRY = 3;

// 添加请求拦截器
axiosInstance.interceptors.request.use(
    (config) => {
        // 取消重复请求
        handleDuplicateRequest(config);

        // 添加token等认证信息
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // 添加请求时间戳
        config.headers['X-Request-Time'] = Date.now();

        return config;
    },
    (error) => {
        ElMessage.error('请求发送失败');
        return Promise.reject(error);
    }
);

// 添加响应拦截器
axiosInstance.interceptors.response.use(
    (res) => {
        // 移除已完成的请求
        removePendingRequest(res.config);

        const { code, data, msg } = res.data;
        if (code === 200) {
            return data;
        } else {
            ElMessage.error(msg || '请求失败');
            return Promise.reject(new Error(msg || '请求失败'));
        }
    },
    (error) => {
        // 移除已完成的请求
        if (error.config) {
            removePendingRequest(error.config);
        }

        // 网络错误处理
        let errorMessage = '网络错误';

        if (error.response) {
            // 服务器返回错误状态码
            const { status, data } = error.response;
            const statusMessages = {
                401: '未授权，请重新登录',
                403: '拒绝访问',
                404: '请求的资源不存在',
                500: '服务器内部错误',
                502: '网关错误',
                503: '服务不可用',
                504: '网关超时'
            };

            errorMessage = statusMessages[status] || data.msg || `请求失败: ${status}`;
        } else if (error.request) {
            // 请求已发送但没有收到响应
            errorMessage = '服务器无响应';
        } else if (axios.isCancel(error)) {
            // 请求被取消
            return Promise.reject(error); // 取消的请求不显示错误信息
        } else {
            // 请求配置错误
            errorMessage = error.message;
        }

        // 请求重试逻辑
        const { config: reqConfig } = error;
        if (!reqConfig) {
            ElMessage.error(errorMessage);
            return Promise.reject(error);
        }

        reqConfig.retry = reqConfig.retry || 0;

        if (reqConfig.retry < MAX_RETRY) {
            reqConfig.retry += 1;
            const delay = new Promise((resolve) => {
                setTimeout(resolve, reqConfig.retryDelay || 1000);
            });

            ElMessage.warning(`请求失败，正在重试 (${reqConfig.retry}/${MAX_RETRY})...`);
            return delay.then(() => axiosInstance(reqConfig));
        }

        ElMessage.error(errorMessage);
        return Promise.reject(error);
    }
);

// 封装axios的请求方法
export const request = async (options) => {
    // 默认配置
    const defaultOptions = {
        method: 'get',
        retry: 0,
        retryDelay: 1000,
        showLoading: false,
        ...options,
    };

    // 处理请求参数
    if (defaultOptions.method.toLowerCase() === 'get') {
        defaultOptions.params = defaultOptions.data;
        delete defaultOptions.data;
    }

    // 处理mock配置
    const isMock = typeof defaultOptions.mock !== 'undefined' ? defaultOptions.mock : config.mock;
    delete defaultOptions.mock;

    // 根据环境设置baseURL
    const baseURL = config.env === 'prod'
        ? config.baseApi
        : (isMock ? config.mockApi : config.baseApi);

    // 处理loading
    let loadingInstance = null;
    if (defaultOptions.showLoading) {
        loadingInstance = ElLoading.service({
            lock: true,
            text: '加载中...',
            background: 'rgba(0, 0, 0, 0.7)'
        });
    }
    delete defaultOptions.showLoading;

    try {
        const response = await axiosInstance({
            ...defaultOptions,
            baseURL,
        });
        return response;
    } catch (error) {
        // 错误已经在拦截器中处理，这里重新抛出
        throw error;
    } finally {
        // 关闭loading
        if (loadingInstance) {
            loadingInstance.close();
        }
    }
};