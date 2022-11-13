import axios from "axios";
import http from "../utils/request";

export const getData = () => {
    // /home/getData 为后端提供的接口地址，返回一个promise对象
    return http.get('/home/getData')
}

// 获取表格的用户列表
export const getUser = (params) => {
    return http.get('/user/getUser', params)
}

// 新增用户
export const addUser = (data) => {
    return http.post('/user/add', data)
}

// 编辑用户
export const editUser = (data) => {
    return http.post('/user/edit', data)
}    

// 删除用户
export const delUser = (data) => {
    return http.post('/user/del', data)
}    

// 用户登陆获取路由权限

export const getMenu = (data) => {
    return http.post('/permission/getMenu', data)
}

// 登录获取按钮权限

export const getBtn = (data) => {
    return http.post('/permission/getBtn', data)
}

// 获取当前用户登录的地址

export const getAddr = (params) => {
    return axios.request({
        url: '/address'
    })
}