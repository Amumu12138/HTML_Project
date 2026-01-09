import request from '@/utils/request';

export const login = (params?: unknown): Promise<Record<string, any>> => {
    return request({
        url: '/users/login',
        method: 'post',
        data: params,
        mock: false
    })
}

export const permissionList = (): Promise<Record<string, any>> => {
    return request({
        url: '/users/getPremissionList',
        method: 'get',
        data: {},
        mock: false
    })
}

export const noticeCount = (): Promise<Record<string, any>> => {
    return request({
        url: '/leave/count',
        method: 'get',
        data: {},
        mock: false
    })
}

export const menuList = (data: unknown): Promise<Record<string, any>> => {
    return request({
        url: '/menu/list',
        method: 'get',
        data,
        mock: false
    })
}

export const getUserList = (params) => {
    return request({
        url: '/users/list',
        method: 'get',
        data: params,
        // mock: false
    })
}

export const userAllList = () => {
    return request({
        url: '/users/all/list',
        method: 'get',
        mock: false
    })
}

export const userDelete = (params) => {
    return request({
        url: '/users/delete',
        method: 'post',
        data: params,
        // mock: true
    })
}

export const getRoleList = () => {
    return request({
        url: '/roles/allList',
        method: 'get',
        mock: false
    })
}
export const getDeptList = (params) => {
    return request({
        url: '/dept/list',
        method: 'get',
        data: params,
        mock: false
    })
}
export const userSubmit = (params: unknown) => {
    return request({
        url: '/users/operate',
        method: 'post',
        // mock: true,
        data: params
    })
}
export const menuSubmit = (params) => {
    return request({
        url: '/menu/operate',
        method: 'post',
        data: params,
    })
}
export const roleList = (params: unknown) => {
    return request({
        url: '/roles/list',
        method: 'get',
        data: params,
        mock: false
    })
}

export const roleOperate = (params: unknown) => {
    return request({
        url: '/roles/operate',
        method: 'post',
        data: params,
        mock: false
    })
}
export const updatePermission = (params: unknown) => {
    return request({
        url: '/roles/update/permission',
        method: 'post',
        data: params,
        mock: false
    })
}
export const deptOperate = (params) => {
    return request({
        url: '/dept/operate',
        method: 'post',
        data: params,
        mock: false
    })
}
// 审批列表
export const getApplyList = (params) => {
    return request({
        url: '/leave/list',
        method: 'get',
        data: params,
        mock: false
    })
}
export const leaveOperate = (params) => {
    return request({
        url: '/leave/operate',
        method: 'post',
        data: params,
        mock: false
    })
}

export const leaveApprove = (params) => {
    return request({
        url: '/leave/approve',
        method: 'post',
        data: params,
        mock: false
    })
}