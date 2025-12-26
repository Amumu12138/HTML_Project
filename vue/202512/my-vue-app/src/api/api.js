/**
 * 整个项目api的统一管理
 */
import { request } from "./request";

// 请求首页左侧的表格的数据
export const getTableData = () => {
    return request({
        url: "/home/getTableData",
        method: "get",
    });
};

// 请求首页右侧的统计数据
export const getCountData = () => {
    return request({
        url: "/home/getCountData",
        method: "get",
    });
};

// 请求首页右侧的图表的数据
export const getChartData = () => {
    return request({
        url: "/home/getChartData",
        method: "get",
    });
};

// 请求首页左侧的用户数据
export const getUserData = (data) => {
    return request({
        url: "/home/getUserData",
        method: "get",
        data,
    });
};

// 请求删除用户
export const deleteUser = (data) => {
    return request({
        url: "/user/deleteUser",
        method: "get",
        data,
    });
};

export const addUser = (data) => {
    return request({
        url: "/user/addUser",
        method: "post",
        data,
    });
};

// 编辑用户接口
export const editUser = (data) => {
    return request({
        url: "/user/editUser",
        method: "post",
        data,
    });
};

// 请求获取菜单列表
export const getMenu = (params) => {
    return request({
        url: "/permission/getMenu",
        method: "post",
        data: params,
    });
};
