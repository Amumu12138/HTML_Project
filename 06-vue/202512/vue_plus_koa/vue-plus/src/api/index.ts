import request from '@/utils/request';

export const login = (params?: unknown) => {
    return request({
        url: '/login',
        method: 'get',
        params,
        mock: false
    })
}

export const permissionList = (): Promise<Record<string, any>> => {
    return request({
        url: '/user/getPermissionList',
        method: 'get',
        data: {},
        mock: false
    })
}