// 环境配置封装
const env = import.meta.env.MODE || 'prod';

const EnvConfig = {
    dev: {
        baseApi: '/',
        mockApi: 'https://mock.apipark.cn/m1/4068509-0-default/api'
    },
    prod: {
        baseApi: '/',
        mockApi: ''
    },
    test: {
        baseApi: '/',
        mockApi: ''
    }
}

export default {
    env,
    mock: true,
    namespace: 'manage',
    ...EnvConfig[env]
}